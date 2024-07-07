import { ProjectSkeleton } from "./project/project-skeleton.component";

export function ProjectListSkeleton() {
  return (
    <ul className="flex flex-col gap-3">
      {Array(4)
        .fill("")
        .map((_, i) => (
          <li key={i}>
            <ProjectSkeleton />
          </li>
        ))}
    </ul>
  );
}
