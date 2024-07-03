import { TProps } from "./project.models";

export function Project({ sessionId, project }: TProps) {
  return (
    <article className="rounded-sm p-2 dark:bg-neutral-800 border dark:border-neutral-700/60">
      <h1 className="dark:text-neutral-200 text-lg">{project.title}</h1>
      {project.description && (
        <p className="dark:text-neutral-400 text-sm">{project.description}</p>
      )}
    </article>
  );
}
