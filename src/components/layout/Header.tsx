"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <div className="hidden lg:flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <Link key={item.href} href={item.href} className={cn("px-3 py-2 text-sm font-medium rounded-md transition-colors", pathname === item.href ? "text-brand-700 bg-brand-50" : "text-gray-600 hover:text-brand-700 hover:bg-gray-50")}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <a href={`mailto:${siteConfig.contact.email}`} className="text-sm font-medium text-gray-600 hover:text-brand-700 transition-colors">{siteConfig.contact.email}</a>
            <Link href="/contact" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-brand-700 rounded-md hover:bg-brand-800 transition-colors">Request a Supplier Check</Link>
          </div>
          <button type="button" className="lg:hidden p-2 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col gap-1">
              {siteConfig.nav.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className={cn("px-3 py-2.5 text-base font-medium rounded-md", pathname === item.href ? "text-brand-700 bg-brand-50" : "text-gray-600 hover:text-brand-700 hover:bg-gray-50")}>
                  {item.label}
                </Link>
              ))}
              <a href={`mailto:${siteConfig.contact.email}`} className="px-3 py-2 text-sm font-medium text-gray-600">{siteConfig.contact.email}</a>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="mt-2 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-brand-700 rounded-md hover:bg-brand-800">Request a Supplier Check</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
