import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

export type TProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  type: Extract<
    HTMLInputTypeAttribute,
    "text" | "password" | "number" | "email" | "url"
  >;
};
