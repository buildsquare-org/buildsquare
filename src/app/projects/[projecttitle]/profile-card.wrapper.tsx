import { ProfileCard } from "@/components/ui/profile-card";
import { createClient } from "@/utils/supabase/server";

export async function ProfileCardWrapper({ userId }: { userId: string }) {
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!profile) return null;

  return <ProfileCard profile={profile} />;
}
