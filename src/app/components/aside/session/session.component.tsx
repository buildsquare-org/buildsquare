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
import { ArrowUpRight, Key } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { SessionSkeleton } from "./session-skeleton.component";
import { Database } from "@/models/supabase";

type TViews = "authenticated" | "non-authenticated";

export async function Session({
  profile,
}: {
  profile: Database["public"]["Tables"]["profile"]["Row"] | null;
}) {
  const VIEWS: Record<TViews, JSX.Element> = {
    authenticated: (
      <Suspense fallback={<SessionSkeleton />}>
        <Profile profile={profile!} />
      </Suspense>
    ),
    "non-authenticated": <LinkToAuthPage />,
  };

  const role: TViews = profile ? "authenticated" : "non-authenticated";

  return VIEWS[role];
}

async function Profile({
  profile,
}: {
  profile: Database["public"]["Tables"]["profile"]["Row"];
}) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="px-0 py-0">
            <img
              src={
                profile?.picture_url ??
                `https://avatar.vercel.sh/${profile?.username}`
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
              <Link
                href={ClientRouting.profile().getbyUsername(profile.username)}
              >
                Profile
              </Link>
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
    <Link href={ClientRouting.auth().signIn} className="px-1.5">
      <Key className="dark:text-indigo-400" />
    </Link>
  );
}
