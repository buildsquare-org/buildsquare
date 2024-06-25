import { cn } from "@/utils/cn";
import { TProps } from "./label.models";

export function Label({ children, className, ...props }: TProps) {
  return (
    <label {...props} className={cn("dark:text-neutral-300", className)}>
      {children}
    </label>
  );
}
