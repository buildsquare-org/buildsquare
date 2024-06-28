"use client";

import { useForm } from "react-hook-form";
import { TLinksSectionFormAreas, TLinksSectionProps } from "./links.models";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TextInput } from "@/components/ui/text-input";

export function LinksSection({ profile }: TLinksSectionProps) {
  const { register, handleSubmit, formState } = useForm<TLinksSectionFormAreas>(
    { mode: "onChange" },
  );

  const { errors, isValid, isSubmitting } = formState;

  const router = useRouter();

  async function updateLinks(data: TLinksSectionFormAreas) {
    const supabase = createClient();

    const { error } = await supabase
      .from("profile")
      .update(data)
      .eq("user_id", profile.user_id);

    if (error) {
      //
    }

    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit(updateLinks)}
      className="h-full flex flex-col justify-between gap-5"
    >
      <section className="flex flex-col gap-3">
        <fieldset className="flex flex-col">
          <Label className="mb-1">linkedin profile url</Label>
          <TextInput
            type="url"
            {...register("linkedin_url", {
              validate: (value) => {
                if (!value) return true;

                try {
                  const url = new URL(value);

                  if (url.protocol !== "https:")
                    return "only https protocol is allowed";

                  if (
                    url.hostname !== "www.linkedin.com" &&
                    url.hostname !== "linkedin.com"
                  )
                    return "only links to linkedin are valid";

                  if (!url.pathname.startsWith("/in/"))
                    return "only urls that lead to a profile are valid";

                  return true;
                } catch (error) {
                  return `invalid url. make sure to include the 'https://' protocol`;
                }
              },
              required: false,
            })}
          />
          {errors.linkedin_url?.message && (
            <p className="dark:text-rose-400">{errors.linkedin_url.message}</p>
          )}
        </fieldset>
        <fieldset className="flex flex-col">
          <Label className="mb-1">twitter url</Label>
          <TextInput
            type="url"
            {...register("twitter_url", {
              validate: (value) => {
                if (!value) return true;

                try {
                  const url = new URL(value);

                  if (url.protocol !== "https:")
                    return "only https protocol is allowed";

                  if (
                    url.hostname !== "www.x.com" &&
                    url.hostname !== "x.com" &&
                    url.hostname !== "www.twitter.com" &&
                    url.hostname !== "twitter.com"
                  )
                    return "only links to twitter are valid";

                  return true;
                } catch (error) {
                  return `invalid url. make sure to include the 'https://' protocol`;
                }
              },
              required: false,
            })}
          />
          {errors.twitter_url?.message && (
            <p className="dark:text-rose-400">{errors.twitter_url.message}</p>
          )}
        </fieldset>
        <fieldset className="flex flex-col">
          <Label className="mb-1">github url</Label>
          <TextInput
            type="url"
            {...register("github_url", {
              validate: (value) => {
                if (!value) return true;

                try {
                  const url = new URL(value);

                  if (url.protocol !== "https:")
                    return "only https protocol is allowed";

                  if (
                    url.hostname !== "www.github.com" &&
                    url.hostname !== "github.com"
                  )
                    return "only links to linkedin are valid";

                  return true;
                } catch (error) {
                  return `invalid url. make sure to include the 'https://' protocol`;
                }
              },
              required: false,
            })}
          />
          {errors.github_url?.message && (
            <p className="dark:text-rose-400">{errors.github_url.message}</p>
          )}
        </fieldset>
        <fieldset className="flex flex-col">
          <Label className="mb-1">wild url</Label>
          <TextInput
            type="url"
            {...register("wild_link", {
              validate: (value) => {
                if (!value) return true;

                try {
                  const url = new URL(value);

                  if (url.protocol !== "https:")
                    return "only https protocol is allowed";

                  return true;
                } catch (error) {
                  return `invalid url. make sure to include the 'https://' protocol`;
                }
              },
              required: false,
            })}
          />
          {errors.wild_link?.message && (
            <p className="dark:text-rose-400">{errors.wild_link.message}</p>
          )}
        </fieldset>
      </section>
      <footer className="flex justify-end">
        <Button disabled={!isValid || isSubmitting} isLoading={isSubmitting}>
          update
        </Button>
      </footer>
    </form>
  );
}
