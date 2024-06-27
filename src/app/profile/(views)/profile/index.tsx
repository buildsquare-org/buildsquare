import { SignOutBtn } from "@/components/feature/sign-out-btn";
import { Button } from "@/components/ui/button";
import {
  ConfigModal,
  ConfigModalTrigger,
} from "./config-modal/config-modal.component";
import { createClient } from "@/utils/supabase/server";

export async function Profile({ userId }: { userId: string }) {
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", userId)
    .single();

  return (
    <div className="flex gap-2 dark:text-neutral-200">
      <ConfigModalTrigger>
        <Button variant="secondary">Edit profile</Button>
      </ConfigModalTrigger>
      <ConfigModal />
      <SignOutBtn />
    </div>
  );
}
