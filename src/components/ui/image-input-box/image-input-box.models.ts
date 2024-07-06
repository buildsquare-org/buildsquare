export type TProps = {
  onSelectImage: (image: File | null) => void;
  containerClassName?: Element["className"];
  imageClassName?: Element["className"];
};
