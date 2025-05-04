// src/hooks/useSession.ts
"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import type { Session } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase.ts";

export function useSession() {
  const [session, setSession] = useState<null | Session>(null);
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    // initial fetch
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return session;
}
