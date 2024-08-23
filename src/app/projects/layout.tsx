import { ReactNode } from "react";

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl py-10 lg:px-0 px-4">{children}</div>
    </div>
  );
}
