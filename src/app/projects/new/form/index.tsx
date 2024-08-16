"use client";

import { Button } from "@/components/ui/button";
import { ImageInputBox } from "@/components/ui/image-input-box";
import { Label } from "@/components/ui/label";
import { TextArea } from "@/components/ui/text-area";
import { TextInput } from "@/components/ui/text-input";
import { Database } from "@/models/supabase";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectTitleField } from "./project-name-field";
import { useRouter } from "next/navigation";
import { ClientRouting } from "@/models/routing/client.routing";

export type TNewProject = Omit<
  Database["public"]["Tables"]["project"]["Insert"],
  "owner_id" | "id"
>;

export function NewProjectForm() {
  const [formImage, setFormImage] = useState<null | File>(null);
  const [userId, setUserId] = useState<
    null | Database["public"]["Tables"]["user"]["Row"]["id"]
  >(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUserId(user.id);
    }

    fetchUser();
  }, []);

  const MAX_IMAGE_SIZE_ALLOWED_IN_MB = 2;
  const ONE_MEGABYTE_IN_KB = 1000000;

  const {
    register,
    handleSubmit,
    formState,
    getFieldState,
    watch,
    setError,
    clearErrors,
  } = useForm<TNewProject>({ mode: "onChange" });

  const {
    isValid,
    isSubmitting,
    isDirty,
    errors,
    isSubmitSuccessful,
    isSubmitted,
  } = formState;

  const descriptionValue = watch("description");

  async function postNewProject(data: TNewProject) {
    if (!userId) return;

    const supabase = createClient();

    // we do not get the image file from the form, but from the state. so we need to separate them
    const { cover_image_url, ...formData } = data;

    const newProject: Database["public"]["Tables"]["project"]["Insert"] = {
      ...formData,
      owner_id: userId,
    };

    try {
      if (formImage) {
        const newImagePath = `${userId}/${crypto.randomUUID()}`;
        const { error, data } = await supabase.storage
          .from("images")
          .upload(newImagePath, formImage);

        if (error || !data) throw new Error("error uploading image");

        const {
          data: { publicUrl },
        } = supabase.storage.from("images").getPublicUrl(data.path);

        newProject.cover_image_url = publicUrl;
      }

      const { error } = await supabase.from("project").insert(newProject);

      if (error) throw new Error("error submitting");

      router.push(ClientRouting.projects().getById(data.title));
    } catch (error) {
      throw new Error("error submitting");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(postNewProject)}
      className="flex flex-col gap-4 justify-between h-full"
    >
      <div className="flex flex-col gap-2">
        <ProjectTitleField
          userId={userId}
          register={register}
          errors={errors}
          setError={setError}
          clearError={clearErrors}
        />
        <fieldset className="flex flex-col">
          <Label>Project Repository</Label>
          <TextInput
            type="text"
            {...register("repository_url", {
              required: false,
              validate: (value) => {
                if (!value || value.length === 0) {
                  return true;
                }

                try {
                  const url = new URL(value);

                  if (!url) throw new Error("incorrect url format");

                  if (url.protocol !== "https:")
                    return "only https protocol is allowed";

                  if (url.hostname !== "github.com")
                    return "only links to github profiles and repositories are allowed";

                  if (!url.pathname)
                    return "only links to github profiles and repositories are allowed";

                  return true;
                } catch (error) {
                  return "incorrect url format";
                }
              },
            })}
          />
          <p className="dark:text-rose-400 text-sm">
            {errors.repository_url?.message && errors.repository_url.message}
          </p>
        </fieldset>
        <fieldset className="flex flex-col">
          <Label>Project Url</Label>
          <TextInput
            type="text"
            {...register("project_url", {
              required: false,
              validate: (value) => {
                if (!value || value.length === 0) {
                  return true;
                }

                try {
                  const url = new URL(value);

                  if (!url) throw new Error("incorrect url format");

                  if (url.protocol !== "https:")
                    return "only https protocol is allowed";

                  return true;
                } catch (error) {
                  return "incorrect url format";
                }
              },
            })}
          />
          <p className="dark:text-rose-400 text-sm">
            {errors.project_url?.message && errors.project_url.message}
          </p>
        </fieldset>
        <fieldset className="flex flex-col">
          <Label>Description</Label>
          <TextArea
            {...register("description", {
              required: { value: true, message: "area required" },
              maxLength: {
                value: 700,
                message: "description cannot contain more than 700 letter(s)",
              },
            })}
            className="min-h-44"
          />
          <div className="flex gap-1 justify-between">
            <p className="dark:text-rose-400 text-sm">
              {errors.description?.message && errors.description.message}
            </p>
            {getFieldState("description").isDirty && descriptionValue && (
              <span
                className={`${descriptionValue.length > 700 ? "dark:text-rose-400" : "dark:text-indigo-400"} text-sm transition-colors duration-150`}
              >
                {descriptionValue.length} / 700
              </span>
            )}
          </div>
        </fieldset>
        <fieldset>
          <Label>Cover Image</Label>
          <ImageInputBox
            onSelectImage={(img) => {
              setFormImage(img);

              if (!img) {
                clearErrors("cover_image_url");
                return;
              }

              if (
                img?.size >
                MAX_IMAGE_SIZE_ALLOWED_IN_MB * ONE_MEGABYTE_IN_KB
              ) {
                setError("cover_image_url", {
                  message: "Max image size is 2mb",
                });
              } else {
                clearErrors("cover_image_url");
              }
            }}
          />
          <div className="flex gap-1 justify-between">
            <p className="dark:text-rose-400 text-sm">
              {errors.cover_image_url?.message &&
                errors.cover_image_url.message}
            </p>
            {formImage && (
              <span
                className={`${formImage.size > MAX_IMAGE_SIZE_ALLOWED_IN_MB * ONE_MEGABYTE_IN_KB ? "dark:text-rose-400" : "dark:text-indigo-400"} text-sm transition-colors duration-150`}
              >
                {formImage.size > ONE_MEGABYTE_IN_KB
                  ? `${Math.round(formImage.size / ONE_MEGABYTE_IN_KB)} mb`
                  : `${formImage.size / 1000} kb`}{" "}
                / {`${MAX_IMAGE_SIZE_ALLOWED_IN_MB} mb`}
              </span>
            )}
          </div>
        </fieldset>
      </div>
      {isSubmitted && !isSubmitSuccessful && (
        <p className="text-rose-400 text-sm">something went wrong</p>
      )}
      <div className="w-full flex justify-end">
        <Button
          isLoading={isSubmitting}
          disabled={
            isSubmitting ||
            !isValid ||
            !isDirty ||
            !userId ||
            Object.values(errors).length !== 0
          }
          className="w-max"
        >
          post new project
        </Button>
      </div>
    </form>
  );
}
