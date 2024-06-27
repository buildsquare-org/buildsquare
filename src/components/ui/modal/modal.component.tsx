"use client";

import { cn } from "@/utils/cn";
import FocusTrap from "focus-trap-react";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Modal({
  children,
  open,
  onClose,
  zIndex = 51,
  className = "",
}: {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  zIndex?: number;
  className?: Element["className"];
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (window) setIsClient(true);

    return () => {
      setIsClient(false);
    };
  }, []);

  if (!isClient) return null;

  if (!open) return null;

  return createPortal(
    <FocusTrap>
      <div>
        <div
          className="w-full h-screen absolute top-0 left-0 bg-neutral-900/60"
          style={{ zIndex }}
          onClick={onClose}
        ></div>
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 w-full rounded-md bg-neutral-800 border border-neutral-700/60",
            className,
          )}
          style={{ zIndex: zIndex + 1 }}
        >
          {children}
        </div>
      </div>
    </FocusTrap>,
    document.body,
  );
}
