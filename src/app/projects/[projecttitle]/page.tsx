import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { BookCopy, Globe } from "lucide-react";
import Link from "next/link";
import { ProfileCardWrapper } from "./profile-card.wrapper";
import { Suspense } from "react";
import { ProfileCardSkeleton } from "@/components/ui/profile-card";

export default async function ProjectPage({
  params: { projecttitle },
}: {
  params: { projecttitle: string };
}) {
  console.log({ title: projecttitle.replaceAll("%20", " ") });
  const supabase = createClient();

  const { data: project, error: errorGettingProject } = await supabase
    .from("project")
    .select("*")
    .eq("title", projecttitle.replaceAll("%20", " ").trim())
    .single();

  if (errorGettingProject || !project) return <p>not found</p>;

  return (
    <article className="text-neutral-200 w-full flex flex-col gap-4">
      <header className="flex flex-wrap justify-between items-center gap-4 w-full">
        <h1 className="font-semibold text-xl text-start">{project.title}</h1>
        <div className="flex flex-wrap gap-2 w-max">
          {project.repository_url && (
            <Button variant="secondary" asChild>
              <Link href={project.repository_url} target="_blank">
                <BookCopy className="w-4 h-4" /> GitHub
              </Link>
            </Button>
          )}
          {project.project_url && (
            <Button variant="primary" asChild>
              <Link href={project.project_url} target="_blank">
                <Globe className="w-4 h-4" /> Website
              </Link>
            </Button>
          )}
        </div>
      </header>
      <main className="flex flex-col gap-4">
        <Suspense fallback={<ProfileCardSkeleton />}>
          <ProfileCardWrapper userId={project.owner_id} />
        </Suspense>
        {project.description && (
          <p className="text-pretty text-neutral-300">{project.description}</p>
        )}
        {project.cover_image_url && (
          <img
            src={project.cover_image_url}
            className="w-full aspect-video object-cover object-top rounded-sm"
            alt={project.description || project.title}
          />
        )}
      </main>
    </article>
  );
}
