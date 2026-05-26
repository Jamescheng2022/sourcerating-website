"use client";

import Link, { type LinkProps } from "next/link";
import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

interface TrackedLinkProps extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  children: ReactNode;
  eventName: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
}

export function TrackedLink({ children, eventName, eventParams, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventParams);
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
