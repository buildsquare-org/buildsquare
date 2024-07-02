"use client";

import { TextInput } from "@/components/ui/text-input";
import { TUsernameSectionProps } from "./username.models";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useDebounce } from "@/hooks/use-debounce";
import { ChangeEvent, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Spinner } from "@/components/ui/spinner";
import { BadgeCheck, BadgeX, Ban, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ClientRouting } from "@/models/routing/client.routing";

type TFormAreas = {
  username: string;
};

export function UsernameSection({
  defaultUsername,
  userId,
}: TUsernameSectionProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [isUsernameAvailable, setUsernameAvailable] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const { register, formState, handleSubmit } = useForm<TFormAreas>({
    mode: "onChange",
  });

  const { isValid, isSubmitting, isDirty, errors } = formState;

  const [debouncedInputValue] = useDebounce({ state: inputValue, delay: 500 });

  const router = useRouter();

  useEffect(() => {
    async function checkUsernameAvailability({
      signal,
    }: {
      signal: AbortSignal;
    }) {
      if (!isDirty) return;

      if (debouncedInputValue === defaultUsername) {
        setUsernameAvailable(true);
        setLoading(false);
        return;
      }

      if (debouncedInputValue.length === 0) {
        setUsernameAvailable(false);
        setLoading(false);
        return;
      }

      setLoading(true);

      const supabase = createClient();

      const { error } = await supabase
        .from("profile")
        .select("*")
        .eq("username", debouncedInputValue)
        .abortSignal(signal)
        .single();

      if (error) {
        setUsernameAvailable(true);
        setLoading(false);
        return;
      }

      setUsernameAvailable(false);
      setLoading(false);
    }

    const ctl = new AbortController();
    checkUsernameAvailability({ signal: ctl.signal });

    return () => {
      ctl.abort();
      setLoading(false);
    };
  }, [debouncedInputValue]);

  async function updateUsername(data: TFormAreas) {
    if (!data || !data.username) return;

    const supabase = createClient();

    const { error } = await supabase
      .from("profile")
      .update({ username: debouncedInputValue })
      .eq("user_id", userId);

    if (error) {
      setUsernameAvailable(false);
      return;
    }

    router.replace(ClientRouting.profile().getbyUsername(debouncedInputValue));
    router.refresh();
  }

  useEffect(() => {
    if (inputValue !== debouncedInputValue) {
      setLoading(true);
      return;
    }
  }, [inputValue]);

  return (
    <form
      onSubmit={handleSubmit(updateUsername)}
      className="flex flex-col justify-between"
    >
      <fieldset className="flex flex-col">
        <Label>username</Label>
        <TextInput
          type="text"
          {...register("username", {
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
              setInputValue(e.target.value);
            },
            required: { value: true, message: "area required" },
            minLength: {
              value: 3,
              message: "username must contain at least 3 letter(s)",
            },
            maxLength: {
              value: 36,
              message: "username cant contain more than 36 letter(s)",
            },
          })}
          defaultValue={defaultUsername}
          disabled={isSubmitting}
        />
        {errors.username?.message ? (
          <p className="dark:text-rose-400">{errors.username.message}</p>
        ) : (
          <>
            {loading && (
              <div className="dark:text-neutral-300 flex gap-1 items-center">
                <Spinner /> checking availablility
              </div>
            )}
            {!loading &&
              (isUsernameAvailable ? (
                <div className="dark:text-indigo-400 flex gap-1 items-center">
                  <BadgeCheck className="w-4 h-4" /> username available
                </div>
              ) : (
                <div className="dark:text-rose-400 flex gap-1 items-center">
                  <BadgeX className="w-4 h-4" /> username already in use
                </div>
              ))}
          </>
        )}
      </fieldset>
      <footer className="w-full flex justify-end">
        <Button
          disabled={
            loading ||
            !isValid ||
            !isDirty ||
            isSubmitting ||
            inputValue === defaultUsername ||
            !isUsernameAvailable
          }
          isLoading={isSubmitting}
        >
          save
        </Button>
      </footer>
    </form>
  );
}
