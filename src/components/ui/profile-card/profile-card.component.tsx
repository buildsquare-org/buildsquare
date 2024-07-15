import { cn } from "@/utils/cn";
import { TProps } from "./profile-card.models";

export function ProfileCard({ profile, className = "" }: TProps) {
  return (
    <article className={cn("flex w-full gap-3", className)}>
      <img
        src={
          profile.picture_url ?? `https://avatar.vercel.sh/${profile?.username}`
        }
        className="w-8 h-8 object-cover object-center rounded-full"
      />
      <div className="flex flex-col flex-1">
        {profile.name && (
          <h1 className="font-medium leading-4 dark:text-neutral-200">
            {profile.name}
          </h1>
        )}
        <span className="dark:text-indigo-400 text-sm">
          @{profile.username.slice(0, 16)}
        </span>
      </div>
    </article>
  );
}
