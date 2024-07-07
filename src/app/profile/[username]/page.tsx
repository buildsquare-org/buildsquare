import { createClient } from "@/utils/supabase/server";
import { Profile } from "./views/profile";
import { Dialog } from "./views/dialog";

export default async function ProfilePage({
  params: { username },
}: {
  params: { username: string };
}) {
  const supabase = createClient();

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, 500000);
  });

  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("username", username)
    .single();

  const {
    data: { user: session },
  } = await supabase.auth.getUser();

  if (!profile && !session) {
    return <Dialog />;
  }

  if (profile) {
    return <Profile profile={profile} sessionUserId={session?.id ?? null} />;
  }

  return <p className="dark:text-neutral-200">profile not found</p>;
}
