"use client";

import { CircleUserRound } from "lucide-react";
import { NavLink } from "../nav-link";

export function ProfileLink({ href }: { href: string }) {
  return (
    <NavLink
      item={{
        href,
        alt: "Profile",
        icon: CircleUserRound,
      }}
    />
  );
}
