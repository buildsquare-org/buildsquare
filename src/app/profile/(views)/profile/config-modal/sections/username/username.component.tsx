import { TUsernameSectionProps } from "./username.models";

export function UsernameSection({ userId }: TUsernameSectionProps) {
  return <form>username {userId}</form>;
}
