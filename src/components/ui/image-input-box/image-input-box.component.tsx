"use client";

import { ChangeEvent, useRef, useState } from "react";
import { TProps } from "./image-input-box.models";
import { cn } from "@/utils/cn";
import { ImagePlus, ImageUp, Trash } from "lucide-react";
import { Button } from "../button";

function ImageInputBox({
  onSelectImage,
  containerClassName,
  imageClassName,
}: TProps) {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

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

  const imgInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      className={cn(
        `${selectedImageUrl ? "h-auto max-h-[536px]" : "h-44"} w-full rounded-sm flex relative border border-dashed border-neutral-700 focus-visible:border-indigo-400 focus-visible:outline-none has-[:focus-visible]:border-indigo-400`,
        containerClassName,
      )}
      onFocus={() => {
        if (!imgInputRef.current) return;
        if (selectedImageUrl) return;

        imgInputRef.current.focus();
      }}
      tabIndex={selectedImageUrl ? undefined : 0}
    >
      {!selectedImageUrl && (
        <>
          <input
            ref={imgInputRef}
            type="file"
            accept="image/*"
            onChange={handleSelectImage}
            tabIndex={0}
            className="w-full h-full absolute top-0 left-0 opacity-0 peer"
          />
          <div className="w-full h-full py-10 flex items-center justify-center">
            <div className="flex items-center gap-1 text-indigo-400">
              <ImagePlus className="w-4 h-4" />
              <span>Add Image</span>
            </div>
          </div>
        </>
      )}
      {selectedImageUrl && (
        <>
          <img
            src={selectedImageUrl}
            className={cn("w-full h-auto object-cover", imageClassName)}
          />
          <div className="flex flex-col gap-1 absolute top-2 right-2">
            <Button variant="destructive" onClick={handleUnselectImage}>
              <Trash className="w-4 h-4" /> Remove
            </Button>
            <Button
              variant="secondary"
              className="relative cursor-pointer"
              asChild
              tabIndex={0}
              onFocus={() => {
                if (!imgInputRef.current) return;

                imgInputRef.current.focus();
              }}
            >
              <div>
                <input
                  ref={imgInputRef}
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
}

ImageInputBox.displayName = "ImageInputBox";

export { ImageInputBox };
