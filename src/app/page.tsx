import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Wrench,
  ShieldAlert,
  Search,
  Clock,
  Calendar,
  Compass,
} from "lucide-react";
import { blogPosts } from "@/data/blog";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Industrial Sourcing Research & Buyer Field Notes",
  description:
    "Original industrial sourcing articles on specifications, supplier evidence and the details behind a purchase. Read the context, follow the sources and form your own judgment.",
  path: "/",
  ogImage: "/images/hero-factory-audit.png",
});

const quickTopics = [
  {
    label: "MTC Traceability",
    href: "/blog/how-to-verify-mill-test-certificates-and-heat-number-traceability-before-steel-shipment",
  },
  {
    label: "ASTM A123 HDG",
    href: "/blog/hot-dip-galvanized-steel-china-astm-a123-inspection",
  },
  {
    label: "ISO 9001 Scope",
    href: "/blog/iso-9001-certificate-factory-scope",
  },
  {
    label: "Weld Evidence",
    href: "/blog/weld-photo-not-joint-release-evidence",
  },
  {
    label: "Acceptance Sampling",
    href: "/blog/accepted-sampling-lot-not-zero-defects",
  },
  {
    label: "All 31 Articles",
    href: "/blog",
  },
];

const topics = [
  {
    title: "Specifications & standards",
    text: "Read the designation, edition and scope before comparing requirements.",
    href: "/blog/hot-dip-galvanized-steel-china-astm-a123-inspection",
  },
  {
    title: "Material & inspection records",
    text: "Connect what a document says to the material being shipped.",
    href: "/blog/how-to-verify-mill-test-certificates-and-heat-number-traceability-before-steel-shipment",
  },
  {
    title: "The scope behind a price",
    text: "Separate a cheaper quote from a different technical or commercial offer.",
    href: "/blog/compare-industrial-supplier-quotes-like-for-like",
  },
];

const focusLink =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700";

