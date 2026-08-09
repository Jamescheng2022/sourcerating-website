import { siteConfig } from "@/data/site-config";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Terms of Service",
  description: "Terms of service for Source Rating inspection, sourcing, and advisory inquiries.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <section className="pt-28 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-950">Terms of Service</h1>
        <p className="mt-4 text-gray-600 leading-relaxed">
          These terms provide a plain-English overview for website inquiries. Specific paid engagements are governed by the written scope, proposal, or service agreement agreed with the client.
        </p>
        <div className="mt-10 space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-gray-950 mb-3">Service scope</h2>
            <p>Factory inspections, supplier verification, sourcing support, and advisory work are performed according to the agreed scope, timeline, and available information.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-950 mb-3">No guarantee of supplier performance</h2>
            <p>Reports and recommendations reduce uncertainty but cannot guarantee future supplier behavior, production outcomes, or commercial results.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-950 mb-3">Client responsibility</h2>
            <p>Clients remain responsible for final supplier selection, contracts, payments, logistics decisions, and commercial commitments.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-950 mb-3">Contact</h2>
            <p>For questions, email <a className="text-brand-700 font-medium" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
