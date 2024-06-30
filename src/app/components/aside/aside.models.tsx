import { ClientRouting } from "@/models/routing/client.routing";
import { Package, Sparkles, Compass, type LucideIcon } from "lucide-react";

export type TAsideLink = {
  alt: string;
  icon: LucideIcon;
  href: string;
  disabled?: true | null;
};

export const ASIDE_LINKS: TAsideLink[] = [
  {
    alt: "Projects",
    icon: Package,
    href: ClientRouting.projects().slash,
    disabled: true,
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
    disabled: true,
  },
];
