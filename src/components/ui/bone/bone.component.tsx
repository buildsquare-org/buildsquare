import { cn } from "@/utils/cn";

type TProps = {
  className?: Element["className"];
};

export function Bone({ className = "" }: TProps) {
  return (
    <div
      className={cn(
        "rounded-sm bg-neutral-700 animate-pulse duration-150",
        className,
      )}
    ></div>
  );
}
