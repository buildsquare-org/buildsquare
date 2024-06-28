import { type ClassNameValue } from "tailwind-merge";

export type TProps = {
  defaultImageUrl: string | null;
  imageClassName?: ClassNameValue;
  containerClassName?: ClassNameValue;
  onSelect: (file: File | null) => void;
};
