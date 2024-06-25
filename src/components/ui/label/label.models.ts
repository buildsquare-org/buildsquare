import { LabelHTMLAttributes, ReactNode } from "react";

export type TProps = {
  children: ReactNode;
} & LabelHTMLAttributes<HTMLLabelElement>;
