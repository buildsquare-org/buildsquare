"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ClientRouting } from "@/models/routing/client.routing";
import { TProps } from "./profile-card.models";
import { createClient } from "@/utils/supabase/client";
import { ProfileCardSkeleton } from "./profile-card.skeleton";
import { Database } from "@/models/supabase";

export function ProfileCard({ userId }: TProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<
    Database["public"]["Tables"]["profile"]["Row"] | null
  >(null);

  useEffect(() => {
    async function fetchProfile() {
      const supabase = createClient();

      const { data: profile } = await supabase
        .from("profile")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (!profile) return;

      setProfile(profile);
      setIsLoading(false);
    }

    fetchProfile();
  }, [userId]);

  if (isLoading || !profile) return <ProfileCardSkeleton />;

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
