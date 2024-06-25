import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Props, buttonVariants } from "./button.models";
import { Spinner } from "../spinner";
import { cn } from "@/utils/cn";

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      isLoading = false,
      asChild = false,
      size,
      variant,
      className = "",
      ...props
    },
    ref,
  ) => {
    const Element = asChild ? Slot : "button";

    return (
      <Element
        ref={ref}
        className={cn(buttonVariants({ size, variant, className }))}
        {...props}
      >
        {isLoading ? <Spinner /> : children}
      </Element>
    );
  },
);

Button.displayName = "Button";

export { Button };
