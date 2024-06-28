"use client";

import { forwardRef, useState } from "react";
import { TProps } from "./image-input.models";
import { cn } from "@/utils/cn";
import { Camera } from "lucide-react";

const ImageInput = forwardRef<HTMLInputElement, TProps>(
  (
    {
      containerClassName = "",
      imageClassName = "",
      defaultImageUrl,
      onSelect,
      ...props
    },
    ref,
  ) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(
      defaultImageUrl,
    );

    return (
      <div
        className={cn(
          `${!selectedImage && "dark:bg-neutral-700"} cursor-pointer overflow-hidden relative group`,
          containerClassName,
        )}
      >
        <input
          {...props}
          ref={ref}
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target && e.target.files) {
              const img = e.target.files[0];

              if (!img) {
                setSelectedImage(null);
                onSelect(null);
                return;
              }

              setSelectedImage(URL.createObjectURL(img));
              onSelect(img);
            }
          }}
          className={cn("opacity-0 cursor-pointer z-10", imageClassName)}
        />
        {selectedImage && (
          <img
            src={selectedImage}
            className={cn(
              "absolute top-0 left-0 w-ful h-full pointer-events-none",
              imageClassName,
            )}
            aria-hidden
          />
        )}
        <div
          className={`absolute top-0 left-0 pointer-events-none ${selectedImage && "group-hover:bg-neutral-900/20"} w-full h-full flex items-center justify-center`}
        >
          <Camera
            className={`dark:text-neutral-300 transition-all duration-150 ${selectedImage && "opacity-0 group-hover:opacity-100"}`}
          />
        </div>
      </div>
    );
  },
);

ImageInput.displayName = "ImageInput";

export { ImageInput };
