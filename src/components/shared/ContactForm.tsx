"use client";

import { useState, FormEvent } from "react";
import { Send } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center">
        <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent</h3>
        <p className="text-green-700">Thank you for reaching out. I typically respond within 24 hours. For now, please email contact@sourcerating.com directly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
          <input type="text" id="name" name="name" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm" placeholder="Your full name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
          <input type="email" id="email" name="email" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm" placeholder="you@company.com" />
        </div>
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">Company / Country</label>
        <input type="text" id="company" name="company" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm" placeholder="Your company and location" />
      </div>
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1.5">Service Interest</label>
        <select id="service" name="service" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm bg-white">
          <option value="">Select a service...</option>
          <option value="factory-audit">Factory Audit & Verification</option>
          <option value="supplier-sourcing">Supplier Sourcing & Screening</option>
          <option value="production-monitoring">Production Monitoring & QC</option>
          <option value="background-check">Company Background Investigation</option>
          <option value="on-site-coordination">On-Site Coordination & Representation</option>
          <option value="supply-chain-advisory">Supply Chain Advisory</option>
          <option value="other">Other / Multiple</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Your Message *</label>
        <textarea id="message" name="message" required rows={5} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm resize-y" placeholder="Tell me about your project and what you're looking for..." />
      </div>
      <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-brand-700 rounded-lg hover:bg-brand-800 transition-colors disabled:opacity-50">
        {loading ? "Sending..." : <><Send className="h-4 w-4" /> Send Message</>}
      </button>
    </form>
  );
}
