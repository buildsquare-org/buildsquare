import { createClient } from "@/utils/supabase/server";
import { Project } from "./project";
import Link from "next/link";
import { ClientRouting } from "@/models/routing/client.routing";

type TProps = {
  userId: string;
  username: string;
  sessionId: string | null;
};

export async function ProjectList({ username, userId, sessionId }: TProps) {
  const supabase = createClient();

  const { data: projects, error } = await supabase
    .from("project")
    .select("*")
    .eq("owner_id", userId);

  if (error) return null;

  if (projects.length === 0) return null;

  return (
    <ul className="flex flex-col gap-3">
      {projects.map((project) => (
        <li key={project.id}>
          <Link href={ClientRouting.projects().getById(project.title)}>
            <Project project={project} sessionId={sessionId} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
