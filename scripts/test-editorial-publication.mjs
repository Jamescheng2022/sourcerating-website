import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { missingDeployedText, normalizeVisibleArticleText, hasMatchingPublicationDigest } from "./check-editorial-publication.mjs";

const article = {
  slug: "galvanized-inspection",
  title: "The Inspector’s Report & the Shipment",
  excerpt: "A test result only helps when it follows a particular lot.",
  articleBody: [
    { type: "heading", text: "Check the actual pieces" },
    { type: "paragraph", text: "Readings may be correct even when the inspected items are not on the truck." },
    { type: "paragraph", text: "Check the [approved drawing](https://example.org/drawings) and the *piece-mark register*." },
    { type: "list", items: ["Confirm **actual** lot IDs.", "Match the loaded bundles."] }
  ],
  sections: []
};

const rendered = "<html><head></head><body><article class=\"prose\">" +
"<h1>The Inspector&#x2019;s Report &amp; the Shipment</h1>" +
"<p>A test result only helps when it follows a particular lot.</p>" +
"<h2>Check the actual pieces</h2>" +
"<p>Readings may be correct even when the inspected items are not on the truck.</p>" +
"<p>Check the <a href=\"https://example.org/drawings\">approved drawing</a> and the <em>piece-mark register</em>.</p>" +
"<ul><li>Confirm <strong>actual</strong> lot IDs.</li><li>Match the loaded bundles.</li></ul>" +
"</article></body></html>";

test("current SSR article passes real rendered content comparison", () => {
  assert.deepEqual(missingDeployedText(rendered, article), []);
});

test("old body is rejected even if the route, title, excerpt and image are unchanged", () => {
  const old = rendered.replace(
    "Readings may be correct even when the inspected items are not on the truck.",
    "The previously deployed article uses entirely different body text."
  );
  assert.ok(missingDeployedText(old, article).some(x => x.startsWith("Readings may be correct")));
});

test("old title is rejected for revisions preserving slug and image", () => {
  const old = rendered.replace("The Inspector&#x2019;s Report &amp; the Shipment", "Older report title");
  assert.ok(missingDeployedText(old, article).includes(article.title));
});

test("Next RSC hydration scripts cannot fake the missing visible article", () => {
  const old = rendered.replace(
    "Readings may be correct even when the inspected items are not on the truck.",
    "A different older paragraph."
  ).replace("</article>", "<script id=\"__NEXT_DATA__\">{" +
    "\"newBody\":\"Readings may be correct even when the inspected items are not on the truck.\"}" +
    "</script></article>");
  assert.ok(missingDeployedText(old, article).some(x => x.startsWith("Readings may be correct")));
});

test("inline tags do not split the visible text into false negatives", () => {
  assert.ok(normalizeVisibleArticleText(rendered).includes(
    "Check the approved drawing and the piece-mark register."
  ));
});

test("missing server-rendered article body fails even if RSC text is present", () => {
  const fake = "<body><div id=\"__next\"></div><script>" +
    article.title + article.excerpt + article.articleBody[1].text + "</script></body>";
  assert.ok(missingDeployedText(fake, article).length > 0);
});

test("short table header or unit revision fails even with unchanged rows and title", () => {
  const latest = {
    ...article,
    articleBody: [
      ...article.articleBody,
      { type: "table", headers: ["Part ID", "µm"], rows: [["A-01", "85"]] }
    ]
  };
  const table = "<table><thead><tr><th>Part ID</th><th>µm</th></tr></thead>" +
    "<tbody><tr><th>A-01</th><td>85</td></tr></tbody></table>";
  const html = rendered.replace("</article>", table + "</article>");
  assert.deepEqual(missingDeployedText(html, latest), []);
  const stale = html.replace("<th>µm</th>", "<th>mm</th>");
  assert.ok(missingDeployedText(stale, latest).some(x => x.includes("Missing current table header row")));
});

test("outdated image caption fails despite unchanged hero URL and article body", () => {
  const latest = {
    ...article,
    coverImage: {
      src: "/images/blog/test.jpg",
      caption: "This is a conceptual illustration rather than a real inspection photo."
    }
  };
  const caption = "<figure><img src=\"/images/blog/test.jpg\"/>" +
    "<figcaption>This is a conceptual illustration rather than a real inspection photo.</figcaption></figure>";
  const correct = rendered.replace("</article>", caption + "</article>");
  assert.deepEqual(missingDeployedText(correct, latest), []);
  const stale = correct.replace("conceptual illustration", "documentary photograph");
  assert.ok(missingDeployedText(stale, latest).some(x => x.includes("conceptual illustration")));
});

