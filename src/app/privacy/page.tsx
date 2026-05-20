import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Source Rating inquiries and website communications.",
};

export default function PrivacyPage() {
  return (
    <section className="pt-28 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950">Privacy Policy</h1>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Source Rating collects only the information needed to respond to inquiries and provide sourcing, inspection, and advisory services.
        </p>
        <div className="mt-10 space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-gray-950 mb-3">Information we collect</h2>
            <p>When you contact us, we may collect your name, email address, company, country, supplier details, product information, and project requirements.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-950 mb-3">How we use information</h2>
            <p>We use your information to respond to inquiries, scope services, prepare proposals, perform requested work, and maintain business records.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-950 mb-3">Sharing</h2>
            <p>We do not sell personal information. Project information is shared only when needed to perform requested services or when required by law.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-950 mb-3">Contact</h2>
            <p>For privacy questions, email <a className="text-brand-700 font-medium" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
