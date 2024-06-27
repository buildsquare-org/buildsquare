import { TextInput } from "@/components/ui/text-input";
import {
  TGeneralSectionFormAreas,
  TGeneralSectionProps,
} from "./general.models";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area/text-area.component";

export function GeneralSection({ userId }: TGeneralSectionProps) {
  const { handleSubmit, register, formState, watch, getFieldState } =
    useForm<TGeneralSectionFormAreas>({
      mode: "onSubmit",
      defaultValues: { name: "", description: "", picture_url: "" },
    });

  const { isDirty, isValid, isSubmitting } = formState;

  const descriptionMaxLenght = 160;
  const descriptionInputValue = watch("description");

  const nameMaxLenght = 30;
  const nameInputValue = watch("name");

  return (
    <form className="w-full h-full flex flex-col justify-between gap-5">
      <section className="flex flex-col gap-3">
        <fieldset className="flex flex-col">
          <Label className="mb-1">name</Label>
          <TextInput
            type="text"
            {...register("name", {
              maxLength: {
                value: 160,
                message: "description has a limit of 160 letter(s)",
              },
              required: { value: true, message: "name is required" },
            })}
          />
          <div>
            {getFieldState("name").isDirty && (
              <p
                className={`${nameInputValue.length > nameMaxLenght ? "dark:text-rose-400" : "dark:text-indigo-400"} text-sm transition-colors duration-150`}
              >
                {nameInputValue.length} / {nameMaxLenght}
              </p>
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
              required: { value: true, message: "description is required" },
            })}
            className="h-28 resize-none"
          />
          <div>
            {getFieldState("description").isDirty && (
              <p
                className={`${descriptionInputValue.length > descriptionMaxLenght ? "dark:text-rose-400" : "dark:text-indigo-400"} text-sm transition-colors duration-150`}
              >
                {descriptionInputValue.length} / {descriptionMaxLenght}
              </p>
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
