import { Loader } from "lucide-react";
import { Props } from "./spinner.models";
import { cn } from "@/utils/cn";

export function Spinner({ className = "" }: Props) {
  return (
    <Loader
      className={cn(
        "w-4 h-4 animate-spin duration-150 transition-all",
        className,
      )}
    />
  );
}
