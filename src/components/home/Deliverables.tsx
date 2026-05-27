import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Camera, ClipboardCheck, FileText, ListChecks, MessageSquareText } from "lucide-react";

const deliverables = [
  { icon: FileText, title: "PDF verification report", text: "Structured findings, supplier profile, project-fit notes, and practical recommendations." },
  { icon: Camera, title: "Photo evidence", text: "Factory-floor photos, visible process evidence, packaging checks, and issue documentation." },
  { icon: ListChecks, title: "Risk rating", text: "Clear proceed / correct / pause indicators for commercial and quality decisions." },
  { icon: ClipboardCheck, title: "Supplier question list", text: "Follow-up questions and document requests to close gaps before commitment." },
  { icon: MessageSquareText, title: "Decision review", text: "A plain-English discussion of what the findings mean for your project." },
];

export function Deliverables() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-center">
          <div className="relative overflow-hidden rounded-md border border-gray-200 bg-gray-100 aspect-[4/3]">
            <Image
              src="/images/checklist-report-pack.png"
              alt="Supplier verification report package with inspection evidence"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase text-brand-600">What you receive</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-950">
              A report your team can actually make a decision from.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Clear evidence, risk ratings, and next steps for approving, correcting, or pausing a supplier.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deliverables.map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-950">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.text}</p>
                </div>
              </div>
            ))}
            </div>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800">
              Request the engineering checklist <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
