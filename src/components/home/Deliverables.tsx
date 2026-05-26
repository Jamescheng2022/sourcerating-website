import Link from "next/link";
import { ArrowRight, Camera, ClipboardCheck, FileText, ListChecks, MessageSquareText } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const deliverables = [
  { icon: FileText, title: "PDF verification report", text: "Structured findings, supplier profile, project-fit notes, and practical recommendations." },
  { icon: Camera, title: "Photo evidence", text: "Factory-floor photos, visible process evidence, packaging checks, and issue documentation." },
  { icon: ListChecks, title: "Risk rating", text: "Clear proceed / correct / pause indicators for commercial and quality decisions." },
  { icon: ClipboardCheck, title: "Supplier question list", text: "Follow-up questions and document requests to close gaps before commitment." },
  { icon: MessageSquareText, title: "Decision review", text: "A plain-English discussion of what the findings mean for your project." },
];

export function Deliverables() {
  return (
    <section className="py-20 bg-[#fbfbf8] border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="What you receive"
          title="Decision-ready evidence, not a generic inspection note."
          description="The output is built for project buyers who need to decide whether to approve a supplier, release a deposit, request corrections, or stop."
        />
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_0.75fr] gap-8 items-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {deliverables.map((item) => (
              <div key={item.title} className="rounded-md border border-gray-200 bg-white p-6">
                <item.icon className="h-5 w-5 text-brand-700" />
                <h3 className="mt-4 text-lg font-bold text-gray-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="rounded-md border border-brand-200 bg-white p-7">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Lead magnet</p>
            <h3 className="mt-3 text-2xl font-bold text-gray-950">Supplier Verification Checklist for Engineering Buyers</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Use this checklist to prepare supplier documents, drawings, QA/QC questions, material certificate checks, and factory visit priorities.
            </p>
            <div className="mt-6 rounded-md bg-[#f6f7f3] border border-gray-200 p-4 text-sm text-gray-700">
              Placeholder for downloadable checklist. Replace with a real PDF once prepared.
            </div>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800">
              Request the checklist <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
