import { Static, Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const EnvClientSchema = Type.Object({
  NEXT_PUBLIC_SUPABASE_URL: Type.String(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: Type.String(),
  NODE_ENV: Type.Union([
    Type.Literal("test"),
    Type.Literal("production"),
    Type.Literal("development"),
  ]),
});

const isEnvValid = Value.Check(EnvClientSchema, process.env);

if (!isEnvValid) {
  const errors = [...Value.Errors(EnvClientSchema, process.env)];
  console.log(errors);
  throw new Error("invalid environment variables");
}

type TEnvClientSchema = Static<typeof EnvClientSchema>;

export const ClientEnvironment = process.env as TEnvClientSchema;
