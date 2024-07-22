import { Bone } from "@/components/ui/bone";

export function ProfileCardSkeleton() {
  return (
    <div className="flex gap-2 w-full">
      <Bone className="w-8 h-8 rounded-full" />
      <div className="flex flex-col flex-1 gap-1">
        <Bone className="w-20 h-3 rounded-md" />
        <Bone className="w-16 h-2 rounded-md" />
      </div>
    </div>
  );
}
