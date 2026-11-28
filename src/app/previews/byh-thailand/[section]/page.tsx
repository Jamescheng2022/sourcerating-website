import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ByhSite } from "../ByhSite";

const sections = ["company","thailand-factory","capabilities","products","industries","quality","downloads","news","careers","contact"] as const;
type Section = typeof sections[number];
export const dynamicParams = false;
export function generateStaticParams(){ return sections.map(section=>({section})); }
export async function generateMetadata({params}:{params:Promise<{section:string}>}):Promise<Metadata>{const {section}=await params;return{title:`${section.replaceAll("-"," ")} · BYH Thailand Concept`,robots:{index:false,follow:false,nocache:true}}}
export default async function ByhPreviewSection({params}:{params:Promise<{section:string}>}){const {section}=await params;if(!sections.includes(section as Section))notFound();return <ByhSite page={section as Section}/>}
