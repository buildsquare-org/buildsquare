"use client";

import { TextInput } from "@/components/ui/text-input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { TFormAreas } from "./sign-in.models";

export default function SignInPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const { formState, register, handleSubmit } = useForm<TFormAreas>({
    mode: "onBlur",
  });

  const { errors, isValid, isSubmitting } = formState;

  async function signUp(data: TFormAreas) {
    return;
  }

  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-5">
      <h1 className="dark:text-neutral-200 text-2xl font-semibold">
        Welcome to Build Square!
      </h1>
      <form
        onSubmit={handleSubmit(signUp)}
        className="flex flex-col w-full justify-center gap-5 text-foreground"
      >
        <fieldset className="flex flex-col">
          <Label className="text-md" htmlFor="email">
            Email
          </Label>
          <TextInput
            type="email"
            id="email"
            placeholder="youremail@gmail.com"
          />
        </fieldset>
        <fieldset className="flex flex-col">
          <Label className="text-md" htmlFor="password">
            Password
          </Label>
          <TextInput type="password" id="password" placeholder="------" />
        </fieldset>
        <Button
          className="py-5"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          Sign Up
        </Button>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-neutral-700/10 dark:text-indigo-400 text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
