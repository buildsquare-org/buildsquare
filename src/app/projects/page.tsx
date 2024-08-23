import { SearchBar } from "./_components/nav-bar";
import { ProjectList } from "./_components/project-list";

export default function ProjectPage({
  searchParams: { query },
}: {
  searchParams: { query: string | undefined };
}) {
  return (
    <div className="flex flex-col gap-5">
      <header className="w-full">
        <SearchBar />
      </header>
      <ProjectList query={query} />
    </div>
  );
}
