import Image from "next/image";
import type { BlogPost } from "@/data/blog";

function InlineText({ text, editorial = false }: { text: string; editorial?: boolean }) {
  return text.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (link) return <a key={index} href={link[2]} className={editorial ? "font-medium text-slate-900 underline decoration-[#ac8054] decoration-1 underline-offset-[3px] hover:text-brand-700" : "font-medium text-brand-700 underline decoration-brand-300 underline-offset-4 hover:text-brand-900"}>{link[1]}</a>;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    return part;
  });
}

export function ArticleBody({ blocks, editorial = false }: { blocks: NonNullable<BlogPost["articleBody"]>; editorial?: boolean }) {
  return (
    <div className={editorial ? "mt-11 space-y-7 border-t border-stone-200 pt-9" : "mt-12 space-y-6 border-t border-gray-200 pt-10"} data-article-body>
      {blocks.map((block, index) => {
        if (block.type === "heading") return <h2 key={index} className={editorial ? "pt-7 font-serif text-[29px] font-normal leading-tight tracking-[-0.02em] text-slate-950 sm:text-[33px]" : "pt-6 text-2xl font-bold text-gray-950"}>{block.text}</h2>;
        if (block.type === "paragraph") return <p key={index} className={editorial ? "text-[17px] leading-[1.9] text-slate-800 sm:text-[18px]" : "leading-8 text-gray-700"}><InlineText text={block.text} editorial={editorial} /></p>;
        if (block.type === "list") {
          const Tag = block.ordered ? "ol" : "ul";
          return <Tag key={index} className={editorial ? `space-y-4 pl-6 text-[17px] leading-[1.85] text-slate-800 sm:text-[18px] ${block.ordered ? "list-decimal" : "list-disc"}` : `space-y-3 pl-6 leading-8 text-gray-700 ${block.ordered ? "list-decimal" : "list-disc"}`}>{block.items.map((item, itemIndex) => <li key={itemIndex}><InlineText text={item} editorial={editorial} /></li>)}</Tag>;
        }
        if (block.type === "illustration") {
          return (
            <figure key={index} className={editorial ? "my-12 xl:relative xl:left-1/2 xl:w-[min(92vw,1150px)] xl:-translate-x-1/2" : "my-10"}>
              {block.mobileSrc ? (
                <Image src={block.mobileSrc} alt={block.alt} width={720} height={1180} sizes="(max-width: 1279px) 100vw, 0px" className="block h-auto w-full rounded-md border border-stone-200 xl:hidden" />
              ) : null}
              <Image src={block.src} alt={block.alt} width={block.width} height={block.height} sizes="(min-width: 1280px) 1150px, 100vw" className={block.mobileSrc ? "hidden h-auto w-full rounded-md border border-stone-200 xl:block" : "h-auto w-full rounded-md border border-stone-200"} />
              <figcaption className="mt-3 text-sm leading-6 text-gray-500">{block.caption}</figcaption>
            </figure>
          );
        }
        return (
          <div key={index} role="region" aria-label={`Article table ${index + 1}`} tabIndex={0} className="max-w-full overflow-x-auto rounded-md border border-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead className="bg-[#f4f6f4]"><tr>{block.headers.map((header, cellIndex) => <th key={cellIndex} scope="col" className="border-b border-gray-300 px-4 py-3 font-bold text-gray-950">{header}</th>)}</tr></thead>
              <tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex} className="align-top even:bg-gray-50">{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row" className="border-t border-gray-200 px-4 py-3 font-medium leading-6 text-gray-900">{cell}</th> : <td key={cellIndex} className="border-l border-t border-gray-200 px-4 py-3 leading-6 text-gray-700">{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