export default function HomePage() {
  const recent = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);

  return (
    <div className="bg-[#f7f6f2] pb-20 pt-24 text-brand-950 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* MOBILE-FIRST COMPACT HERO & SEARCH BAR                    */}
        {/* ========================================================= */}
        <section
          aria-labelledby="home-heading"
          className="rounded-2xl border border-brand-950/15 bg-white p-5 shadow-xs sm:p-8 lg:p-10"
        >
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-900">
              <Compass className="h-3.5 w-3.5 text-brand-700" />
              <span>Field Verification · Primary Evidence · Sourcing Intelligence</span>
            </div>

            <h1
              id="home-heading"
              className="mt-4 text-2xl font-bold tracking-tight text-brand-950 sm:text-4xl lg:text-5xl"
            >
              Industrial sourcing, in context.
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base sm:leading-7 max-w-2xl">
              The specification, the supplier record, the shipment. Original engineering articles
              and practical field inspection checklists that look closely at the evidence behind an
              industrial purchase.
            </p>

            {/* Clearer Search & Fast Navigation */}
            <div className="mt-6">
              <div className="relative max-w-xl">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  readOnly
                  placeholder="Quick lookup: ASTM, GB/T, MTC chemistry, ISO scope..."
                  className="block w-full min-h-[44px] rounded-lg border border-gray-300 bg-gray-50/70 pl-10 pr-24 text-xs text-gray-900 sm:text-sm focus:border-brand-700 focus:outline-none"
                />
                <div className="absolute inset-y-1 right-1 flex items-center">
                  <Link
                    href="/resources"
                    className="inline-flex min-h-[36px] items-center rounded-md bg-brand-950 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-brand-800 transition-colors"
                  >
                    <span>Search</span>
                  </Link>
                </div>
              </div>

              {/* Recommended Topic Chips */}
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Recommended:
                </span>
                {quickTopics.map((topic) => (
                  <Link
                    key={topic.label}
                    href={topic.href}
                    className="inline-flex min-h-[32px] items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 hover:border-brand-700 hover:bg-brand-50 hover:text-brand-900 transition-colors"
                  >
                    {topic.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3 UTILITY GATEWAYS: 资料领取 (Resource Hub) & 咨询入口       */}
        {/* ========================================================= */}
        <section
          aria-labelledby="gateways-heading"
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6"
        >
          <h2 id="gateways-heading" className="sr-only">
            Procurement Resources and Consultation Entry Points
          </h2>

          {/* Gateway 1: 资料领取 · Free Resource Index */}
          <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs hover:border-brand-300 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-900">
                  <BookOpen className="h-3.5 w-3.5 text-brand-800" />
                  <span>资料领取 · 官方索引</span>
                </span>
                <span className="font-mono text-[11px] text-gray-400">14 Sources</span>
              </div>
              <h3 className="mt-3 text-base font-bold text-gray-950">
                Procurement Resource Index
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-600 sm:text-sm">
                Official Chinese standards registry, customs HS classifications, SAC queries, and
                CNAS accreditation scopes. Free to browse and export to CSV.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <Link
                href="/resources"
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-brand-950 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-brand-800 transition-colors"
              >
                <span>Access Resource Index (资料领取)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Gateway 2: 资料领取 · Field Kits */}
          <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-xs hover:border-brand-300 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-900">
                  <Wrench className="h-3.5 w-3.5 text-brand-800" />
                  <span>资料领取 · 实战工具</span>
                </span>
                <span className="font-mono text-[11px] text-gray-400">Preview Tools</span>
              </div>
              <h3 className="mt-3 text-base font-bold text-gray-950">
                Factory Audit Field Kits
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-600 sm:text-sm">
                Bilingual inspection protocols, MTC chemical verification workbooks, and dispute
                evidence templates engineered for shopfloor buyers.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <Link
                href="/field-kits"
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-xs font-bold text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <span>View Preview Field Kits (工具包)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Gateway 3: 咨询入口 · Risk Screen */}
          <div className="flex flex-col justify-between rounded-xl border border-amber-200 bg-amber-50/40 p-5 shadow-xs hover:border-amber-300 transition-colors sm:col-span-2 lg:col-span-1">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900">
                  <ShieldAlert className="h-3.5 w-3.5 text-amber-800" />
                  <span>咨询入口 · 免费初筛</span>
                </span>
                <span className="font-mono text-[11px] text-amber-700">Pre-Deposit</span>
              </div>
              <h3 className="mt-3 text-base font-bold text-gray-950">
                Supplier Risk Screen
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-600 sm:text-sm">
                Reviewing a Chinese manufacturer before paying deposit? Submit your quote or supplier
                name for an independent engineering scope review.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-200/60">
              <Link
                href="/risk-screen"
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-amber-950 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-amber-900 transition-colors"
              >
                <span>Request Free Risk Screen (咨询入口)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* FEATURED INFORMATION STREAM: RECENT JOURNAL ARTICLES      */}
        {/* ========================================================= */}
        <section aria-labelledby="recent-heading" className="py-12 sm:py-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
                From the journal
              </p>
              <h2 id="recent-heading" className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                Recent Intelligence & Field Notes
              </h2>
            </div>
            <Link
              href="/blog"
              className={`inline-flex min-h-[44px] items-center gap-2 text-xs font-bold text-brand-700 hover:text-brand-900 ${focusLink}`}
            >
              <span>Browse all articles (31)</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {recent.map((post, index) => (
              <article
                key={post.slug}
                className={`min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-colors hover:border-brand-300 ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-block rounded-md bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-800">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <time dateTime={post.date}>
                        {new Date(`${post.date}T00:00:00Z`).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          timeZone: "UTC",
                        })}
                      </time>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>
                </div>

                <h3
                  className={`mt-3 font-bold leading-snug tracking-tight text-gray-950 ${
                    index === 0 ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                  }`}
                >
                  <Link href={`/blog/${post.slug}`} className={`hover:text-brand-700 ${focusLink}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-2.5 text-xs leading-relaxed text-gray-600 sm:text-sm">
                  {post.excerpt}
                </p>

                {post.coverImage ? (
                  <figure className="mt-4">
                    <Image
                      src={post.coverImage.src}
                      alt={post.coverImage.alt}
                      width={post.coverImage.width}
                      height={post.coverImage.height}
                      sizes="(min-width: 1024px) 48vw, 100vw"
                      className="h-auto w-full rounded-lg border border-gray-200"
                    />
                    <figcaption className="mt-2 text-[11px] leading-5 text-gray-500">
                      {post.coverImage.caption}
                    </figcaption>
                  </figure>
                ) : null}

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-800 hover:text-brand-950"
                  >
                    <span>Read full article & inspect evidence</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* TOPIC INQUIRIES: FOLLOW A QUESTION                        */}
        {/* ========================================================= */}
        <section aria-labelledby="topics-heading" className="border-t border-gray-200 py-10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
                Decision Frameworks
              </p>
              <h2 id="topics-heading" className="mt-2 text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
                Follow a Key Procurement Question
              </h2>
            </div>
            <Link
              href="/buyer-decisions"
              className={`inline-flex items-center gap-2 text-xs font-bold text-brand-700 hover:text-brand-900 ${focusLink}`}
            >
              <span>Buyer Decision Guides</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {topics.map((topic) => (
              <div
                key={topic.href}
                className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-xs"
              >
                <h3 className="text-base font-bold text-gray-950">
                  <Link
                    href={topic.href}
                    className={`hover:text-brand-700 ${focusLink}`}
                  >
                    {topic.title}
                  </Link>
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
                  {topic.text}
                </p>
                <Link
                  href={topic.href}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-800 hover:underline"
                >
                  <span>Explore guide</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* RESEARCH MEMBERSHIP SCOPE NOTE                            */}
        {/* ========================================================= */}
        <section
          aria-labelledby="membership-heading"
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs my-6 sm:p-8"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
              Looking further
            </p>
            <h2 id="membership-heading" className="mt-2 text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
              Research with more depth.
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-gray-700 sm:text-sm">
              A research membership is being prepared. The scope and delivery details are still taking
              shape; the public article collection remains completely free to read.
            </p>
            <div className="mt-4">
              <Link
                href="/membership"
                className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-xs font-bold text-gray-800 hover:bg-gray-200 ${focusLink}`}
              >
                <span>Read about the planned membership</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* DIRECT CONSULTATION & SERVICE FOOTER ASIDE                */}
        {/* ========================================================= */}
        <aside
          aria-label="Supplier services"
          className="rounded-xl border border-brand-950/10 bg-brand-50/40 p-5 text-xs leading-relaxed text-gray-700 sm:text-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <strong>Working on a specific supplier question or active factory audit?</strong>
              <p className="text-gray-600 mt-0.5">
                Independent on-the-ground inspection teams across China, Vietnam, and Thailand.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/services"
                className="font-bold text-brand-900 underline underline-offset-4 hover:text-brand-700"
              >
                Explore services
              </Link>
              <span className="text-gray-300">·</span>
              <Link
                href="/pricing"
                className="font-bold text-brand-900 underline underline-offset-4 hover:text-brand-700"
              >
                Review pricing
              </Link>
              <span className="text-gray-300">·</span>
              <Link
                href="/risk-screen"
                className="font-bold text-brand-900 underline underline-offset-4 hover:text-brand-700"
              >
                Request risk screen
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