test("exact source digest rejects changed reference URLs and short table values", () => {
  const baseline = {
    ...article,
    references: [{ title: "Reference", publisher: "Standards body",
      href: "https://example.org/old-version", note: "Example technical scope note." }],
    articleBody: [...article.articleBody, { type: "table",
      headers: ["Part", "Result"], rows: [["Lot-A", "85"]] }]
  };
  const withDigest = (post) => {
    const digest = createHash("sha256").update(JSON.stringify(post)).digest("hex");
    return rendered.replace("<article class=\"prose\">",
      "<article class=\"prose\" data-publication-sha256=\"" + digest + "\">");
  };
  const oldPage = withDigest(baseline);
  assert.equal(hasMatchingPublicationDigest(oldPage, baseline), true);

  const newReference = { ...baseline, references: [
    { ...baseline.references[0], href: "https://example.org/corrected-version" }
  ] };
  const newTable = { ...baseline, articleBody: [
    ...baseline.articleBody.slice(0, -1), { type: "table",
      headers: ["Part", "Result"], rows: [["Lot-A", "80"]] }
  ] };
  assert.equal(hasMatchingPublicationDigest(oldPage, newReference), false);
  assert.equal(hasMatchingPublicationDigest(oldPage, newTable), false);
  assert.equal(hasMatchingPublicationDigest(rendered, baseline), false);
});

test("source digest rejects image revisions under an unchanged public filename", () => {
  const a = { ...article, coverImage: { src: "/images/blog/hero.jpg", caption: "Old attribution" } };
  const b = { ...article, coverImage: { src: "/images/blog/hero.jpg", caption: "New attribution" } };
  const oldDigest = createHash("sha256").update(JSON.stringify(a)).digest("hex");
  const oldHtml = rendered.replace("<article class=\"prose\">",
    "<article class=\"prose\" data-publication-sha256=\"" + oldDigest + "\">");
  assert.equal(hasMatchingPublicationDigest(oldHtml, a), true);
  assert.equal(hasMatchingPublicationDigest(oldHtml, b), false);
});

test("image-rich short article must have cover and at least 2 inline figures", async () => {
  const { assessVisualComposition, minimumInlineFigures } = await import("./check-editorial-publication.mjs");
  const base = {
    coverImage: {src: "/images/blog/cover.jpg", alt: "A conceptually useful image", caption: "Original visual"},
    articleBody: [
      {type: "paragraph", text: "A buyer needs to understand the true scope."},
      {type: "illustration", src: "/images/blog/one.svg", caption: "Distinct first explanation"},
      {type: "paragraph", text: "The second question concerns evidence."},
      {type: "illustration", src: "/images/blog/two.svg", caption: "Distinct second explanation"},
      {type: "paragraph", text: "Verify shipment documentation."}
    ]
  };
  assert.equal(minimumInlineFigures(base), 2);
  assert.deepEqual(assessVisualComposition(base).errors, []);
  assert.ok(assessVisualComposition({...base,articleBody:base.articleBody.filter(b => b.src!=="/images/blog/two.svg")}).errors.some(e=>e.includes("Only 1 inline")));
  assert.ok(assessVisualComposition({...base,coverImage:null}).errors.some(e=>e.includes("Cover image")));
});

test("visual gate rejects duplicate sources and adjacent decorative pileups", async () => {
  const {assessVisualComposition}=await import("./check-editorial-publication.mjs");
  const blocks=[
    {type:"paragraph",text:"A buyer-side analysis of testing."},
    {type:"illustration",src:"/images/x.svg",caption:"Same explanation"},
    {type:"illustration",src:"/images/x.svg",caption:"Same explanation"},
    {type:"paragraph",text:"Closing note."}
  ];
  const v=assessVisualComposition({coverImage:{src:"/images/hero.jpg"},articleBody:blocks});
  assert.ok(v.errors.some(e=>e.includes("reuse an image source")));
  assert.ok(v.errors.some(e=>e.includes("duplicate captions")));
  assert.ok(v.errors.some(e=>e.includes("Adjacent figures")));
});

test("longer articles require more inline images, independent of cover", async () => {
  const {minimumInlineFigures}=await import("./check-editorial-publication.mjs");
  const post=n=>({articleBody:[{type:"paragraph",text:Array(n).fill("buyer").join(" ")}]});
  assert.equal(minimumInlineFigures(post(600)),2);
  assert.equal(minimumInlineFigures(post(601)),3);
  assert.equal(minimumInlineFigures(post(1200)),3);
  assert.equal(minimumInlineFigures(post(1201)),4);
});
