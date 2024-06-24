"use server";

import { headers } from "next/headers";
import { Value } from "@sinclair/typebox/value";
import { AuthFormDataSchema, TAuthFormData } from "./sign-in.models";
import { createClient } from "@/utils/supabase/server";

export async function signIn(
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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error("there has been an unkown error signing in");

    return { error: null };
  } catch (error) {
    console.log({ error });
    console.log(...Value.Errors(AuthFormDataSchema, formData));
    return { error: "There has been an error" };
  }
}
