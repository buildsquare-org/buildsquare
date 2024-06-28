import { createClient } from "@/utils/supabase/server";
import { Profile } from "./(views)/profile";
import { Dialog } from "./(views)/dialog";
import { Suspense } from "react";

type TViews = "authenticated" | "non-authenticated";

export default async function ProfilePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userSessionStatus: TViews = user
    ? "authenticated"
    : "non-authenticated";

  const VIEWS: Record<TViews, JSX.Element> = {
    authenticated: (
      <Suspense fallback={<p className="dark:text-neutral-200">loading...</p>}>
        <Profile userId={user?.id || ""} />
      </Suspense>
    ),
    "non-authenticated": <Dialog />,
  };

  const view = VIEWS[userSessionStatus];

  return view;
}
