import { SignOutBtn } from "@/components/feature/sign-out-btn";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/drop-down/drop-down.component";
import { ClientRouting } from "@/models/routing/client.routing";
import { createClient } from "@/utils/supabase/server";
import { ArrowUpRight, Key } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { SessionSkeleton } from "./session-skeleton.component";

type TViews = "authenticated" | "non-authenticated";

export async function Session() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  await new Promise((resolve) =>
    setTimeout(() => {
      resolve("");
    }, 4000),
  );

  const VIEWS: Record<TViews, JSX.Element> = {
    authenticated: (
      <Suspense fallback={<SessionSkeleton />}>
        <Profile userId={user?.id || ""} />
      </Suspense>
    ),
    "non-authenticated": <LinkToAuthPage />,
  };

  const role: TViews = user ? "authenticated" : "non-authenticated";

  return VIEWS[role];
}

async function Profile({ userId }: { userId: string }) {
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!profile) return <LinkToAuthPage />;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="px-0 py-0">
            <img
              src={
                profile?.picture_url ??
                `https://avatar.vercel.sh/${profile?.id}`
              }
              className="h-9 w-9 rounded-full object-cover object-center"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 ml-6">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href={ClientRouting.profile().slash}>Profile</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href="https://github.com/buildsquare-org/buildsquare"
              target="_blank"
              className="flex items-center gap-1"
            >
              Build Square Github <ArrowUpRight className="w-4 h-4" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutBtn />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function LinkToAuthPage() {
  return (
    <Link href={ClientRouting.auth().signIn} title="sign in">
      <Key className="dark:text-indigo-400" />
    </Link>
  );
}
