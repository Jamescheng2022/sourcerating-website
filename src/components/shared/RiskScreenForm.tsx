"use client";

import { FormEvent, useState } from "react";
import { AlertTriangle, CheckCircle2, FileSearch, Mail, Send, ShieldCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type FormState = "idle" | "loading" | "success" | "error";

interface RiskAssessment {
  riskLevel: "Low" | "Moderate" | "High";
  confidence: string;
  summary: string;
  keyRisks: string[];
  evidenceToRequest: string[];
  questionsForSupplier: string[];
  recommendedNextStep: string;
}

interface RiskScreenResponse {
  ok: boolean;
  source: "deepseek" | "rules";
  emailQueued: boolean;
  assessment: RiskAssessment;
  message: string;
}

function riskTone(level: RiskAssessment["riskLevel"]) {
  if (level === "High") return "border-red-200 bg-red-50 text-red-900";
  if (level === "Moderate") return "border-amber-200 bg-amber-50 text-amber-900";
  return "border-green-200 bg-green-50 text-green-900";
}

function ResultList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-gray-950">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-gray-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RiskScreenForm() {
  const [state, setState] = useState<FormState>("idle");
  const [result, setResult] = useState<RiskScreenResponse | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError("");
    setResult(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/risk-screen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => null);

    const data = await response?.json().catch(() => null);

    if (response?.ok && data?.assessment) {
      setResult(data as RiskScreenResponse);
      setState("success");
      trackEvent("form_submit_success", { form: "risk_screen", source: data.source });
      return;
    }

    setState("error");
    setError(data?.error || "The screen could not run right now. Please email contact@sourcerating.com directly.");
    trackEvent("form_submit_error", { form: "risk_screen" });
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <form onSubmit={handleSubmit} className="space-y-6 border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-gray-800">Name *</label>
            <input id="name" name="name" required className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500" placeholder="Your full name" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-gray-800">Work email *</label>
            <input id="email" name="email" type="email" required className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500" placeholder="you@company.com" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="company" className="mb-1.5 block text-sm font-semibold text-gray-800">Company</label>
            <input id="company" name="company" className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500" placeholder="Company name" />
          </div>
          <div>
            <label htmlFor="country" className="mb-1.5 block text-sm font-semibold text-gray-800">Your country</label>
            <input id="country" name="country" className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500" placeholder="e.g. UK, Germany, Australia" />
          </div>
        </div>

        <div>
          <label htmlFor="supplier" className="mb-1.5 block text-sm font-semibold text-gray-800">Supplier name / website / marketplace link *</label>
          <input id="supplier" name="supplier" required className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500" placeholder="Factory name, website, Alibaba link, or contact details" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="mb-1.5 block text-sm font-semibold text-gray-800">Material / equipment category *</label>
            <select id="category" name="category" required className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500">
              <option value="">Select...</option>
              <option value="Structural / fabricated systems">Structural / fabricated systems</option>
              <option value="Architectural / finishing materials">Architectural / finishing materials</option>
              <option value="MEP / building systems">MEP / building systems</option>
              <option value="Civil / infrastructure materials">Civil / infrastructure materials</option>
              <option value="Construction equipment / site support">Construction equipment / site support</option>
              <option value="Custom project components">Custom project components</option>
            </select>
          </div>
          <div>
            <label htmlFor="stage" className="mb-1.5 block text-sm font-semibold text-gray-800">Current order stage *</label>
            <select id="stage" name="stage" required className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500">
              <option value="">Select...</option>
              <option value="Early supplier search">Early supplier search</option>
              <option value="Before deposit">Before deposit</option>
              <option value="Before contract">Before contract</option>
              <option value="Production ongoing">Production ongoing</option>
              <option value="Before shipment">Before shipment</option>
              <option value="Quality, delay, or dispute problem">Quality, delay, or dispute problem</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="targetMarket" className="mb-1.5 block text-sm font-semibold text-gray-800">Target market / project location</label>
            <input id="targetMarket" name="targetMarket" className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500" placeholder="e.g. EU, UK, US, Australia" />
          </div>
          <div>
            <label htmlFor="drawingStatus" className="mb-1.5 block text-sm font-semibold text-gray-800">Drawings / specifications</label>
            <select id="drawingStatus" name="drawingStatus" className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500">
              <option value="">Select...</option>
              <option value="Drawings/specifications available">Drawings/specifications available</option>
              <option value="Only preliminary specs available">Only preliminary specs available</option>
              <option value="Supplier documents available">Supplier documents available</option>
              <option value="No technical documents yet">No technical documents yet</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="concern" className="mb-1.5 block text-sm font-semibold text-gray-800">Main concern / project context *</label>
          <textarea id="concern" name="concern" required rows={6} className="w-full resize-y rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500" placeholder="Describe what worries you: supplier identity, capacity, certificates, drawings, quality, delivery, payment, shipment release, or anything unusual." />
        </div>

        {state === "error" && (
          <div className="flex gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <button type="submit" disabled={state === "loading"} className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:opacity-50">
          {state === "loading" ? "Screening..." : <><Send className="h-4 w-4" /> Run preliminary screen</>}
        </button>
      </form>

      <aside className="border border-gray-200 bg-[#f7f8f5] p-6">
        {result ? (
          <div>
            <div className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-bold ${riskTone(result.assessment.riskLevel)}`}>
              <ShieldCheck className="h-4 w-4" />
              {result.assessment.riskLevel} risk
            </div>
            <h3 className="mt-5 text-2xl font-bold text-gray-950">Preliminary screen result</h3>
            <p className="mt-3 text-sm leading-6 text-gray-700">{result.assessment.summary}</p>
            <div className="mt-6 grid grid-cols-1 gap-6">
              <ResultList title="Key risk signals" items={result.assessment.keyRisks} />
              <ResultList title="Evidence to request" items={result.assessment.evidenceToRequest} />
              <ResultList title="Questions for the supplier" items={result.assessment.questionsForSupplier} />
            </div>
            <div className="mt-6 border-l-4 border-brand-700 bg-white p-4">
              <h4 className="text-sm font-bold text-gray-950">Recommended next step</h4>
              <p className="mt-2 text-sm leading-6 text-gray-700">{result.assessment.recommendedNextStep}</p>
            </div>
            <div className="mt-5 flex gap-3 rounded-md border border-gray-200 bg-white p-4 text-sm leading-6 text-gray-700">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
              <p>
                {result.message} This is not a final audit report; it is a first-pass screen before human review.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-white text-brand-700 ring-1 ring-gray-200">
              <FileSearch className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-2xl font-bold text-gray-950">What you get immediately</h3>
            <div className="mt-6 space-y-5">
              {[
                ["Risk level", "A low, moderate, or high preliminary risk view based on order stage and evidence gaps."],
                ["Evidence list", "A focused request list you can send to the supplier before paying for a visit."],
                ["Supplier questions", "Practical questions that reveal whether the supplier really controls the work."],
                ["Human follow-up", "Your submission is forwarded for manual review when email delivery is configured."],
              ].map(([title, text]) => (
                <div key={title} className="border-t border-gray-200 pt-4 first:border-t-0 first:pt-0">
                  <h4 className="font-bold text-gray-950">{title}</h4>
                  <p className="mt-1 text-sm leading-6 text-gray-600">{text}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 border-l-4 border-brand-700 bg-white p-4 text-sm leading-6 text-gray-700">
              No login is required for this MVP. Do not upload confidential drawings yet; summarize the package and send sensitive files by email after we confirm scope.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
