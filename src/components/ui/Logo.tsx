import Link from "next/link";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Source Rating home">
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-700 text-white shadow-sm">
        <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
          <path d="M7 8.5h18v3H11.5v3H23v3H11.5v5H7v-14Z" fill="currentColor" />
          <path d="M20 18.5h5v5h-5v-5Z" fill="currentColor" opacity="0.72" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block text-lg font-bold tracking-tight ${inverted ? "text-white" : "text-gray-950"}`}>
          Source Rating
        </span>
        <span className={`block text-[11px] font-medium uppercase tracking-[0.18em] ${inverted ? "text-gray-400" : "text-gray-500"}`}>
          China Inspection
        </span>
      </span>
    </Link>
  );
}
