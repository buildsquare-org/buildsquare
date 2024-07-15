"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ClientRouting } from "@/models/routing/client.routing";
import { TProps } from "./profile-card.models";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/models/supabase";
import {
  ProfileCard,
  ProfileCardSkeleton,
} from "@/components/ui/profile-card/";

export function ProfileCardWrapper({ userId }: TProps) {
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
      <ProfileCard profile={profile} />
    </Link>
  );
}
