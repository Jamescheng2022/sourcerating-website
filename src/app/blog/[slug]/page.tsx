import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ShieldAlert } from "lucide-react";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/data/blog";
import { siteConfig } from "@/data/site-config";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { generatePageMetadata } from "@/lib/metadata";

interface PageProps { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Guide not found" };
  return generatePageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

const decisionStyles = {
  PROCEED: "border-emerald-200 bg-emerald-50 text-emerald-900",
  HOLD: "border-amber-200 bg-amber-50 text-amber-950",
  REJECT: "border-red-200 bg-red-50 text-red-950",
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.dateModified ?? post.date,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: "James Cheng",
      url: `${siteConfig.url}/about`,
      sameAs: [siteConfig.social.linkedin],
    },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    image: `${siteConfig.url}/images/hero-factory-audit.png`,
    ...(post.references ? { citation: post.references.map((reference) => reference.href) } : {}),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Buyer guides", item: `${siteConfig.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteConfig.url}/blog/${post.slug}` },
    ],
  };
  const faqSchema = post.faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    <article className="bg-white pb-24 pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> : null}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">
          <ArrowLeft className="h-4 w-4" />
          Back to guides
        </Link>
        <p className="text-sm font-semibold uppercase text-brand-700">{post.category}</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-950 sm:text-5xl">{post.title}</h1>
        <p className="mt-5 text-lg leading-8 text-gray-600">{post.excerpt}</p>
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
          <span>By <Link href="/about" className="font-semibold text-gray-800 hover:text-brand-700">James Cheng</Link></span>
          <time dateTime={post.date}>Published {new Date(`${post.date}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</time>
          {post.dateModified && post.dateModified !== post.date ? (
            <time dateTime={post.dateModified}>Updated {new Date(`${post.dateModified}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</time>
          ) : null}
          <span>{post.readTime}</span>
        </div>

        <Image
          src="/images/hero-factory-audit.png"
          alt={`${post.title} — buyer-side supplier verification guide`}
          width={1600}
          height={900}
          priority
          className="mt-10 aspect-[16/9] w-full rounded-md border border-gray-200 object-cover"
        />

        {post.directAnswer ? (
          <section className="mt-10 border-l-4 border-brand-700 bg-[#f4f6f4] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Direct answer</p>
            <p className="mt-3 text-lg font-medium leading-8 text-gray-900">{post.directAnswer}</p>
          </section>
        ) : null}

        {post.keyTakeaways ? (
          <section className="mt-10 rounded-md border border-gray-200 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-950">{post.keyTakeawaysHeading ?? "What to verify before the deposit"}</h2>
            <ul className="mt-5 space-y-3">
              {post.keyTakeaways.map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-gray-700">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-brand-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-12 space-y-12 border-t border-gray-200 pt-12">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold text-gray-950">{section.heading}</h2>
              <p className="mt-4 leading-8 text-gray-700">{section.body}</p>
              {section.bullets ? (
                <ul className="mt-5 space-y-3 border-l border-gray-200 pl-5">
                  {section.bullets.map((item) => <li key={item} className="leading-7 text-gray-700">{item}</li>)}
                </ul>
              ) : null}
              {section.callout ? (
                <div className={`mt-6 border p-5 ${section.callout.tone === "warning" ? "border-amber-200 bg-amber-50" : section.callout.tone === "positive" ? "border-emerald-200 bg-emerald-50" : "border-gray-200 bg-gray-50"}`}>
                  <p className="font-bold text-gray-950">{section.callout.label}</p>
                  <p className="mt-2 text-sm leading-7 text-gray-700">{section.callout.text}</p>
                </div>
              ) : null}
            </section>
          ))}
        </div>

        {post.checklist ? (
          <section className="mt-14 border-t border-gray-200 pt-12">
            <p className="text-sm font-semibold uppercase text-brand-700">Evidence checklist</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">{post.checklistHeading ?? "The minimum deposit-release file"}</h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {post.checklist.map((group) => (
                <div key={group.category} className="border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-950">{group.category}</h3>
                  <ul className="mt-3 space-y-2">
                    {group.evidence.map((item) => <li key={item} className="text-sm leading-6 text-gray-600">— {item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {post.decisionMatrix ? (
          <section className="mt-14 border-t border-gray-200 pt-12">
            <p className="text-sm font-semibold uppercase text-brand-700">Decision rule</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">Proceed, hold, or reject</h2>
            <div className="mt-7 space-y-4">
              {post.decisionMatrix.map((row) => (
                <div key={row.decision} className={`border p-5 sm:grid sm:grid-cols-[7rem_1fr] sm:gap-5 ${decisionStyles[row.decision]}`}>
                  <div className="flex items-center gap-2 font-black tracking-wide"><ShieldAlert className="h-5 w-5" />{row.decision}</div>
                  <div>
                    <p className="mt-3 font-medium leading-7 sm:mt-0">{row.signal}</p>
                    <p className="mt-2 text-sm leading-6 opacity-80">{row.response}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {post.faqs ? (
          <section className="mt-14 border-t border-gray-200 pt-12">
            <p className="text-sm font-semibold uppercase text-brand-700">Buyer questions</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">Frequently asked questions</h2>
            <div className="mt-7 divide-y divide-gray-200 border-y border-gray-200">
              {post.faqs.map((faq) => (
                <div key={faq.question} className="py-6">
                  <h3 className="text-lg font-bold text-gray-950">{faq.question}</h3>
                  <p className="mt-3 leading-7 text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {post.references ? (
          <section className="mt-14 border-t border-gray-200 pt-12">
            <p className="text-sm font-semibold uppercase text-brand-700">Standards context</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">Official references for the project audit brief</h2>
            <p className="mt-4 max-w-3xl leading-7 text-gray-700">
              These sources help define the audit questions, but the contract, approved drawings, project specification, destination rules, and current standard editions remain controlling.
            </p>
            <div className="mt-7 divide-y divide-gray-200 border-y border-gray-200">
              {post.references.map((reference) => (
                <div key={reference.href} className="py-5">
                  <a href={reference.href} target="_blank" rel="noreferrer" className="font-bold text-brand-700 hover:text-brand-900">
                    {reference.title}
                  </a>
                  <p className="mt-1 text-sm font-semibold text-gray-500">{reference.publisher}</p>
                  <p className="mt-2 text-sm leading-6 text-gray-700">{reference.note}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {post.relatedLinks ? (
          <section className="mt-14 border-t border-gray-200 pt-12">
            <p className="text-sm font-semibold uppercase text-brand-700">Continue the decision</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">Related buyer guides</h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {post.relatedLinks.map((related) => (
                <Link key={related.href} href={related.href} className="border border-gray-200 p-5 hover:border-brand-300 hover:bg-[#fbfcfb]">
                  <h3 className="font-bold text-gray-950">{related.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{related.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <aside className="mt-14 border-y border-gray-200 bg-[#f7f8f5] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase text-brand-700">About the author</p>
          <h2 className="mt-3 text-xl font-bold text-gray-950">James Cheng</h2>
          <p className="mt-3 text-sm leading-7 text-gray-700">
            James has a civil and structural engineering background, spent more than 10 years with the CNBM group, and has worked on industrial, construction, and overseas market projects across more than 10 countries. Source Rating applies that engineering and procurement context to buyer-side supplier decisions.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/about" className="text-brand-700 hover:text-brand-900">About James</Link>
            <Link href="/playbook" className="text-brand-700 hover:text-brand-900">Buyer playbook</Link>
            <Link href="/case-studies" className="text-brand-700 hover:text-brand-900">Anonymized cases</Link>
          </div>
        </aside>

        <div className="mt-12 rounded-md bg-brand-950 p-7 text-white sm:p-9">
          <h2 className="text-2xl font-bold">Want this applied to one real supplier?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-200">
            Send one supplier link, product category, destination country, and the issue that worries you most. The launch-stage first-pass risk screen is free and does not require an account.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href={`/risk-screen?source=${post.slug}`}
              eventName="cta_click"
              eventParams={{ location: "buyer_guide", label: "risk_screen", guide: post.slug }}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-brand-950 hover:bg-gray-100"
            >
              Start the free risk screen <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            <TrackedLink
              href="/pricing"
              eventName="pricing_click"
              eventParams={{ location: "buyer_guide", guide: post.slug }}
              className="inline-flex items-center justify-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              View verification scopes
            </TrackedLink>
          </div>
        </div>
      </div>
    </article>
  );
}
