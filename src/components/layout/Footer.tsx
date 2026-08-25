"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site-config";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname.startsWith("/previews/byh-thailand")) return null;

  return (
    <footer className="bg-brand-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-4"><Logo inverted /></div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">{siteConfig.footer.tagline}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase mb-4">Quick Links</h4>
            <ul className="space-y-3">{siteConfig.footer.quickLinks.map((link) => (<li key={link.href}><Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">{link.label}</Link></li>))}</ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase mb-4">Company</h4>
            <ul className="space-y-3">{siteConfig.footer.company.map((link) => (<li key={link.href}><Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">{link.label}</Link></li>))}</ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">{siteConfig.contact.email}</a></li>
              <li>James Cheng · Thailand-based engineering procurement support</li>
              {siteConfig.social.linkedin ? (
                <li><a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn · James Cheng</a></li>
              ) : null}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">{siteConfig.footer.legal.map((link) => (<Link key={link.href} href={link.href} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{link.label}</Link>))}</div>
        </div>
      </div>
    </footer>
  );
}
