import { InputHTMLAttributes } from "react";
import { type ClassNameValue } from "tailwind-merge";

export type TProps = InputHTMLAttributes<HTMLInputElement> & {
  defaultImageUrl: string | null;
  imageClassName?: ClassNameValue;
  containerClassName?: ClassNameValue;
  onSelectImage: (file: File | null) => void;
};
