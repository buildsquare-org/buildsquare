import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/utils/cn";
import { Aside } from "./components/aside";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Build Square",
  description:
    "The hub for developers to build in public, share projects and contribute to open source",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(GeistSans.className, "dark")}>
      <body className="dark:bg-neutral-900 flex">
        <Aside />
        <main className="h-screen w-full flex flex-col items-center overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
