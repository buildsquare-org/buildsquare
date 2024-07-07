import { Bone } from "@/components/ui/bone";
import { ProjectListSkeleton } from "./views/profile/project-list/project-list-skeleton.component";

export default function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-5" aria-hidden>
      <div className="flex gap-2 w-full">
        <Bone className="w-16 h-16 rounded-full" />
        <div className="flex flex-col flex-1 gap-2 w-full">
          <Bone className="w-28 h-3 rounded-md" />
          <Bone className="w-20 h-2 rounded-md" />
          <div className="flex flex-col gap-2 mt-1 w-full">
            <Bone className="w-10/12 h-2 rounded-md" />
            <Bone className="w-9/12 h-2 rounded-md" />
            <Bone className="w-8/12 h-2 rounded-md" />
            <Bone className="w-9/12 h-2 rounded-md" />
          </div>
        </div>
      </div>
      <section className="flex flex-col">
        <header className="flex gap-6">
          <Bone className="w-24 h-6 rounded-md" />
          <Bone className="w-28 h-6 rounded-md" />
        </header>
        <div className="mt-2"></div>
        <ProjectListSkeleton />
      </section>
    </div>
  );
}
