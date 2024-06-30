import { useState } from "react";
import { useForm } from "react-hook-form";

import type { Database } from "@/models/supabase";
import { TextInput } from "@/components/ui/text-input";
import {
  TGeneralSectionFormAreas,
  TGeneralSectionProps,
} from "./general.models";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area/text-area.component";
import { ImageInput } from "@/components/feature/image-input/image-input.component";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { RevalidatePathAction } from "@/actions/revalidate-path";
import { ClientRouting } from "@/models/routing/client.routing";

export function GeneralSection({ profile }: TGeneralSectionProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { handleSubmit, register, formState, watch, getFieldState, setError } =
    useForm<TGeneralSectionFormAreas>({
      mode: "onSubmit",
      defaultValues: {
        name: profile.name || "",
        description: profile.description || "",
      },
    });

  const { isDirty, isValid, isSubmitting, errors } = formState;

  const router = useRouter();

  const descriptionMaxLenght = 160;
  const descriptionInputValue = watch("description");

  const nameMaxLenght = 30;
  const nameInputValue = watch("name");

  const maxImageSizeInMB = 2;
  const oneMegaByteInBytes = 1000000;

  async function updateGeneralProfileInfo(data: TGeneralSectionFormAreas) {
    if (((!isDirty || !isValid) && !imageFile) || isSubmitting) return;

    const supabase = createClient();

    const updatedProfile: Database["public"]["Tables"]["profile"]["Update"] =
      {};

    try {
      if (imageFile && imageFile.size) {
        const imageFileSize = imageFile?.size;

        if (imageFileSize > maxImageSizeInMB * oneMegaByteInBytes) {
          setError("picture", { message: `max image size is 2 mb` });
        }

        const imagePath = `${profile.user_id}/${crypto.randomUUID()}`;

        const { data: storageData, error: errorUploadingImage } =
          await supabase.storage.from("images").upload(imagePath, imageFile);

        if (!storageData || errorUploadingImage) {
          throw new Error("error uploading image");
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("images").getPublicUrl(storageData.path);

        updatedProfile.picture_url = publicUrl;
      }

      const { name, description } = data;

      updatedProfile.name = name;
      updatedProfile.description = description;

      const { error } = await supabase
        .from("profile")
        .update(updatedProfile)
        .eq("user_id", profile.user_id)
        .single();

      if (error) throw new Error("error trying to update profile");

      if (profile.picture_url) {
        // if the user had a picture, we remove it
        //
        try {
          const oldImagePaths = profile.picture_url.split("/");

          const oldImagePath1 = oldImagePaths[oldImagePaths.length - 2];
          const oldImagePath2 = oldImagePaths[oldImagePaths.length - 1];

          if (!oldImagePath2 || !oldImagePath1)
            throw new Error("could not ge tpaths for image");

          const finalImagePath = `${oldImagePath1}/${oldImagePath2}`;

          await supabase.storage.from("images").remove([finalImagePath]);
        } catch (error) {}
      }

      await RevalidatePathAction(ClientRouting.profile().slash, "page");
      router.refresh();
    } catch (error) {
      //
    }
  }

  return (
    <form
      onSubmit={handleSubmit(updateGeneralProfileInfo)}
      className="w-full h-full flex flex-col justify-between gap-5"
      encType="multipart/form-data"
    >
      <section className="flex flex-col gap-3">
        <fieldset>
          <Label>Picture</Label>
          <ImageInput
            imageClassName="w-full h-full object-cover obejct-center"
            containerClassName="rounded-md w-24 h-24"
            onSelect={(file) => {
              setImageFile(file);
            }}
            defaultImageUrl={profile.picture_url}
          />
          <div className="flex gap-1 flex-col">
            {imageFile && (
              <span
                className={`${imageFile.size > maxImageSizeInMB * oneMegaByteInBytes ? "dark:text-rose-400" : "dark:text-indigo-400"} text-sm transition-colors duration-150`}
              >
                {imageFile.size > oneMegaByteInBytes
                  ? `${imageFile.size / oneMegaByteInBytes} mb`
                  : `${imageFile.size / 1000} kb`}{" "}
                / {`${maxImageSizeInMB} mb`}
              </span>
            )}
            <p className="dark:text-rose-400 text-sm">
              {errors.picture?.message && errors.picture.message}
            </p>
          </div>
        </fieldset>
        <fieldset className="flex flex-col">
          <Label className="mb-1">name</Label>
          <TextInput
            type="text"
            {...register("name", {
              maxLength: {
                value: 30,
                message: "name must contain less than 160 letter(s)",
              },
            })}
          />
          <div className="flex gap-1 justify-between">
            <p className="dark:text-rose-400 text-sm">
              {errors.name?.message && errors.name.message}
            </p>
            {getFieldState("name").isDirty && (
              <span
                className={`${nameInputValue.length > nameMaxLenght ? "dark:text-rose-400" : "dark:text-indigo-400"} text-sm transition-colors duration-150`}
              >
                {nameInputValue.length} / {nameMaxLenght}
              </span>
            )}
          </div>
        </fieldset>
        <fieldset className="flex flex-col">
          <Label className="mb-1">description</Label>
          <TextArea
            spellCheck={true}
            {...register("description", {
              maxLength: {
                value: 160,
                message: "description has a limit of 160 letter(s)",
              },
            })}
            className="h-28 resize-none"
          />
          <div className="flex gap-1 justify-between">
            <p className="dark:text-rose-400 text-sm">
              {errors.description?.message && errors.description.message}
            </p>
            {getFieldState("description").isDirty && (
              <span
                className={`${descriptionInputValue.length > descriptionMaxLenght ? "dark:text-rose-400" : "dark:text-indigo-400"} text-sm transition-colors duration-150`}
              >
                {descriptionInputValue.length} / {descriptionMaxLenght}
              </span>
            )}
          </div>
        </fieldset>
      </section>
      <footer className="flex justify-end w-full">
        <Button disabled={isSubmitting} isLoading={isSubmitting}>
          update
        </Button>
      </footer>
    </form>
  );
}
