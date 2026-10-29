import { generatePageMetadata } from "@/lib/metadata";
import { IaProposalViewer } from "@/components/ia-proposal/IaProposalViewer";
import { Compass, ShieldCheck } from "lucide-react";

export const metadata = generatePageMetadata({
  title: "Mobile IA & Navigation Redesign Proposal | Phase 2",
  description:
    "Comprehensive comparison of Direction A (Trade Directory & Workstation) vs Direction B (Intelligence Journal & Decision Brief) for sourcerating.com mobile redesign.",
  path: "/ia-proposal",
  noIndex: true,
});

export default function IaProposalPage() {
  return (
    <div className="min-h-screen bg-[#f7f8f6] pb-24 pt-24 sm:pt-28">
      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-brand-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-800/80 px-3 py-1 text-xs font-semibold text-brand-200">
              <Compass className="h-3.5 w-3.5" />
              <span>Phase 2 Mobile Architecture · Proposal & Demo</span>
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Mobile Navigation & Information Architecture Proposal
            </h1>
            <p className="mt-4 text-base leading-relaxed text-gray-200 sm:text-lg">
              Two distinct interaction and visual directions developed for
              evaluating the mobile experience of sourcerating.com: tying together
              the Resource Library, Intelligence dossiers, Field Kits, and the
              Mobile App early-access waitlist.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 space-y-12">
        {/* Interactive Viewer */}
        <IaProposalViewer />

        {/* Detailed Architectural Evaluation */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs sm:p-8">
          <h2 className="text-xl font-bold text-gray-950 sm:text-2xl">
            Architectural Trade-Off Analysis for Claude Lead
          </h2>
          <p className="mt-2 text-xs text-gray-600 sm:text-sm">
            Below is the structured breakdown comparing ergonomics, development
            complexity, information density, and brand positioning:
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-gray-800 font-bold">
                  <th className="py-3 px-4">Evaluation Dimension</th>
                  <th className="py-3 px-4 text-brand-900">
                    Direction A: Trade Directory & Workstation
                  </th>
                  <th className="py-3 px-4 text-brand-900">
                    Direction B: Intelligence Journal & Brief
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr>
                  <td className="py-3 px-4 font-semibold text-gray-900 bg-gray-50/50">
                    Primary Interaction
                  </td>
                  <td className="py-3 px-4">
                    Persistent bottom dock + 2x3 quick-jump tile grid
                  </td>
                  <td className="py-3 px-4">
                    Clean header masthead + categorized thematic slide drawer
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-gray-900 bg-gray-50/50">
                    Mobile Thumb Ergonomics
                  </td>
                  <td className="py-3 px-4">
                    <strong>Optimal for one-handed operation:</strong> 5 primary
                    tools reside in bottom 15% thumb zone.
                  </td>
                  <td className="py-3 px-4">
                    <strong>Optimal for reading flow:</strong> Zero viewport
                    obstruction; full screen height dedicated to prose.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-gray-900 bg-gray-50/50">
                    Target Persona
                  </td>
                  <td className="py-3 px-4">
                    Factory inspectors, on-site engineers, quick-reference triage
                  </td>
                  <td className="py-3 px-4">
                    Sourcing directors, VP of procurement, supply chain analysts
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-gray-900 bg-gray-50/50">
                    Mental Model
                  </td>
                  <td className="py-3 px-4">
                    &quot;A pocket workbench of inspection checklists and databases&quot;
                  </td>
                  <td className="py-3 px-4">
                    &quot;A trusted industrial research briefing and decision journal&quot;
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-gray-900 bg-gray-50/50">
                    Trade-Offs & Risks
                  </td>
                  <td className="py-3 px-4">
                    Consumes 56px bottom vertical height; slightly less &quot;editorial
                    prestige&quot; feeling.
                  </td>
                  <td className="py-3 px-4">
                    Requires opening the hamburger menu to switch between tools;
                    higher tap count for rapid multi-tasking.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-gray-900 bg-gray-50/50">
                    Recommendation
                  </td>
                  <td colSpan={2} className="py-3 px-4 bg-brand-50/50 text-brand-950 font-medium">
                    <strong>Hybrid Synthesis:</strong> Adopt <em>Direction A&apos;s bottom dock</em> for active field surfaces (`/resources`, `/field-kits`, `/app`) while preserving <em>Direction B&apos;s clean editorial reading canvas</em> on article pages (`/blog/[slug]` and `/intelligence`) by auto-hiding the bottom dock on deep reading screens.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Verification & Compliance Standards Notice */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex items-center gap-2 text-brand-900 font-bold text-base">
            <ShieldCheck className="h-5 w-5 text-brand-700" />
            <span>Mobile Engineering Quality Standards Verified</span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs text-gray-600">
            <div className="rounded-xl bg-gray-50 p-4 border border-gray-200">
              <strong className="text-gray-900 block text-sm">320px Viewport Proofing</strong>
              <p className="mt-1 leading-relaxed">
                Tested against iPhone SE and legacy 320px widths with `min-w-0`, `break-words`, and zero horizontal page overflow.
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 border border-gray-200">
              <strong className="text-gray-900 block text-sm">≥44px Tap Targets</strong>
              <p className="mt-1 leading-relaxed">
                All navigation links, filter buttons, search inputs, and modal triggers meet or exceed Apple HIG and WCAG 2.1 AA targets.
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 border border-gray-200">
              <strong className="text-gray-900 block text-sm">Honest Non-Commercial Preview</strong>
              <p className="mt-1 leading-relaxed">
                Zero dummy payment gateways, zero fake SKU commitments, zero unauthorized data storage, and zero marketing email pipelines.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
