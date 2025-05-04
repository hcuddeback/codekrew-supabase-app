//import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/lib/supabase/server";
//import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardHome() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  
  return (
    <section>
      <h1 className="text-3xl font-bold mb-2">Welcome back, Krewer 👋</h1>
      <p className="text-slate-300 mb-4">Ready to build something amazing today?</p>
    </section>
  );
}
