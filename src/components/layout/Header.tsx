"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700";

function HeaderNavigation({ pathname }: { pathname: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [mobileMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-950/15 bg-[#f7f6f2]">
      <nav aria-label="Main navigation" className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />
          <div className="hidden items-center gap-1 lg:flex">
            {siteConfig.nav.map(item => (
              <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={cn("px-3 py-2 text-sm font-medium transition-colors", focus, pathname === item.href ? "text-brand-700 underline underline-offset-4" : "text-gray-700 hover:text-brand-700")}>
                {item.label}
              </Link>
            ))}
            <Link href="/services" className={`ml-3 border-l border-brand-950/20 py-2 pl-5 text-sm text-gray-600 hover:text-brand-700 ${focus}`}>Services</Link>
          </div>
          <button ref={toggle} type="button" className={`inline-flex h-11 w-11 shrink-0 items-center justify-center text-brand-950 lg:hidden ${focus}`} onClick={() => setMobileMenuOpen(open => !open)} aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation">
            {mobileMenuOpen ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
          </button>
        </div>
        <div id="mobile-navigation" hidden={!mobileMenuOpen} className="absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-brand-950/20 bg-[#f7f6f2] px-5 py-5 shadow-sm lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {siteConfig.nav.map(item => <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} aria-current={pathname === item.href ? "page" : undefined} className={cn("px-3 py-3 text-base font-medium", focus, pathname === item.href ? "bg-brand-50 text-brand-700" : "text-gray-700 hover:text-brand-700")}>{item.label}</Link>)}
            <Link href="/services" onClick={() => setMobileMenuOpen(false)} className={`mt-3 border-t border-brand-950/15 px-3 pt-5 pb-3 text-gray-700 ${focus}`}>Services</Link>
            <a href={`mailto:${siteConfig.contact.email}`} onClick={() => setMobileMenuOpen(false)} className={`break-all px-3 py-3 text-sm text-gray-600 ${focus}`}>{siteConfig.contact.email}</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export function Header() {
  const pathname = usePathname() ?? "/";
  // Navigation, including browser back/forward, resets the disclosure without an
  // effect that leaves a stale menu open on the destination page.
  return <HeaderNavigation key={pathname} pathname={pathname} />;
}
