import data from "@/data/editorial-media.json";
import type { BlogPost } from "@/content/blog/legacy-posts";
type Photo = NonNullable<BlogPost["coverImage"]>;
type Media = { coverImage: Photo | null; bodyPhotos: {afterHeading:string;image:Photo}[];sectionPhotos:({after:number}&Photo)[] };
export function applyEditorialMedia(post: BlogPost): BlogPost {
 const media = (data as Record<string,Media>)[post.slug];
 if (!media) return post;
 const body: BlogPost["articleBody"] = post.articleBody?.filter(b=>b.type!=="illustration");
 if(body) {
  for(const photo of media.bodyPhotos) {
   const start=body.findIndex(b=>b.type==="heading" && b.text===photo.afterHeading);
   if(start<0) throw new Error(`Missing media anchor: ${post.slug} / ${photo.afterHeading}`);
   const next=body.findIndex((b,i)=>i>start&&b.type==="heading");
   body.splice(next<0?body.length:next,0,{type:"illustration",...photo.image});
  }
 }
 return {...post,coverImage:media.coverImage??undefined,articleBody:body,photoSections:media.sectionPhotos};
}
