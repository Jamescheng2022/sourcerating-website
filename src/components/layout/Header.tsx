"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  BookOpen,
  Compass,
  Wrench,
  Smartphone,
  ShieldAlert,
  ClipboardList,
  Building2,
  DollarSign,
  HelpCircle,
  Mail,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { useMobileIa } from "./MobileIaContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { iaMode, toggleIaMode } = useMobileIa();

  // Highlight key nav items for desktop
  const desktopNavItems = [
    { label: "Resources", href: "/resources" },
    { label: "Intelligence", href: "/intelligence" },
    { label: "Field Kits", href: "/field-kits" },
    { label: "Services", href: "/services" },
    { label: "Buyer Guides", href: "/buyer-decisions" },
    { label: "Playbook", href: "/playbook" },
    { label: "App", href: "/app" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Logo />
            {/* Mode badge for reviewers on mobile & desktop */}
            <button
              type="button"
              onClick={toggleIaMode}
              className="inline-flex min-h-[32px] items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-bold text-gray-700 hover:bg-gray-100 transition-colors"
              title="Toggle between Direction A (Trade Directory) and Direction B (Editorial Journal)"
              aria-label={`Toggle mobile IA mode. Current: ${iaMode}`}
            >
              <SlidersHorizontal className="h-3 w-3 text-brand-700" />
              <span>{iaMode === "directory" ? "Dir A" : "Dir B"}</span>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-0.5">
            {desktopNavItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors",
                    isActive
                      ? "text-brand-900 bg-brand-50"
                      : "text-gray-600 hover:text-brand-900 hover:bg-gray-50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden xl:flex items-center gap-3">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-xs font-semibold text-gray-600 hover:text-brand-700 transition-colors"
            >
              {siteConfig.contact.email}
            </a>
            <Link
              href="/risk-screen"
              className="inline-flex items-center px-3.5 py-2 text-xs font-bold text-white bg-brand-950 rounded-lg hover:bg-brand-800 transition-colors shadow-xs"
            >
              Free Risk Screen
            </Link>
          </div>

          {/* Mobile Menu Trigger button (min 44x44px tap target) */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              href="/risk-screen"
              className="inline-flex min-h-[38px] items-center px-3 py-1.5 text-xs font-bold text-white bg-brand-950 rounded-lg"
            >
              Risk Screen
            </Link>
            <button
              type="button"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-gray-700 hover:text-gray-950 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-gray-100 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Header info showing current direction */}
            <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-50 p-2.5 text-xs text-gray-600">
              <span className="font-medium">
                Active Direction:{" "}
                <strong className="text-gray-900">
                  {iaMode === "directory"
                    ? "A: Trade Directory & Workstation"
                    : "B: Intelligence Journal & Dossiers"}
                </strong>
              </span>
              <button
                type="button"
                onClick={toggleIaMode}
                className="font-bold text-brand-800 underline underline-offset-2 min-h-[36px] inline-flex items-center"
              >
                Switch to {iaMode === "directory" ? "Dir B" : "Dir A"}
              </button>
            </div>

            {iaMode === "directory" ? (
              /* ======================================================== */
              /* DIRECTION A: DENSE TRADE DIRECTORY GRID (ThomasNet Style) */
              /* ======================================================== */
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/resources"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-col rounded-lg border border-gray-200 bg-white p-3 hover:border-brand-300 hover:bg-brand-50/40"
                  >
                    <div className="flex items-center justify-between">
                      <BookOpen className="h-4 w-4 text-brand-800" />
                      <span className="font-mono text-[10px] font-bold text-gray-400">RES</span>
                    </div>
                    <span className="mt-2 text-sm font-bold text-gray-900">Resources</span>
                    <span className="text-[11px] text-gray-500">14 official sources</span>
                  </Link>

                  <Link
                    href="/intelligence"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-col rounded-lg border border-gray-200 bg-white p-3 hover:border-brand-300 hover:bg-brand-50/40"
                  >
                    <div className="flex items-center justify-between">
                      <Compass className="h-4 w-4 text-brand-800" />
                      <span className="font-mono text-[10px] font-bold text-gray-400">INT</span>
                    </div>
                    <span className="mt-2 text-sm font-bold text-gray-900">Intelligence</span>
                    <span className="text-[11px] text-gray-500">Deep sourcing research</span>
                  </Link>

                  <Link
                    href="/field-kits"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-col rounded-lg border border-gray-200 bg-white p-3 hover:border-brand-300 hover:bg-brand-50/40"
                  >
                    <div className="flex items-center justify-between">
                      <Wrench className="h-4 w-4 text-brand-800" />
                      <span className="font-mono text-[10px] font-bold text-gray-400">KITS</span>
                    </div>
                    <span className="mt-2 text-sm font-bold text-gray-900">Field Kits</span>
                    <span className="text-[11px] text-gray-500">Bilingual toolkits</span>
                  </Link>

                  <Link
                    href="/app"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-col rounded-lg border border-gray-200 bg-white p-3 hover:border-brand-300 hover:bg-brand-50/40"
                  >
                    <div className="flex items-center justify-between">
                      <Smartphone className="h-4 w-4 text-brand-800" />
                      <span className="font-mono text-[10px] font-bold text-amber-600">ALPHA</span>
                    </div>
                    <span className="mt-2 text-sm font-bold text-gray-900">Mobile App</span>
                    <span className="text-[11px] text-gray-500">Offline floor verifier</span>
                  </Link>

                  <Link
                    href="/playbook"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-col rounded-lg border border-gray-200 bg-white p-3 hover:border-brand-300 hover:bg-brand-50/40"
                  >
                    <div className="flex items-center justify-between">
                      <ClipboardList className="h-4 w-4 text-brand-800" />
                      <span className="font-mono text-[10px] font-bold text-gray-400">BOOK</span>
                    </div>
                    <span className="mt-2 text-sm font-bold text-gray-900">Playbook</span>
                    <span className="text-[11px] text-gray-500">3-gate buyer manual</span>
                  </Link>

                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-col rounded-lg border border-gray-200 bg-white p-3 hover:border-brand-300 hover:bg-brand-50/40"
                  >
                    <div className="flex items-center justify-between">
                      <ShieldAlert className="h-4 w-4 text-brand-800" />
                      <span className="font-mono text-[10px] font-bold text-gray-400">SVC</span>
                    </div>
                    <span className="mt-2 text-sm font-bold text-gray-900">Services</span>
                    <span className="text-[11px] text-gray-500">Factory audit & QA</span>
                  </Link>

                  <Link
                    href="/buyer-decisions"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-col rounded-lg border border-gray-200 bg-white p-3 hover:border-brand-300 hover:bg-brand-50/40"
                  >
                    <div className="flex items-center justify-between">
                      <HelpCircle className="h-4 w-4 text-brand-800" />
                      <span className="font-mono text-[10px] font-bold text-gray-400">GUIDE</span>
                    </div>
                    <span className="mt-2 text-sm font-bold text-gray-900">Buyer Guides</span>
                    <span className="text-[11px] text-gray-500">18+ decision guides</span>
                  </Link>

                  <Link
                    href="/pricing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-col rounded-lg border border-gray-200 bg-white p-3 hover:border-brand-300 hover:bg-brand-50/40"
                  >
                    <div className="flex items-center justify-between">
                      <DollarSign className="h-4 w-4 text-brand-800" />
                      <span className="font-mono text-[10px] font-bold text-gray-400">PRC</span>
                    </div>
                    <span className="mt-2 text-sm font-bold text-gray-900">Pricing</span>
                    <span className="text-[11px] text-gray-500">Fixed rate matrix</span>
                  </Link>
                </div>

                <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between px-1 text-xs text-gray-500">
                    <Link
                      href="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-gray-700 hover:text-brand-900"
                    >
                      <Building2 className="h-4 w-4" /> About SourceRating
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-gray-700 hover:text-brand-900"
                    >
                      <Mail className="h-4 w-4" /> Contact
                    </Link>
                  </div>
                  <Link
                    href="/risk-screen"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-brand-950 py-3 text-xs font-bold text-white shadow-xs"
                  >
                    <span>Request Free Supplier Risk Screen</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ) : (
              /* ======================================================== */
              /* DIRECTION B: EDITORIAL DOSSIERS (SupplyChainDive Style) */
              /* ======================================================== */
              <div className="space-y-6 px-1">
                {/* Section 1: Research & Evidence Dossiers */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-800">
                    Sourcing Research & Dossiers
                  </h4>
                  <div className="mt-2 divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
                    <Link
                      href="/resources"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3.5 hover:bg-gray-50"
                    >
                      <div>
                        <span className="text-sm font-bold text-gray-950 block">
                          Free Resource Library
                        </span>
                        <span className="text-xs text-gray-500">
                          Curated official links & bilingual procurement index
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </Link>

                    <Link
                      href="/intelligence"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3.5 hover:bg-gray-50"
                    >
                      <div>
                        <span className="text-sm font-bold text-gray-950 block">
                          Intelligence & Deep Studies
                        </span>
                        <span className="text-xs text-gray-500">
                          Metallurgy, CBAM benchmarks & landed cost reality
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </Link>

                    <Link
                      href="/playbook"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3.5 hover:bg-gray-50"
                    >
                      <div>
                        <span className="text-sm font-bold text-gray-950 block">
                          Supplier Verification Playbook
                        </span>
                        <span className="text-xs text-gray-500">
                          Three-gate engineering procurement methodology
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  </div>
                </div>

                {/* Section 2: Decision Tools & Field Practice */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-800">
                    Field Toolkits & Applications
                  </h4>
                  <div className="mt-2 divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
                    <Link
                      href="/field-kits"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3.5 hover:bg-gray-50"
                    >
                      <div>
                        <span className="text-sm font-bold text-gray-950 block">
                          Bilingual Field Kits
                        </span>
                        <span className="text-xs text-gray-500">
                          MTC audit spreadsheets & factory non-conformance notices
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </Link>

                    <Link
                      href="/app"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3.5 hover:bg-gray-50"
                    >
                      <div>
                        <span className="text-sm font-bold text-gray-950 block">
                          SourceRating Mobile App
                        </span>
                        <span className="text-xs text-amber-700 font-medium">
                          Early access preview · Offline factory verifier
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </Link>

                    <Link
                      href="/buyer-decisions"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3.5 hover:bg-gray-50"
                    >
                      <div>
                        <span className="text-sm font-bold text-gray-950 block">
                          Buyer Decision Guides
                        </span>
                        <span className="text-xs text-gray-500">
                          Evidence-led guides on import vs local decisions
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  </div>
                </div>

                {/* Section 3: Professional Services */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-800">
                    Commercial Services
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <Link
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex min-h-[44px] items-center rounded-lg border border-gray-200 bg-white px-3 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Factory Audits & Services
                    </Link>
                    <Link
                      href="/pricing"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex min-h-[44px] items-center rounded-lg border border-gray-200 bg-white px-3 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Pricing Matrix
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex min-h-[44px] items-center rounded-lg border border-gray-200 bg-white px-3 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      About James Cheng
                    </Link>
                  </div>
                </div>

                <Link
                  href="/risk-screen"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-brand-950 py-3.5 text-xs font-bold text-white shadow"
                >
                  <span>Request Free Supplier Risk Screen</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
