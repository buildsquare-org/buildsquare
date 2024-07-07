import { Bone } from "@/components/ui/bone";

export function ProjectSkeleton() {
  return (
    <div className="flex gap-3 rounded-sm h-44 w-full">
      <Bone className="h-full aspect-video rounded-sm" />
      <div className="flex flex-col gap-3 w-full">
        <div>
          <Bone className="w-44 h-4 rounded-md" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Bone className="w-11/12 h-2.5 rounded-md" />
          <Bone className="w-10/12 h-2.5 rounded-md" />
          <Bone className="w-11/12 h-2.5 rounded-md" />
          <Bone className="w-9/12 h-2.5 rounded-md" />
          <Bone className="w-8/12 h-2.5 rounded-md" />
          <Bone className="w-9/12 h-2.5 rounded-md" />
          <Bone className="w-10/12 h-2.5 rounded-md" />
        </div>
      </div>
    </div>
  );
}
