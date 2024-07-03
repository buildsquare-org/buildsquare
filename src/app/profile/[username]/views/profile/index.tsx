import { Button } from "@/components/ui/button";
import {
  ConfigModal,
  ConfigModalTrigger,
} from "./config-modal/config-modal.component";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database } from "@/models/supabase";
import { NewProjectBtn } from "./new-project-btw";
import { ProjectList } from "./project-list";

export const revalidate = 60 * 6; // cache 6 hours

export async function Profile({
  profile,
  sessionUserId,
}: {
  profile: Database["public"]["Tables"]["profile"]["Row"];
  sessionUserId: string | null;
}) {
  const isOwnProfile = profile.user_id === sessionUserId;

  return (
    <>
      <ConfigModal profile={profile} />
      <article className="flex flex-col gap-5 w-full">
        <header className="flex gap-8 w-full justify-between">
          <div className="flex gap-4 w-full">
            <img
              src={
                profile?.picture_url ??
                `https://avatar.vercel.sh/${profile?.username}`
              }
              className="w-16 h-16 rounded-full object-cover object-center"
            />
            <div className="dark:text-neutral-200 flex flex-col flex-1">
              <div className="flex justify-between w-full">
                <div className="flex flex-col w-full">
                  {profile.name && (
                    <h1 className="font-medium leading-4 dark:text-neutral-200 text-md">
                      {profile.name}
                    </h1>
                  )}
                  <span className="dark:text-indigo-400 text-sm">
                    @{profile.username.slice(0, 16)}
                  </span>
                </div>
                {isOwnProfile && (
                  <ConfigModalTrigger>
                    <Button variant="secondary">Edit profile</Button>
                  </ConfigModalTrigger>
                )}
              </div>
              {profile.description && (
                <p className="dark:text-neutral-300 text-pretty text-sm pt-2 max-w-md">
                  {profile.description}
                </p>
              )}
            </div>
          </div>
        </header>
        <Tabs defaultValue="projects" className="w-full">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="change_logs">Change Logs</TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="flex flex-col gap-2">
            {isOwnProfile && <NewProjectBtn />}
            <ProjectList sessionId={sessionUserId} userId={profile.user_id} />
          </TabsContent>
          <TabsContent value="change_logs">
            change logs - not implemented yet
          </TabsContent>
        </Tabs>
      </article>
    </>
  );
}
