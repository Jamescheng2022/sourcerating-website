"use client";

import { useState, FormEvent } from "react";
import { Send } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => null);

    if (response?.ok) {
      form.reset();
      setState("success");
      return;
    }

    setState("error");
  }

  if (state === "success") {
    return (
      <div className="p-7 rounded-md bg-green-50 border border-green-200">
        <h3 className="text-xl font-bold text-green-900 mb-2">Message sent</h3>
        <p className="text-green-800">
          Thank you. I will review your request and respond within 24 hours. You can also email contact@sourcerating.com directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
          <input type="text" id="name" name="name" required className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm" placeholder="Your full name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Work email *</label>
          <input type="email" id="email" name="email" required className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm" placeholder="you@company.com" />
        </div>
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">Company / Country</label>
        <input type="text" id="company" name="company" className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm" placeholder="Company name and location" />
      </div>
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1.5">What do you need checked?</label>
        <select id="service" name="service" className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm bg-white">
          <option value="">Select the closest fit...</option>
          <option value="Factory Audit & Verification">Factory Audit & Verification</option>
          <option value="Supplier Sourcing & Screening">Supplier Sourcing & Screening</option>
          <option value="Production Monitoring & QC">Production Monitoring & QC</option>
          <option value="Company Background Investigation">Company Background Investigation</option>
          <option value="On-Site Coordination & Representation">On-Site Coordination & Representation</option>
          <option value="Supply Chain Advisory">Supply Chain Advisory</option>
          <option value="Other / Multiple">Other / Multiple</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Supplier, product, or risk concern *</label>
        <textarea id="message" name="message" required rows={5} className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm resize-y" placeholder="Share supplier name/link, product type, order stage, timeline, and what you are worried about." />
      </div>
      {state === "error" && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          The form could not send right now. Please email contact@sourcerating.com directly.
        </div>
      )}
      <button type="submit" disabled={state === "loading"} className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-brand-700 rounded-md hover:bg-brand-800 transition-colors disabled:opacity-50">
        {state === "loading" ? "Sending..." : <><Send className="h-4 w-4" /> Send inquiry</>}
      </button>
    </form>
  );
}
