import { test } from "node:test";
import assert from "node:assert/strict";
import { missingDeployedText, normalizeVisibleArticleText } from "./check-editorial-publication.mjs";

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
