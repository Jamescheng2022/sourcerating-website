"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Compass, Wrench, Smartphone } from "lucide-react";
import { useMobileIa } from "./MobileIaContext";
import { cn } from "@/lib/utils";

const bottomNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Resources", href: "/resources", icon: BookOpen },
  { label: "Intelligence", href: "/intelligence", icon: Compass },
  { label: "Field Kits", href: "/field-kits", icon: Wrench },
  { label: "App", href: "/app", icon: Smartphone },
];

export function BottomWorkstationBar() {
  const { iaMode } = useMobileIa();
  const pathname = usePathname();

  // In Direction B (Editorial), the bottom dock is hidden to keep the editorial reading canvas clean
  if (iaMode !== "directory") {
    return null;
  }

  return (
    <aside
      aria-label="Workstation quick dock"
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 bg-white/95 backdrop-blur-md pb-[env(safe-area-inset-bottom,0px)] lg:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.05)]"
    >
      <nav className="grid grid-cols-5 h-14 max-w-md mx-auto">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center min-h-[48px] px-1 transition-colors select-none",
                isActive
                  ? "text-brand-900 font-bold"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              <div className="relative">
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform",
                    isActive ? "scale-110 text-brand-900 stroke-[2.4]" : "stroke-[1.8]"
                  )}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-brand-900" />
                )}
              </div>
              <span className="mt-1 text-[10px] leading-none tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
