import { Static, Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const EnvironmentSchema = Type.Object({
  NEXT_PUBLIC_SUPABASE_URL: Type.String(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: Type.String(),
  NODE_ENV: Type.Union([
    Type.Literal("test"),
    Type.Literal("production"),
    Type.Literal("development"),
  ]),
});

export function register() {
  const isEnvValid = Value.Check(EnvironmentSchema, process.env);

  if (!isEnvValid) {
    const errors = [...Value.Errors(EnvironmentSchema, process.env)];
    console.log(errors);
    throw new Error("invalid environment variables");
  }
}

export type TEnvironment = Static<typeof EnvironmentSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends TEnvironment {}
  }
}
