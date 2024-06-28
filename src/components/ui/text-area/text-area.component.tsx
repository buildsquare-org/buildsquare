import { forwardRef } from "react";
import { TProps } from "./text-area.models";
import { cn } from "@/utils/cn";

export const TextArea = forwardRef<HTMLTextAreaElement, TProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className={cn(
          "dark:bg-neutral-800 [-internal-autofill-selected]:!bg-neutral-800 p-2 rounded-md dark:text-neutral-300 placeholder:text-neutral-500 font-medium focus-visible:outline-none ring-2 ring-neutral-700/60 focus-visible:ring-indigo-400 focus-visible:disabled:ring-neutral-700/60 disabled:opacity-80 disabled:hover:cursor-not-allowed transition-all duration-150",
          className,
        )}
      />
    );
  },
);
