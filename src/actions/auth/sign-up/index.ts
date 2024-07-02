"use server";

import { AuthFormDataSchema, TAuthFormData } from "./sign-up.models";
import { Value } from "@sinclair/typebox/value";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export async function signUp(
  formData: TAuthFormData,
  next?: string,
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
        emailRedirectTo: `${origin}/auth/callback${next ? `?next=${next}` : ""}`,
      },
    });

    if (error) throw new Error("there has been an unkown error signing up");

    return { error: null };
  } catch (error) {
    return { error: "There has been an error" };
  }
}
