import { NewProjectForm } from "./form";

export default function NewProjectPage() {
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-xl font-semibold">new project</h1>
      <NewProjectForm />
    </div>
  );
}
