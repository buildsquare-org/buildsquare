import { ClientRouting } from "@/models/routing/client.routing";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Index() {
  const supabase = createClient();

  const { data: profiles } = await supabase
    .from("profile")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (!profiles) return <></>;

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center p-10">
      <ul className="grid grid-cols-3 w-full max-w-7xl gap-4">
        {profiles.map((profile) => (
          <li key={profile.id}>
            <article className="flex flex-col p-3 rounded-md bg-neutral-800">
              <header className="flex gap-2 w-full">
                <Link
                  href={ClientRouting.profile().getbyUsername(profile.username)}
                  className="flex gap-2 w-full"
                >
                  <img
                    src={
                      profile.picture_url ??
                      `https://avatar.vercel.sh/${profile?.username}`
                    }
                    className="w-16 h-16 object-cover object-center rounded-full"
                  />
                  <div className="flex flex-col gap-1 flex-1">
                    {profile.name && (
                      <h1 className="font-medium leading-4 dark:text-neutral-200 text-md">
                        {profile.name}
                      </h1>
                    )}
                    <span className="dark:text-indigo-400 text-sm">
                      @{profile.username.slice(0, 16)}
                    </span>
                  </div>
                </Link>
              </header>
              {profile.description && (
                <main>
                  <p className="dark:text-neutral-300 text-pretty text-sm pt-2">
                    {profile.description}
                  </p>
                </main>
              )}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
