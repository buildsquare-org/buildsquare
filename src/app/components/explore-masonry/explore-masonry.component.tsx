"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "../project-card";
import { TProps } from "./explore-masonry.models";

const MD_SIZE = 768;
const SM_SIZE = 640;
const LG_SIZE = 1024;

export function ExploreMasonry({
  initialProjects,
  columnCountMediaQueries: { md, sm, lg, defaultColumnCount },
}: TProps) {
  const [columnCount, setColumnCount] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  function setColumnCountDependingOnWindowWidth(currentWindowWidth: number) {
    // sm
    if (currentWindowWidth > SM_SIZE && currentWindowWidth < MD_SIZE) {
      setColumnCount(sm);

      return;
    }

    // md
    if (currentWindowWidth > MD_SIZE && currentWindowWidth < LG_SIZE) {
      setColumnCount(md);

      return;
    }

    // lg
    if (currentWindowWidth > LG_SIZE) {
      setColumnCount(lg);

      return;
    }

    // default column count for screens smaller than sm
    setColumnCount(defaultColumnCount);
  }

  useEffect(() => {
    if (!document || !document.body.scrollWidth) return;

    setWindowWidth(document.body.scrollWidth);
  }, []);

  useEffect(() => {
    if (!windowWidth) return;

    setColumnCountDependingOnWindowWidth(windowWidth);
  }, [windowWidth]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(document.body.scrollWidth);
    }
    if (!window) return;

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!columnCount) return null;

  const colSize = Math.round(initialProjects.length / columnCount);

  function calcualteSliceStart(index: number): number {
    if (index === 0) return 0;

    return colSize * index;
  }

  function calculateSliceEnd(index: number): number {
    if (index === 0) return colSize * 1;

    return colSize * (index + 1);
  }

  return (
    <>
      {colSize}
      <ul
        className="grid gap-4 w-full max-w-7xl text-white"
        style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
      >
        {Array(columnCount)
          .fill("")
          .map((_, index) => (
            <ul className="flex flex-col w-full h-full gap-4" key={index}>
              {initialProjects
                .slice(calcualteSliceStart(index), calculateSliceEnd(index))
                .map((project) => (
                  <li key={project.id}>
                    <ProjectCard project={project} />
                  </li>
                ))}
            </ul>
          ))}
      </ul>
    </>
  );
}
