import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/drop-down";
import { TProps } from "./project.models";
import { Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteProjectBtn } from "./delete-btn";

export function Project({ sessionId, project }: TProps) {
  return (
    <article className="flex gap-3 rounded-[4px] h-44 p-3 dark:bg-neutral-800 border dark:border-neutral-700/40">
      {project.cover_image_url && (
        <img
          src={project.cover_image_url}
          className="aspect-video h-full rounded-sm object-cover object-center"
        />
      )}
      <header className="flex w-full">
        <section className="w-full flex flex-col">
          <div className="flex justify-between items-center gap-5 w-full">
            <h1 className="dark:text-neutral-200 text-md font-semibold">
              {project.title}
            </h1>
            {sessionId === project.owner_id && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="button-icon"
                    className="text-neutral-400"
                    size="icon"
                  >
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
          </div>
          {project.description && (
            <p className="dark:text-neutral-400 text-sm">
              {project.description.length > 300
                ? project.description.slice(0, 300) + "..."
                : project.description}
            </p>
          )}
        </section>
      </header>
    </article>
  );
}
