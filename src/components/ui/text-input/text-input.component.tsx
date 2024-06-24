import { forwardRef } from "react";
import { TProps } from "./text-input.models";
import { cn } from "@/utils/cn";

const TextInput = forwardRef<HTMLInputElement, TProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      {...props}
      className={cn(
        "dark:bg-neutral-800 p-2 rounded-md dark:text-neutral-300 font-medium focus-visible:outline-none ring-2 ring-neutral-700/60 focus-visible:ring-indigo-400",
        className,
      )}
    />
  ),
);

TextInput.displayName = "TextInput";

export { TextInput };
