"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { LogOut } from "lucide-react";

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
    <Button
      isLoading={loading}
      disabled={loading}
      onClick={signOut}
      variant="ghost"
      className="flex items-center justify-start gap-1 py-0 px-0 h-auto font-normal hover:font-normal"
    >
      Sign Out <LogOut className="w-4 h-4" />
    </Button>
  );
}
