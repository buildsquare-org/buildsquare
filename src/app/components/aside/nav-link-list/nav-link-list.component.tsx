"use client";

import { ASIDE_LINKS } from "../aside.models";

import { NavLink } from "../nav-link";

export function NavLinkList() {
  return ASIDE_LINKS.map((item, i) => <NavLink key={i} item={item} />);
}
