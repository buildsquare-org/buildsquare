"use client";

import { Button } from "@/components/ui/button";
import { ImageInputBox } from "@/components/ui/image-input-box";
import { Label } from "@/components/ui/label";
import { TextArea } from "@/components/ui/text-area";
import { TextInput } from "@/components/ui/text-input";
import { Database } from "@/models/supabase";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useForm } from "react-hook-form";

type TNewProject = Omit<
  Database["public"]["Tables"]["project"]["Insert"],
  "owner_id" | "id"
>;

export function NewProjectForm() {
  const [formImage, setFormImage] = useState<null | File>(null);

  const { register, handleSubmit, formState, getFieldState, watch } =
    useForm<TNewProject>({ mode: "onChange" });

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
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.id) return;

    const newProject: Database["public"]["Tables"]["project"]["Insert"] = {
      ...data,
      owner_id: user.id,
    };

    const { error } = await supabase.from("project").insert(newProject);

    if (error) throw new Error("error submitting");
  }

  return (
    <form
      onSubmit={handleSubmit(postNewProject)}
      className="flex flex-col gap-4 justify-between h-full"
    >
      <div className="flex flex-col gap-2">
        <fieldset className="flex flex-col">
          <Label>Title</Label>
          <TextInput
            type="text"
            {...register("title", {
              required: { value: true, message: "area required" },
            })}
          />
        </fieldset>
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
        <ImageInputBox
          onSelectImage={(img) => {
            setFormImage(img);
          }}
        />
      </div>
      <Button
        isLoading={isSubmitting}
        disabled={isSubmitting || !isValid || !isDirty}
      >
        Add
      </Button>
      {isSubmitted && !isSubmitSuccessful && (
        <p className="text-rose-400 text-sm">something went wrong</p>
      )}
    </form>
  );
}
