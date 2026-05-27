import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  light?: boolean;
}

export function SectionHeading({ label, title, description, centered = true, className, light = false }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {label && <span className={cn("inline-block text-sm font-semibold uppercase mb-3", light ? "text-brand-300" : "text-brand-600")}>{label}</span>}
      <h2 className={cn("text-3xl sm:text-4xl font-bold", light ? "text-white" : "text-gray-900")}>{title}</h2>
      {description && <p className={cn("mt-4 text-lg leading-relaxed", light ? "text-gray-300" : "text-gray-600")}>{description}</p>}
    </div>
  );
}
