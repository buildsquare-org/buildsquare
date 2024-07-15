import Link from "next/link";
import { TProps } from "./project-card.models";
import { ClientRouting } from "@/models/routing/client.routing";
import { ProfileCardWrapper } from "../profile-card";

export function ProjectCard({ project }: TProps) {
  return (
    <Link href={ClientRouting.projects().getById(project.title)}>
      <article className="dark:text-neutral-200 dark:bg-neutral-800 rounded-md p-2 flex flex-col gap-5">
        {project.cover_image_url && (
          <img
            src={project.cover_image_url}
            className="w-full aspect-video rounded-sm"
          />
        )}
        <footer>
          <div className="py-1">
            <ProfileCardWrapper userId={project.owner_id} />
          </div>
          <h1 className="font-semibold text-lg">{project.title}</h1>
          {project.description && (
            <p className="text-neutral-400 text-sm">
              {project.description.length > 300
                ? project.description.slice(0, 300) + "..."
                : project.description}
            </p>
          )}
        </footer>
      </article>
    </Link>
  );
}
