"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Quote = {
  supplier: string;
  reference: string;
  product: string;
  quantity: string;
  currency: string;
  unitPrice: string;
  fxToUsd: string;
  freightUsd: string;
  dutyTaxUsd: string;
  inspectionUsd: string;
  otherUsd: string;
  technicalStatus: string;
};

type Computed = { total: number; perUnit: number } | null;
const emptyQuote = (): Quote => ({
  supplier: "", reference: "", product: "", quantity: "", currency: "",
  unitPrice: "", fxToUsd: "", freightUsd: "", dutyTaxUsd: "", inspectionUsd: "",
  otherUsd: "", technicalStatus: "UNKNOWN",
});
const money = (n: number) => new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 2,
}).format(n);
const valid = (raw: string, allowZero: boolean) => {
  if (!raw.trim()) return null;
  const n = Number(raw);
  return Number.isFinite(n) && (allowZero ? n >= 0 : n > 0) ? n : null;
};
const compute = (q: Quote): Computed => {
  const qty = valid(q.quantity, false);
  const price = valid(q.unitPrice, true);
  const fx = valid(q.fxToUsd, false);
  const costs = [q.freightUsd, q.dutyTaxUsd, q.inspectionUsd, q.otherUsd]
    .map((v) => valid(v, true));
  if (!q.supplier.trim() || !q.product.trim() || !q.currency.trim() ||
      qty === null || price === null || fx === null || costs.some((n) => n === null)) {
    return null;
  }
  const total = qty * price * fx + costs.reduce<number>((sum, n) => sum + (n ?? 0), 0);
  return { total, perUnit: total / qty };
};
const csvSafe = (value: string | number) => {
  let s = String(value);
  // User-entered supplier names/refs may not become spreadsheet formulas.
  if (/^[=+@\-\t\r]/.test(s.trimStart())) s = "'" + s;
  return '"' + s.replaceAll('"', '""') + '"';
};

export function QuoteComparisonTool() {
  const [quotes, setQuotes] = useState<Quote[]>([emptyQuote(), emptyQuote(), emptyQuote()]);
  const results = useMemo(() => quotes.map(compute), [quotes]);
  const ready = results.filter((r): r is NonNullable<Computed> => r !== null).length;
  const update = (index: number, key: keyof Quote, value: string) =>
    setQuotes((prev) => prev.map((q, i) => i === index ? { ...q, [key]: value } : q));

  const exportCsv = () => {
    const headings = ["Supplier", "Quote reference", "Item / specification", "Quantity", "Currency",
      "Unit price", "FX to USD", "Freight USD", "Duty and tax USD", "Inspection USD",
      "Other USD (incl. insurance)", "Technical status", "Estimated landed USD", "Landed USD/unit"];
    const rows = quotes.map((q, i) => [
      q.supplier, q.reference, q.product, q.quantity, q.currency, q.unitPrice,
      q.fxToUsd, q.freightUsd, q.dutyTaxUsd, q.inspectionUsd, q.otherUsd,
      q.technicalStatus, results[i]?.total ?? "", results[i]?.perUnit ?? "",
    ]);
    const csv = [headings, ...rows].map((row) => row.map(csvSafe).join(",")).join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = "source-rating-quote-comparison-lite.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(href);
    trackEvent("resource_download", { location: "quote_comparison", label: "editable_csv" });
  };

  const fields: Array<{ key: keyof Quote; label: string; type?: "number"; helper?: string }> = [
    { key: "supplier", label: "Supplier *" },
    { key: "reference", label: "Quote reference" },
    { key: "product", label: "Identical item / specification *" },
    { key: "quantity", label: "Quantity *", type: "number" },
    { key: "currency", label: "Quote currency *" },
    { key: "unitPrice", label: "Unit price *", type: "number" },
    { key: "fxToUsd", label: "FX rate to USD *", type: "number", helper: "Use a verified rate for this comparison." },
    { key: "freightUsd", label: "Freight USD *", type: "number" },
    { key: "dutyTaxUsd", label: "Duty / tax USD *", type: "number" },
    { key: "inspectionUsd", label: "Inspection USD *", type: "number" },
    { key: "otherUsd", label: "Other USD incl. insurance *", type: "number" },
  ];

  return (
    <section className="mt-9" aria-label="Supplier quotation comparison calculator">
      <div className="rounded-md border border-gray-200 bg-white p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-950">Build a like-for-like cost comparison</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
              All supplier details and prices stay in your browser. No account, upload, or stored quote data.
              Fill every starred cost (enter 0 only when the actual cost is known to be zero).
              Currency conversion is buyer-supplied, never an invented live rate.
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
            {ready} / {quotes.length} calculable
          </span>
        </div>
        <div className="mt-6 grid gap-5 xl:grid-cols-3">
          {quotes.map((q, i) => (
            <div key={i} className="rounded-md border border-gray-200 bg-[#f7f9f8] p-4">
              <h3 className="text-base font-bold text-gray-900">Quotation {i + 1}</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                {fields.map((field) => (
                  <label key={field.key} className="block">
                    <span className="mb-1 block text-xs font-semibold text-gray-700">{field.label}</span>
                    <input
                      type={field.type === "number" ? "number" : "text"}
                      inputMode={field.type === "number" ? "decimal" : undefined}
                      min={field.type === "number" ? "0" : undefined}
                      step={field.type === "number" ? "any" : undefined}
                      value={q[field.key]}
                      onChange={(event) => update(i, field.key, event.target.value)}
                      aria-label={"Quotation " + (i + 1) + ": " + field.label}
                      className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-950 focus:border-brand-700 focus:outline-none"
                    />
                    {field.helper && <span className="mt-1 block text-[11px] text-gray-500">{field.helper}</span>}
                  </label>
                ))}
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-gray-700">Technical evaluation</span>
                  <select value={q.technicalStatus} onChange={(e) => update(i, "technicalStatus", e.target.value)}
                    className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-950">
                    <option value="UNKNOWN">UNKNOWN / unverified</option>
                    <option value="PASS">PASS (buyer verified)</option>
                    <option value="HOLD">HOLD / clarify</option>
                    <option value="REJECT">REJECT</option>
                  </select>
                </label>
              </div>
              <div className="mt-5 rounded border border-gray-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase text-gray-500">Estimated landed total, USD</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">{results[i] ? money(results[i]!.total) : "Complete all required fields"}</p>
                <p className="mt-2 text-sm text-gray-600">USD per unit: <strong>{results[i] ? money(results[i]!.perUnit) : "—"}</strong></p>
                <p className="mt-2 text-xs text-gray-500">Cost estimate only. Technical approval is separate.</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => setQuotes((prev) => [...prev, emptyQuote()])}
            className="rounded-md border border-brand-700 px-5 py-3 text-sm font-semibold text-brand-800 hover:bg-emerald-50">
            Add a supplier
          </button>
          <button type="button" onClick={exportCsv}
            className="rounded-md bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800">
            Download editable CSV
          </button>
          <span className="text-xs text-gray-500">The CSV contains only entered fields and calculated results. Save it privately.</span>
        </div>
      </div>
    </section>
  );
}
