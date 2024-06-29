import { Suspense } from "react";
import { NavLinkList } from "./nav-link-list/nav-link-list.component";
import { Session } from "./session";
import { SessionSkeleton } from "./session/session-skeleton.component";

export function Aside() {
  return (
    <aside className="h-screen px-3 py-5 bg-neutral-900 flex flex-col items-center border-r dark:border-neutral-800">
      <nav className="flex flex-col gap-2 my-auto">
        <NavLinkList />
      </nav>
      <Suspense fallback={<SessionSkeleton />}>
        <Session />
      </Suspense>
    </aside>
  );
}
