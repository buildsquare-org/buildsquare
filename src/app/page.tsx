import { createClient } from "@/utils/supabase/server";
import { ExploreMasonry } from "./components/explore-masonry";

export default async function Index() {
  const supabase = createClient();

  const { data: projects } = await supabase
    .from("project")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center p-10">
      <ExploreMasonry
        initialProjects={projects ?? []}
        columnCountMediaQueries={{ defaultColumnCount: 1, sm: 1, md: 3, lg: 4 }}
      />
    </div>
  );
}
