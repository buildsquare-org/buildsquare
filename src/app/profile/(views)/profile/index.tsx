import { SignOutBtn } from "@/components/feature/sign-out-btn";
import { createClient } from "@/utils/supabase/server";

export async function Profile({ userId }: { userId: string }) {
  const supabase = createClient();
  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", userId)
    .single();

  return (
    <div>
      <p className="dark:text-neutral-200">signed in as {profile.username}</p>
      <SignOutBtn />
    </div>
  );
}
