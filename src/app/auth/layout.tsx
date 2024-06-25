import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full max-w-sm py-10">{children}</div>
    </div>
  );
}
