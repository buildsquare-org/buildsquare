import { ClientRouting } from "@/models/routing/client.routing";
import { TProps } from "./profile-card.models";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export async function ProfileCard({ userId }: TProps) {
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!profile) return null;

  return (
    <Link
      href={ClientRouting.profile().getbyUsername(profile.username)}
      className="flex gap-2 w-full"
    >
      <img
        src={
          profile.picture_url ?? `https://avatar.vercel.sh/${profile?.username}`
        }
        className="w-8 h-8 object-cover object-center rounded-full"
      />
      <div className="flex flex-col flex-1">
        {profile.name && (
          <h1 className="font-medium leading-4 dark:text-neutral-200">
            {profile.name}
          </h1>
        )}
        <span className="dark:text-indigo-400 text-sm">
          @{profile.username.slice(0, 16)}
        </span>
      </div>
    </Link>
  );
}
