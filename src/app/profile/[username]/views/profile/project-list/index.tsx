import { createClient } from "@/utils/supabase/server";
import { Project } from "./project";

type TProps = {
  userId: string;
  sessionId: string | null;
};

export async function ProjectList({ userId, sessionId }: TProps) {
  const supabase = createClient();

  const { data: projects, error } = await supabase
    .from("project")
    .select("*")
    .eq("owner_id", userId);

  if (error) return null;

  if (projects.length === 0) return null;

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          <Project project={project} sessionId={sessionId} />
        </li>
      ))}
    </ul>
  );
}
