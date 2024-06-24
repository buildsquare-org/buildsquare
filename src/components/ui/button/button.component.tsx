import { RefObject, forwardRef } from "react";
import { Props, buttonVariants } from "./button.models";
import { Spinner } from "../spinner";
import { cn } from "@/utils/cn";

const Button = forwardRef<HTMLButtonElement | RefObject<HTMLElement>, Props>(
  (
    { children, isLoading = false, asChild = false, size, variant, className },
    ref: any,
  ) => {
    const Element = asChild ? "div" : "button";

    return (
      <Element
        ref={ref}
        className={cn(buttonVariants({ size, variant, className }))}
      >
        {isLoading ? <Spinner /> : children}
      </Element>
    );
  },
);

Button.displayName = "Button";
