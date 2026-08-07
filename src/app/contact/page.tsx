import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Linkedin, Mail, MapPin, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/shared/ContactForm";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact James Cheng / Source Rating for engineering supplier verification, factory visits, pre-shipment inspection, or buyer-side procurement support across China, Vietnam, and Southeast Asia.",
  keywords: ["contact China factory inspector", "engineering supplier verification China", "Vietnam supplier verification", "engineering procurement advisor"],
};

const checklist = [
  "Supplier name, website, or sales contact — or tell me if you still need supplier options",
  "Material category and project destination",
  "Drawings, specifications, or document status",
  "Order stage: screening, before deposit, production, or shipment",
  "Your main technical, commercial, or delivery concern",
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-gray-200 bg-[#f7f8f5] pb-16 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="text-sm font-semibold uppercase text-brand-700">Contact</span>
            <h1 className="mt-3 text-4xl font-bold text-gray-950 sm:text-5xl">
              Send the supplier, RFQ, or project package. Get a practical next step.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Share the supplier, product category, drawings/specification status, order stage, and project concern. If you do not yet have a supplier, send the project requirement instead. You will receive practical scope and quote guidance within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="mb-2 text-2xl font-bold text-gray-900">Request a verification or procurement scope</h2>
              <p className="mb-8 text-gray-600">The more project context you include, the faster the scope and quote can be prepared.</p>
              <ContactForm />
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="rounded-md border border-gray-200 bg-gray-50 p-6">
                  <h3 className="mb-4 text-lg font-bold text-gray-900">Direct contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">James Cheng / Source Rating</p>
                        <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-brand-700 hover:text-brand-800">{siteConfig.contact.email}</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Linkedin className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">LinkedIn</p>
                        <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="text-sm text-brand-700 hover:text-brand-800">linkedin.com/in/hcrdi</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Response time</p>
                        <p className="text-sm text-gray-600">Scope reply within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Base and coverage</p>
                        <p className="text-sm text-gray-600">Based in Thailand; supplier support across China, Vietnam, and Southeast Asia</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border border-brand-100 bg-brand-50 p-6">
                  <h3 className="mb-4 text-lg font-bold text-brand-950">Helpful details to include</h3>
                  <ul className="space-y-3">
                    {checklist.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                        <span className="text-sm text-brand-900">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-md border border-gray-200 bg-white p-6">
                  <h3 className="text-lg font-bold text-gray-900">Payment during launch</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Paid scopes are confirmed by written scope and invoice. Thailand bank transfer is the default launch payment method; bank details are shared only on the invoice.
                  </p>
                  <Link href="/pricing" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">
                    View pricing and procurement fees <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
