import { ExploreMasonry } from "@/app/components/explore-masonry";
import { createClient } from "@/utils/supabase/server";

export async function ProjectList({ query }: { query: string | undefined }) {
  const supabase = createClient();

  if (!query) {
    const { data: projects } = await supabase.from("project").select("*");

    return (
      <ExploreMasonry
        initialProjects={projects || []}
        columnCountMediaQueries={{ defaultColumnCount: 1, sm: 1, md: 3, lg: 4 }}
      />
    );
  }

  const { data: projects } = await supabase
    .from("project")
    .select("*")
    .ilike("title", `%${query}%` ?? "");

  return (
    <ExploreMasonry
      initialProjects={projects || []}
      columnCountMediaQueries={{ defaultColumnCount: 1, sm: 1, md: 3, lg: 4 }}
    />
  );
}
