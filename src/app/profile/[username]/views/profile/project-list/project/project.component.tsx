import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/drop-down";
import { TProps } from "./project.models";
import { ArrowUpRight, Cog, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteProjectBtn } from "./delete-btn";
import Link from "next/link";

export function Project({ sessionId, project }: TProps) {
  return (
    <article className="flex flex-col gap-2 rounded-sm p-2 dark:bg-neutral-800 border dark:border-neutral-700/60">
      {project.cover_image_url && (
        <img
          src={project.cover_image_url}
          className="aspect-video w-full rounded-sm object-cover object-center"
        />
      )}
      <footer className="flex w-full">
        <section className="w-full flex flex-col">
          <div className="flex justify-between w-full">
            <h1 className="dark:text-neutral-200 text-lg font-medium">
              {project.title}
            </h1>
            <div className="flex gap-2">
              {project.repository_url && (
                <Link
                  href={project.repository_url}
                  target="_blank"
                  className="text-neutral-300 flex items-center group hover:text-neutral-200 transition-all duration-150"
                >
                  Repository
                  <ArrowUpRight className="w-4 h-4 group-hover:scale-110 transition-all duration-150" />
                </Link>
              )}
              {project.project_url && (
                <Link
                  href={project.project_url}
                  target="_blank"
                  className="text-neutral-300 flex items-center group hover:text-neutral-200 transition-all duration-150"
                >
                  Site
                  <ArrowUpRight className="w-4 h-4 group-hover:scale-110 transition-all duration-150" />
                </Link>
              )}
            </div>
          </div>
          {project.description && (
            <p className="dark:text-neutral-400 text-sm">
              {project.description}
            </p>
          )}
        </section>
        {sessionId === project.owner_id && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="button-icon" className="text-neutral-400">
                <Cog />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 ml-6">
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <DeleteProjectBtn project={project} />
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </footer>
    </article>
  );
}
