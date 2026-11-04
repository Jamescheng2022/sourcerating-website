export const topics = ["All", "Supplier & Factory", "Production & Products", "Quality & Inspection", "Pricing & Negotiation", "Packaging & Logistics", "Policy & Customs", "Contracts & Payment", "Markets"];
export function articleTopics(slug: string, category?: string): string[] {
 const a: string[] = category && topics.slice(1).includes(category) ? [category] : [];
 if (/supplier|factory|sourcing-brief|china-vs-local/.test(slug)) a.push(topics[1]);
 if (/polyurethane|baghouse|drawing|specification|precast|steel-mep/.test(slug)) a.push(topics[2]);
 if (/weld|certificate|calibration|salt-spray|laboratory|xrf|sampling|galvanized-steel-china|inspection|traceability|audit/.test(slug)) a.push(topics[3]);
 if (/quot|scope-exclusions|guatemala|china-vs-local/.test(slug)) a.push(topics[4]);
 if (/packing|crate|shipment|handover/.test(slug)) a.push(topics[5]);
 if (/hs-code|crate|epd|guatemala/.test(slug)) a.push(topics[6]);
 if (/deposit|handover|dispute|specification|expired|release|quotation-scope/.test(slug)) a.push(topics[7]);
 if (/guatemala|china-vs-local/.test(slug)) a.push(topics[8]);
 return a.length ? [...new Set(a)] : [topics[1]];
}
