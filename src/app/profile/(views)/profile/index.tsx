import { SignOutBtn } from "@/components/feature/sign-out-btn";
import { Button } from "@/components/ui/button";
import {
  ConfigModal,
  ConfigModalTrigger,
} from "./config-modal/config-modal.component";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 60 * 6; // cache 6 hours

export async function Profile({ userId }: { userId: string }) {
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!profile) return <p>something went wrong</p>;

  return (
    <>
      <ConfigModal profile={profile} />
      <article className="flex flex-col gap-2 w-full">
        <header className="flex gap-8 w-full justify-between">
          <div className="flex gap-4">
            <img
              src={
                profile?.picture_url ??
                `https://avatar.vercel.sh/${profile?.username}`
              }
              className="w-16 h-16 rounded-full object-cover object-center"
            />
            <div className="dark:text-neutral-200 flex flex-col">
              <div className="flex flex-col">
                {profile.name && (
                  <h1 className="font-semibold dark:text-neutral-200 text-md">
                    {profile.name}
                  </h1>
                )}
                <span className="dark:text-indigo-400 text-sm">
                  @{profile.username.slice(0, 16)}
                </span>
              </div>
              {profile.description && (
                <p className="dark:text-neutral-300 text-pretty text-sm pt-2">
                  {profile.description}
                </p>
              )}
            </div>
          </div>
          <ConfigModalTrigger>
            <Button variant="secondary">Edit profile</Button>
          </ConfigModalTrigger>
        </header>
        <div>
          <SignOutBtn />
        </div>
      </article>
    </>
  );
}
