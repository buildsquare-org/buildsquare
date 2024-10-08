import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/utils/cn";
import { Nav } from "./components/aside";
import { Analytics } from "@vercel/analytics/react";

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
      <body className="dark:bg-neutral-900 dark:text-neutral-300 flex md:flex-row flex-col-reverse">
        <Nav />
        <main className="h-screen w-full flex flex-col items-center overflow-y-auto overflow-x-hidden md:px-3 px-2 py-2 md:py-2 pb-16 md:pb-2">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
