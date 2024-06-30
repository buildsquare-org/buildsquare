import { NavLinkList } from "./nav-link-list/nav-link-list.component";
import { Session } from "./session";
import { createClient } from "@/utils/supabase/server";
import { ClientRouting } from "@/models/routing/client.routing";
import { ProfileLink } from "./profile-link";

export async function Aside() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <UnauthenticatedView />;
  }

  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!profile) return <UnauthenticatedView />;

  return (
    <aside className="h-screen px-3 py-5 bg-neutral-900 flex flex-col items-center border-r dark:border-neutral-800">
      <nav className="flex flex-col gap-2 my-auto">
        <ProfileLink
          href={ClientRouting.profile().getbyUsername(profile.username)}
        />
        <NavLinkList />
      </nav>
      <Session profile={profile} />
    </aside>
  );
}

function UnauthenticatedView() {
  return (
    <aside className="h-screen px-3 py-5 bg-neutral-900 flex flex-col items-center border-r dark:border-neutral-800">
      <nav className="flex flex-col gap-2 my-auto">
        <ProfileLink href={ClientRouting.auth().signIn} />
        <NavLinkList />
      </nav>
      <Session profile={null} />
    </aside>
  );
}
