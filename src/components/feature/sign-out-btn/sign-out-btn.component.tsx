"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

export function SignOutBtn() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function signOut() {
    try {
      setLoading(true);

      const supabase = createClient();

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error("error signing out");
      }

      router.refresh();

      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  return (
    <Button isLoading={loading} disabled={loading} onClick={signOut}>
      Sign Out
    </Button>
  );
}
