"use server";

import { AuthFormDataSchema, TAuthFormData } from "./sign-up.models";
import { Value } from "@sinclair/typebox/value";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export async function signUp(
  formData: TAuthFormData,
): Promise<{ error: string | null }> {
  try {
    const isFormDataValid = Value.Check(AuthFormDataSchema, formData);

    if (!isFormDataValid) {
      throw new Error("Form Data is invalid");
    }

    const { email, password } = formData;

    const origin = headers().get("origin");
    if (!origin) throw new Error("no origin on request");

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    console.log({ error });

    if (error) throw new Error("there has been an unkown error signing up");

    return { error: null };
  } catch (error) {
    console.log({ error });
    console.log(...Value.Errors(AuthFormDataSchema, formData));
    return { error: "There has been an error" };
  }
}
