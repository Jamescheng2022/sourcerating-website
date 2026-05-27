import Link from "next/link";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Source Rating home">
      <span className={`flex h-10 w-10 items-center justify-center rounded-md ${inverted ? "bg-white text-brand-950" : "bg-brand-950 text-white"}`}>
        <svg viewBox="0 0 40 40" className="h-7 w-7" aria-hidden="true">
          <path d="M8 9.5h17.2c4.3 0 6.8 2.2 6.8 5.8 0 2.5-1.2 4.4-3.5 5.3L33 30.5h-6.6l-3.7-8.6h-8.1v8.6H8v-21Zm6.6 5.2v4.1h9.6c1.4 0 2.2-.8 2.2-2.1 0-1.2-.8-2-2.2-2h-9.6Z" fill="currentColor" />
          <path d="M8 31.2h25v2.8H8v-2.8Z" fill="currentColor" opacity="0.42" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block text-lg font-bold ${inverted ? "text-white" : "text-gray-950"}`}>
          Source Rating
        </span>
        <span className={`block text-[11px] font-semibold uppercase ${inverted ? "text-gray-400" : "text-gray-500"}`}>
          Factory Risk Checks
        </span>
      </span>
    </Link>
  );
}
