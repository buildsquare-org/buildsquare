import { createClient } from "@/utils/supabase/server";
import { Profile } from "./(views)/profile";
import { Dialog } from "./(views)/dialog";

type TViews = "authenticated" | "non-authenticated";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userSessionStatus: TViews = user
    ? "authenticated"
    : "non-authenticated";

  const VIEWS: Record<TViews, JSX.Element> = {
    authenticated: <Profile userId={user?.id || ""} />,
    "non-authenticated": <Dialog />,
  };

  const view = VIEWS[userSessionStatus];

  return view;
}