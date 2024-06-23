import { ClientRouting } from "@/models/routing/client.routing";
import {
  CircleUserRound,
  Package,
  type LucideIcon,
  LayoutGrid,
  Sparkles,
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
    alt: "Feed",
    icon: LayoutGrid,
    href: ClientRouting.feed().slash,
  },
  {
    alt: "Star",
    icon: Sparkles,
    href: ClientRouting.star().slash,
  },
];
