// This is a dashboard page that requires authentication.
// If the user is not authenticated, they will be redirected to the sign-in page.
import { createClient } from "@/lib/utils/supabase/server";
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
      <p className="text-zinc-300 mb-4">Ready to build something amazing today?</p>
    </section>
  );
}
