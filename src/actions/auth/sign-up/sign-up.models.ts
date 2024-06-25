import { Static, Type } from "@sinclair/typebox";

export const AuthFormDataSchema = Type.Object({
  email: Type.RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
  password: Type.String({ minLength: 8 }),
});

export type TAuthFormData = Static<typeof AuthFormDataSchema>;
