import { NavLinkList } from "./nav-link-list/nav-link-list.component";
import { Session } from "./session";
import { createClient } from "@/utils/supabase/server";
import { ClientRouting } from "@/models/routing/client.routing";
import { ProfileLink } from "./profile-link";

export async function Nav() {
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
    <aside className="md:h-screen w-full md:w-max fixed z-50 md:z-auto md:static bottom-0 left-0 md:px-3 md:py-3 py-2 bg-neutral-900 flex md:flex-col justify-center gap-2 md:border-r border-t md:border-t-0 dark:border-neutral-800">
      <nav className="flex md:flex-col justify-center gap-2 md:my-auto">
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
        <ProfileLink
          href={
            ClientRouting.auth().signIn +
            "?next=" +
            ClientRouting.profile().slash
          }
        />
        <NavLinkList />
      </nav>
      <Session profile={null} />
    </aside>
  );
}
