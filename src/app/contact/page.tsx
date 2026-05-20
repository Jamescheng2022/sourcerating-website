import type { Metadata } from "next";
import { Mail, MessageSquare, Clock, MapPin, Check } from "lucide-react";
import { ContactForm } from "@/components/shared/ContactForm";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Contact", description: "Get in touch for China factory inspection, supplier verification, or industrial sourcing support. Free initial consultation with response within 24 hours.",
  keywords: ["contact China factory inspector","China sourcing consultation","factory audit inquiry"],
};

const benefits = ["Free initial consultation","Response within 24 hours","No obligation","Tailored proposal","Direct communication"];

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-brand-950 to-brand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-3xl"><span className="text-sm font-semibold uppercase tracking-wider text-brand-300">Contact</span><h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-white">Let&apos;s discuss your China sourcing needs</h1><p className="mt-4 text-lg text-gray-300 leading-relaxed">Whether you&apos;re evaluating a new supplier, concerned about production quality, or planning your first China sourcing project — tell me about your situation.</p></div></div>
      </section>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3"><h2 className="text-2xl font-bold text-gray-900 mb-2">Send me a message</h2><p className="text-gray-600 mb-8">Tell me about your project and what you&apos;re looking for.</p><ContactForm /></div>
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div className="p-6 rounded-xl bg-gray-50 border border-gray-100"><h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3"><Mail className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" /><div><p className="text-sm font-medium text-gray-900">Email</p><a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-brand-600 hover:text-brand-700">{siteConfig.contact.email}</a></div></div>
                    <div className="flex items-start gap-3"><MessageSquare className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" /><div><p className="text-sm font-medium text-gray-900">WeChat</p><p className="text-sm text-gray-600">{siteConfig.contact.wechat}</p></div></div>
                    <div className="flex items-start gap-3"><Clock className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" /><div><p className="text-sm font-medium text-gray-900">Response Time</p><p className="text-sm text-gray-600">Within 24 hours</p></div></div>
                    <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" /><div><p className="text-sm font-medium text-gray-900">Location</p><p className="text-sm text-gray-600">China — Industrial Regions</p></div></div>
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-brand-50 border border-brand-100"><h3 className="text-lg font-bold text-brand-900 mb-4">What to expect</h3><ul className="space-y-3">{benefits.map((b) => (<li key={b} className="flex items-start gap-2.5"><Check className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" /><span className="text-sm text-brand-800">{b}</span></li>))}</ul></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
