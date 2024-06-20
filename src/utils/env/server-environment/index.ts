import { Static, Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const ServerEnvironmentSchema = Type.Object({
  NEXT_PUBLIC_SUPABASE_URL: Type.String(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: Type.String(),
  NODE_ENV: Type.Union([
    Type.Literal("test"),
    Type.Literal("production"),
    Type.Literal("development"),
  ]),
});

const isEnvValid = Value.Check(ServerEnvironmentSchema, process.env);

if (!isEnvValid) {
  const errors = [...Value.Errors(ServerEnvironmentSchema, process.env)];
  console.log(errors);
  throw new Error("invalid environment variables");
}

type TServerEnvironment = Static<typeof ServerEnvironmentSchema>;

export const ServerEnvironment = process.env as TServerEnvironment;
