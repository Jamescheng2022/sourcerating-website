import type { Metadata } from "next";
import { Clock, Linkedin, Mail, MapPin, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/shared/ContactForm";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request China factory inspection, supplier verification, production monitoring, or industrial sourcing support.",
  keywords: ["contact China factory inspector", "China sourcing consultation", "factory audit inquiry"],
};

const benefits = [
  "Free initial scope review",
  "Response within 24 hours",
  "No supplier-side commissions",
  "Practical next-step recommendation",
  "Direct communication by email",
];

export default function ContactPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-700">Contact</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-gray-950">
              Send the supplier, product, or risk you need checked.
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Share what you know so far. We will recommend the right next step: supplier verification, factory audit, production inspection, or sourcing research.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Request a check</h2>
              <p className="text-gray-600 mb-8">The more detail you include, the faster we can scope the work.</p>
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
                        <p className="text-sm text-gray-600">Within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Location</p>
                        <p className="text-sm text-gray-600">China industrial regions</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-md bg-brand-50 border border-brand-100">
                  <h3 className="text-lg font-bold text-brand-950 mb-4">What to include</h3>
                  <ul className="space-y-3">
                    {benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <ShieldCheck className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                        <span className="text-sm text-brand-900">{b}</span>
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
