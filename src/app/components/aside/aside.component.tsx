"use client";

import { ASIDE_LINKS } from "./aside.models";
import { NavLink } from "./nav-link";

export function Aside() {
  return (
    <aside className="h-screen p-3 bg-neutral-800 flex items-center justify-center border-r dark:border-neutral-700">
      <nav className="flex flex-col gap-2">
        {ASIDE_LINKS.map((item, i) => (
          <NavLink key={i} item={item} />
        ))}
      </nav>
    </aside>
  );
}
