"use client";

import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

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
      trackEvent("form_submit_success", { form: "engineering_inquiry" });
      return;
    }

    setState("error");
    trackEvent("form_submit_error", { form: "engineering_inquiry" });
  }

  if (state === "success") {
    return (
      <div className="p-7 rounded-md bg-green-50 border border-green-200">
        <h3 className="text-xl font-bold text-green-900 mb-2">Message sent</h3>
        <p className="text-green-800">
          Thank you. I will review your supplier/project context and respond within 24 hours. You can also email contact@sourcerating.com directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-fax-number">Fax number</label>
        <input
          id="contact-fax-number"
          name="fax_number"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">Company / Country</label>
          <input type="text" id="company" name="company" className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm" placeholder="Company and location" />
        </div>
        <div>
          <label htmlFor="targetCountry" className="block text-sm font-medium text-gray-700 mb-1.5">Target country / project location</label>
          <input type="text" id="targetCountry" name="targetCountry" className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm" placeholder="e.g. Germany, UK, Australia" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1.5">Project type</label>
          <select id="projectType" name="projectType" className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm bg-white">
            <option value="">Select...</option>
            <option value="Supplier verification before deposit">Supplier verification before deposit</option>
            <option value="Factory audit before approval">Factory audit before approval</option>
            <option value="Pre-shipment inspection">Pre-shipment inspection</option>
            <option value="Production monitoring">Production monitoring</option>
            <option value="Supplier sourcing / shortlist">Supplier sourcing / shortlist</option>
            <option value="China factory visit support">China factory visit support</option>
          </select>
        </div>
        <div>
          <label htmlFor="materialCategory" className="block text-sm font-medium text-gray-700 mb-1.5">Material / component category</label>
          <select id="materialCategory" name="materialCategory" className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm bg-white">
            <option value="">Select...</option>
            <option value="Structural / fabricated systems">Structural / fabricated systems</option>
            <option value="Architectural / finishing materials">Architectural / finishing materials</option>
            <option value="MEP / building systems">MEP / building systems</option>
            <option value="Civil / infrastructure materials">Civil / infrastructure materials</option>
            <option value="Construction equipment / site support">Construction equipment / site support</option>
            <option value="Custom project components">Custom project components</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-1.5">Supplier name / website / link</label>
          <input type="text" id="supplier" name="supplier" className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm" placeholder="Factory name, website, Alibaba link, etc." />
        </div>
        <div>
          <label htmlFor="orderStage" className="block text-sm font-medium text-gray-700 mb-1.5">Current order stage</label>
          <select id="orderStage" name="orderStage" className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm bg-white">
            <option value="">Select...</option>
            <option value="Early supplier search">Early supplier search</option>
            <option value="Before deposit">Before deposit</option>
            <option value="Before contract">Before contract</option>
            <option value="Production ongoing">Production ongoing</option>
            <option value="Before shipment">Before shipment</option>
            <option value="Quality or delay problem">Quality or delay problem</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="drawingStatus" className="block text-sm font-medium text-gray-700 mb-1.5">Drawings / specifications availability</label>
        <select id="drawingStatus" name="drawingStatus" className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm bg-white">
          <option value="">Select...</option>
          <option value="Drawings/specifications available">Drawings/specifications available</option>
          <option value="Only preliminary specs available">Only preliminary specs available</option>
          <option value="Supplier documents available">Supplier documents available</option>
          <option value="No technical documents yet">No technical documents yet</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Main risk concern / project context *</label>
        <textarea id="message" name="message" required rows={5} className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm resize-y" placeholder="Tell me what you need to verify: capacity, QA/QC, drawings, certificates, delivery schedule, packaging, shipment release, or supplier reliability." />
      </div>
      {state === "error" && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          The form could not send right now. Please email contact@sourcerating.com directly.
        </div>
      )}
      <button type="submit" disabled={state === "loading"} className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-brand-700 rounded-md hover:bg-brand-800 transition-colors disabled:opacity-50">
        {state === "loading" ? "Sending..." : <><Send className="h-4 w-4" /> Send engineering inquiry</>}
      </button>
    </form>
  );
}
