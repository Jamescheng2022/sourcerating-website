import { redirect } from "next/navigation";

export default function AppWaitlistRedirect() {
  redirect("/app#waitlist");
}
