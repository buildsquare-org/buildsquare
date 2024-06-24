import { cva, type VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

export type RawProps = {
  children: ReactNode;
  isLoading?: boolean;
  asChild?: boolean;
  className: HTMLElement["className"];
};

export const buttonVariants = cva(
  "flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        destructive: "",
        outline: "",
        secondary: "",
        ghost: "hover:bg-transparent hover:brightness-110",
        link: "text-200 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        md: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export type Props = RawProps & VariantProps<typeof buttonVariants>;
