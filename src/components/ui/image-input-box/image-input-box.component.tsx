"use client";

import { ChangeEvent, forwardRef, useState } from "react";
import { TProps } from "./image-input-box.models";
import { cn } from "@/utils/cn";
import { ImagePlus, ImageUp, Trash } from "lucide-react";
import { Button } from "../button";

const ImageInputBox = forwardRef<HTMLInputElement, TProps>(
  ({ onSelectImage, containerClassName, imageClassName }, ref) => {
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(
      null,
    );

    function handleSelectImage(e: ChangeEvent<HTMLInputElement>) {
      if (!e.target.files) {
        return;
      }

      const image = e.target.files[0];

      if (!image) {
        return;
      }

      setSelectedImageUrl(URL.createObjectURL(image));
      onSelectImage(image);
    }

    function handleUnselectImage() {
      setSelectedImageUrl(null);
      onSelectImage(null);
    }

    return (
      <div
        className={cn(
          `w-full ${selectedImageUrl ? "h-auto max-h-[536px]" : "h-44"} flex relative`,
          containerClassName,
        )}
      >
        <input
          ref={ref}
          type="file"
          accept="image/*"
          onChange={handleSelectImage}
          className="w-full h-full absolute top-0 left-0 opacity-0"
        />
        {!selectedImageUrl && (
          <div className="w-full h-full py-10 flex items-center justify-center border border-dashed border-neutral-700">
            <div className="flex items-center gap-1 text-indigo-400">
              <ImagePlus className="w-4 h-4" />
              <span>Add Image</span>
            </div>
          </div>
        )}
        {selectedImageUrl && (
          <>
            <img
              src={selectedImageUrl}
              className={cn("w-full h-auto object-cover", imageClassName)}
            />
            <div className="flex flex-col gap-1 absolute top-1 right-1">
              <Button variant="destructive" onClick={handleUnselectImage}>
                <Trash className="w-4 h-4" /> Remove
              </Button>
              <Button
                variant="secondary"
                className="relative cursor-pointer"
                asChild
              >
                <div>
                  <input
                    ref={ref}
                    type="file"
                    accept="image/*"
                    onChange={handleSelectImage}
                    className="w-full h-full absolute top-0 left-0 opacity-0"
                  />
                  <ImageUp className="w-4 h-4" /> Replace
                </div>
              </Button>
            </div>
          </>
        )}
      </div>
    );
  },
);

ImageInputBox.displayName = "ImageInputBox";

export { ImageInputBox };
