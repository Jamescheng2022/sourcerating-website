import type { BlogPost } from "@/data/blog";

function InlineText({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|\*[^*]+\*)/g).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (link) return <a key={index} href={link[2]} className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-4 hover:text-brand-900">{link[1]}</a>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    return part;
  });
}

export function ArticleBody({ blocks }: { blocks: NonNullable<BlogPost["articleBody"]> }) {
  return (
    <div className="mt-12 space-y-6 border-t border-gray-200 pt-10" data-article-body>
      {blocks.map((block, index) => {
        if (block.type === "heading") return <h2 key={index} className="pt-6 text-2xl font-bold text-gray-950">{block.text}</h2>;
        if (block.type === "paragraph") return <p key={index} className="leading-8 text-gray-700"><InlineText text={block.text} /></p>;
        if (block.type === "list") {
          const Tag = block.ordered ? "ol" : "ul";
          return <Tag key={index} className={`space-y-3 pl-6 leading-8 text-gray-700 ${block.ordered ? "list-decimal" : "list-disc"}`}>{block.items.map((item, itemIndex) => <li key={itemIndex}><InlineText text={item} /></li>)}</Tag>;
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
