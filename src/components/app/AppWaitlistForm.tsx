"use client";

import { useState } from "react";
import { CheckCircle2, Send, AlertCircle, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";

export function AppWaitlistForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Procurement Engineer");
  const [region, setRegion] = useState("China");
  const [priorityFeature, setPriorityFeature] = useState("MTC Verification");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/waitlist-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, region, priorityFeature }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to record preview waitlist entry.");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      // In preview mode, even if network fails locally, allow simulated success for UI inspection
      const message = err instanceof Error ? err.message : "Submission error";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setEmail("");
    setIsSuccess(false);
    setErrorMessage("");
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 sm:p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-gray-950">
          Waitlist Interest Recorded (Preview Mode)
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-gray-700 sm:text-sm max-w-md mx-auto">
          Thank you for testing the preview waitlist flow! Your submission for{" "}
          <strong className="text-brand-900">{email}</strong> was captured
          in our local Preview test registry.
        </p>

        <div className="mt-5 rounded-xl bg-white p-4 border border-emerald-200 text-left max-w-md mx-auto text-xs space-y-1.5 text-gray-600">
          <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-xs uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-emerald-700" />
            <span>Honest Preview Notice</span>
          </div>
          <p>• No promotional marketing emails or spam will be sent.</p>
          <p>• Data was saved to a local preview store only (`data/preview-waitlist.json`).</p>
          <p>• No payment or CRM webhooks were connected.</p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-brand-950 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-brand-800 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Test Another Submission</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-900">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Work Email */}
      <div>
        <label htmlFor="app-email" className="block text-xs font-bold uppercase tracking-wider text-gray-700">
          Work Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="app-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="procurement.lead@industrial-corp.com"
          className="mt-1 block w-full min-h-[48px] rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/20"
        />
      </div>

      {/* Role / Title */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="app-role" className="block text-xs font-bold uppercase tracking-wider text-gray-700">
            Your Role
          </label>
          <select
            id="app-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full min-h-[48px] rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/20"
          >
            <option value="Procurement Engineer">Procurement Engineer</option>
            <option value="Sourcing Director / Manager">Sourcing Director / Manager</option>
            <option value="QA/QC Factory Inspector">QA/QC Factory Inspector</option>
            <option value="Structural / Mechanical Engineer">Structural / Mechanical Engineer</option>
            <option value="Trade & Customs Broker">Trade & Customs Broker</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Primary Region */}
        <div>
          <label htmlFor="app-region" className="block text-xs font-bold uppercase tracking-wider text-gray-700">
            Primary Sourcing Region
          </label>
          <select
            id="app-region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="mt-1 block w-full min-h-[48px] rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/20"
          >
            <option value="China">China</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Thailand">Thailand</option>
            <option value="Indonesia / Malaysia">Indonesia / Malaysia</option>
            <option value="Global / Other">Global / Other</option>
          </select>
        </div>
      </div>

      {/* Priority Feature */}
      <div>
        <label htmlFor="app-feature" className="block text-xs font-bold uppercase tracking-wider text-gray-700">
          Feature of Highest Interest
        </label>
        <select
          id="app-feature"
          value={priorityFeature}
          onChange={(e) => setPriorityFeature(e.target.value)}
          className="mt-1 block w-full min-h-[48px] rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/20"
        >
          <option value="MTC Verification">Offline MTC Heat-Number Verifier</option>
          <option value="Photo Audit Stamps">Tamper-Evident Photo Logging (GPS/Time)</option>
          <option value="Bilingual Dispute Cards">Bilingual Factory Floor Communication Cards</option>
          <option value="Gate Scoring">Pre-Deposit & Pre-Shipment Gate Scoring</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-brand-950 px-5 py-3 text-sm font-bold text-white shadow hover:bg-brand-800 disabled:opacity-50 transition-colors"
      >
        {isSubmitting ? (
          <span>Recording Preview Submission...</span>
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span>Join Early Access Waitlist (Preview)</span>
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-gray-400">
        <Sparkles className="inline h-3 w-3 text-brand-600 mr-1" />
        Preview environment testing: records locally, no marketing newsletters or third-party CRM hooks.
      </p>
    </form>
  );
}
