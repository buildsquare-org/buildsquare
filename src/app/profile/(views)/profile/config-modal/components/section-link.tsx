"use client";

import { ReactNode, useEffect, useState } from "react";
import { TConfigModalSection, useConfigModalStore } from "../store";
import { Button } from "@/components/ui/button";

export function SectionLink({
  children,
  section,
}: {
  children: ReactNode;
  section: TConfigModalSection;
}) {
  const currentSection = useConfigModalStore((state) => state.currentSection);
  const setCurrentSection = useConfigModalStore(
    (state) => state.setCurrentSection,
  );

  const [isActive, setIsActieve] = useState(false);

  useEffect(() => {
    if (currentSection === section) {
      setIsActieve(true);
      return;
    }

    setIsActieve(false);
  }, [currentSection]);

  return (
    <Button
      className={`flex justify-start rounded-sm font-medium px-2 ${isActive ? "dark:text-neutral-300 dark:bg-neutral-700" : "dark:text-neutral-400 dark:hover:text-neutral-300"}`}
      onClick={() => {
        setCurrentSection(section);
      }}
      variant="ghost"
    >
      {children}
    </Button>
  );
}
