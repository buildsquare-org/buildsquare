import { Bone } from "@/components/ui/bone";
import { Label } from "@/components/ui/label";
import { TextInput } from "@/components/ui/text-input";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
} from "react-hook-form";
import { TNewProject } from "..";
import { ChangeEvent, useEffect, useState } from "react";
import { Database } from "@/models/supabase";
import { createClient } from "@/utils/supabase/client";
import { useDebounce } from "@/hooks/use-debounce";
import { Check, X } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

type TProps = {
  userId: Database["public"]["Tables"]["user"]["Row"]["id"] | null;
  register: UseFormRegister<TNewProject>;
  errors: FieldErrors<TNewProject>;
  setError: UseFormSetError<TNewProject>;
  clearError: UseFormClearErrors<TNewProject>;
};

export function ProjectTitleField({
  userId,
  register,
  errors,
  setError,
  clearError,
}: TProps) {
  const [inputValue, setInputValue] = useState("");
  const [projectTitle] = useDebounce({ state: inputValue, delay: 500 });
  const [isLoadingTitleAvailability, setIsLoadingTitleAvailability] =
    useState(true);
  const [isProjectTitleAvailable, setIsProjectTitleAvailable] =
    useState<boolean>(true);

  useEffect(() => {
    async function checkProjectTitleAvailability() {
      if (!userId) return;

      setIsLoadingTitleAvailability(true);

      const supabase = createClient();

      const { data: projects } = await supabase
        .from("project")
        .select("*")
        .eq("owner_id", userId)
        .ilike("title", projectTitle.replaceAll(" ", "-").toLowerCase());

      if (projects?.length === 0) {
        setIsLoadingTitleAvailability(false);
        setIsProjectTitleAvailable(true);

        clearError("title");
        return;
      }

      setIsLoadingTitleAvailability(false);
      setIsProjectTitleAvailable(false);

      setError("title", { message: "project title is not available" });
    }

    checkProjectTitleAvailability();
  }, [projectTitle]);

  if (!userId)
    return (
      <div className="flex flex-col">
        <div className="flex gap-2 items-center w-full">
          <Bone className="w-10 h-10 rounded-md mt-4" />
          <div className="w-full flex-1 flex flex-col gap-1">
            <Bone className="w-12 h-4" />
            <Bone className="w-[244px] h-10" />
          </div>
        </div>
        <p>spaces will be replaced with "-" characters.</p>
      </div>
    );

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center">
        <div className="dark:bg-neutral-800 mt-5 p-3.5 rounded-md dark:text-neutral-300">
          {errors.title?.message && <X className="h-4 w-4 text-rose-300" />}
          {!errors.title?.message &&
            (isLoadingTitleAvailability ? (
              <Spinner />
            ) : isProjectTitleAvailable ? (
              <Check className="h-4 w-4 text-indigo-400" />
            ) : (
              <X className="h-4 w-4 text-rose-400" />
            ))}
        </div>
        <fieldset className="flex flex-col">
          <Label>Title</Label>
          <TextInput
            type="text"
            {...register("title", {
              required: { value: true, message: "area required" },
              maxLength: {
                value: 100,
                message: "title can not contain more than 100 letter(s)",
              },
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                const inputValue = e.target.value;

                setInputValue(inputValue);
              },
            })}
          />
        </fieldset>
      </div>
      <p className="dark:text-rose-400 text-sm">
        {errors.title?.message && errors.title.message}
      </p>
      <p>
        spaces will be replaced with "-" characters.{" "}
        {projectTitle.length > 0 &&
          projectTitle.includes(" ") &&
          `"${inputValue}" will be tansformd into "${inputValue.replaceAll(" ", "-")}"`}
      </p>
    </div>
  );
}
