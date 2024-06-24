import { Button } from "@/components/ui/button";
import { ClientRouting } from "@/models/routing/client.routing";
import Link from "next/link";

export function Dialog() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <article className="flex flex-col gap-5 items-center">
        <header className="flex flex-col">
          <h1 className="dark:text-neutral-200 font-semibold text-2xl">
            Sign In to create a profile
          </h1>
          <p className="dark:text-neutral-400">
            Please create an account to get started
          </p>
        </header>
        <footer className="flex justify-center gap-5">
          <Link href={ClientRouting.auth().signIn}>
            <Button className="w-max" size="sm" asChild>
              Sign Up
            </Button>
          </Link>
          <Link href={ClientRouting.auth().signIn}>
            <Button className="w-max" size="sm" variant="secondary" asChild>
              Sign In
            </Button>
          </Link>
        </footer>
      </article>
    </div>
  );
}
