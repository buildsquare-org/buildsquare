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
    <article className="flex justify-between rounded-sm p-2 dark:bg-neutral-800 border dark:border-neutral-700/60">
      <section className="flex flex-col">
        <h1 className="dark:text-neutral-200 text-lg">{project.title}</h1>
        {project.description && (
          <p className="dark:text-neutral-400 text-sm">{project.description}</p>
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
    </article>
  );
}
