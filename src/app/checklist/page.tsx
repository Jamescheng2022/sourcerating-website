import { permanentRedirect } from "next/navigation";

export default function ChecklistRedirectPage() {
  permanentRedirect("/playbook");
}
