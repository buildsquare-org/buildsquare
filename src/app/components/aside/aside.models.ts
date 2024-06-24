import { ClientRouting } from "@/models/routing/client.routing";
import {
  CircleUserRound,
  Package,
  type LucideIcon,
  Sparkles,
  Compass,
} from "lucide-react";

export type TAsideLink = {
  alt: string;
  icon: LucideIcon;
  href: string;
};

export const ASIDE_LINKS: TAsideLink[] = [
  {
    alt: "Profile",
    icon: CircleUserRound,
    href: ClientRouting.profile().slash,
  },
  {
    alt: "Projects",
    icon: Package,
    href: ClientRouting.projects().slash,
  },
  {
    alt: "Explore",
    icon: Compass,
    href: ClientRouting.explore().slash,
  },
  {
    alt: "Star",
    icon: Sparkles,
    href: ClientRouting.star().slash,
  },
];
