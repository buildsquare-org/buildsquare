"use client";

import { useForm } from "react-hook-form";
import { TFormAreas } from "./sign-up.models";
import { Label } from "@/components/ui/label";
import { TextInput } from "@/components/ui/text-input";
import { Button } from "@/components/ui/button";
import { signUp as signUpAction } from "@/actions/auth/sign-up";
import { ClientRouting } from "@/models/routing/client.routing";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage({
  searchParams,
}: {
  searchParams: { message: string; next: string };
}) {
  const { formState, register, handleSubmit } = useForm<TFormAreas>({
    mode: "all",
  });

  const { errors, isValid, isSubmitting } = formState;

  const router = useRouter();

  async function signUp(data: TFormAreas) {
    const { error } = await signUpAction(data);

    if (error) {
      router.push(ClientRouting.auth().signIn + `?message=${error}`);
      return;
    }

    const message = "Check your email to complete your Sign Up";

    router.push(ClientRouting.auth().signUp + `?message=${message}`);
  }

  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-5">
      <h1 className="dark:text-neutral-200 text-2xl font-semibold">
        Welcome back to Build Square!
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
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                message: "Incorrect email format",
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              },
            })}
          />
          {errors.email?.message && (
            <span className="dark:text-indigo-400 mt-1 will-change-contents">
              {errors.email.message}
            </span>
          )}
        </fieldset>
        <fieldset className="flex flex-col">
          <Label className="text-md" htmlFor="password">
            Password
          </Label>
          <TextInput
            type="password"
            id="password"
            placeholder="------"
            {...register("password", {
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 8,
                message: "Password must contain more than 8 letter(s)",
              },
            })}
          />
          {errors.password?.message && (
            <span className="dark:text-indigo-400 mt-1">
              {errors.password.message}
            </span>
          )}
        </fieldset>
        <Button
          className="py-5"
          type="submit"
          disabled={!isValid || isSubmitting}
          isLoading={isSubmitting}
        >
          Sign Up
        </Button>
      </form>
      <footer>
        <p className="dark:text-neutral-300">
          Already have an account?{" "}
          <Link
            href={
              ClientRouting.auth().signIn +
              `${searchParams.next && `?next=${searchParams.next}`}`
            }
            className="text-indigo-400 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </footer>
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-neutral-700/10 dark:text-indigo-400 text-center">
          {searchParams.message}
        </p>
      )}
    </div>
  );
}
