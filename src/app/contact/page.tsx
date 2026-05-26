import type { Metadata } from "next";
import { Clock, Linkedin, Mail, MapPin, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/shared/ContactForm";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request China supplier verification, factory audit, pre-shipment inspection, or sourcing support for engineering and construction materials.",
  keywords: ["contact China factory inspector", "engineering supplier verification China", "construction materials sourcing consultation"],
};

const checklist = [
  "Supplier name, website, or sales contact",
  "Material category and project destination",
  "Drawings, specifications, or document status",
  "Order stage: before deposit, production, or shipment",
  "Your main risk concern",
];

export default function ContactPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">Contact</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-gray-950">
              Send the engineering supplier or material package you need checked.
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Share the supplier, product category, drawings/specification status, order stage, and project concern. You will receive a practical next-step recommendation within 24 hours.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Request a verification scope</h2>
              <p className="text-gray-600 mb-8">The more project context you include, the faster the scope and quote can be prepared.</p>
              <ContactForm />
            </div>
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="p-6 rounded-md bg-gray-50 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Direct contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Email</p>
                        <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-brand-700 hover:text-brand-800">{siteConfig.contact.email}</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Linkedin className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">LinkedIn</p>
                        <a href={siteConfig.social.linkedin} className="text-sm text-brand-700 hover:text-brand-800">Source Rating on LinkedIn</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Response time</p>
                        <p className="text-sm text-gray-600">Scope reply within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Location</p>
                        <p className="text-sm text-gray-600">China engineering and construction supply chain</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-md bg-brand-50 border border-brand-100">
                  <h3 className="text-lg font-bold text-brand-950 mb-4">Helpful details to include</h3>
                  <ul className="space-y-3">
                    {checklist.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <ShieldCheck className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                        <span className="text-sm text-brand-900">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
