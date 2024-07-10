import { ProjectCard } from "../project-card";
import { TProps } from "./explore-masonry.models";

export function ExploreMasonry({ initialProjects }: TProps) {
  const colSize = Math.floor(initialProjects.length / 3);

  const firstColItems = initialProjects.slice(0, colSize);

  const secondColItems = initialProjects.slice(colSize, colSize * 2);

  const thirdColItems = initialProjects.slice(colSize * 2, colSize * 3 + 2);

  return (
    <ul className="grid grid-cols-3 gap-4 w-full max-w-7xl">
      <ul className="flex flex-col w-full gap-4">
        {firstColItems.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
      <ul className="flex flex-col w-full gap-4">
        {secondColItems.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
      <ul className="flex flex-col w-full gap-4">
        {thirdColItems.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </ul>
  );
}
