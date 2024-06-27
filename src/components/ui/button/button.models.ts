import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";

export type RawProps = {
  children: ReactNode;
  isLoading?: boolean;
  asChild?: boolean;
  className?: HTMLElement["className"];
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const buttonVariants = cva(
  "flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-indigo-500 text-neutral-50 hover:brightness-110",
        "primary-grayscale": "bg-neutral-300 text-neutral-950",
        secondary:
          "dark:bg-neutral-800 dark:text-neutral-50 border dark:border-neutral-700/60 hover:brightness-110",
        destructive: "",
        outline: "",
        ghost: "",
        link: "text-200 underline-offset-4 hover:underline",
        "button-icon":
          "text-neutral-200 rounded-lg p-2 hover:bg-neutral-700/60 p-2",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        md: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type Props = RawProps & VariantProps<typeof buttonVariants>;
