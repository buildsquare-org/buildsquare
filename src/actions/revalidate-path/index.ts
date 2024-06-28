"use server";

import { revalidatePath } from "next/cache";

export async function RevalidatePathAction(
  path: string,
  type: "page" | "layout",
) {
  revalidatePath(path, type);
}
