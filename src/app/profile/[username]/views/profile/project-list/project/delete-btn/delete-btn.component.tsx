"use client";

import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Tprops } from "./delete-btn.models";

export function DeleteProjectBtn({ project }: Tprops) {
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  async function deleteProject(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    const supabase = createClient();

    try {
      setLoading(true);

      const { error } = await supabase
        .from("project")
        .delete()
        .eq("id", project.id);

      if (error) throw new Error("error deleting project row");
      if (project.cover_image_url) {
        const oldImagePaths = project.cover_image_url.split("/");

        const oldImagePath1 = oldImagePaths[oldImagePaths.length - 2];
        const oldImagePath2 = oldImagePaths[oldImagePaths.length - 1];

        if (!oldImagePath2 || !oldImagePath1)
          throw new Error("could not get paths for image");

        const finalImagePath = `${oldImagePath1}/${oldImagePath2}`;

        const { error } = await supabase.storage
          .from("images")
          .remove([finalImagePath]);

        if (error) throw new Error("error removing project image");
      }
      router.refresh();
    } catch (error) {
      console.log({ error });
      //
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={deleteProject}
      disabled={isLoading}
      isLoading={isLoading}
      variant="ghost"
      className="text-neutral-200 hover:bg-neutral-700 w-full flex items-center justify-start h-auto"
    >
      <Trash className="w-4 h-4" /> Delete
    </Button>
  );
}
