"use client";

import Link from "next/link";
import { TAsideLink } from "../aside.models";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function NavLink({ item }: { item: TAsideLink }) {
  const [isActive, setIsActive] = useState(false);

  const path = usePathname();

  useEffect(() => {
    const isIndexLink = item.href === "/";

    if (isIndexLink) {
      if (path === item.href) {
        setIsActive(true);
        return;
      }

      setIsActive(false);
      return;
    }

    if (path.startsWith(item.href)) {
      setIsActive(true);
      return;
    }

    setIsActive(false);
  }, [path]);

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      title={item.alt}
      className={`p-2 flex items-center justify-center rounded-md transition-all duration-150 ${isActive ? "dark:bg-neutral-800 dark:text-neutral-200" : "dark:text-neutral-400 hover:brightness-125"} ${item.disabled ? "opacity-40" : ""}`}
    >
      <Icon />
    </Link>
  );
}
