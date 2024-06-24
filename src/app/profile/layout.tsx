import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full max-w-2xl py-10">{children}</div>
    </div>
  );
}
