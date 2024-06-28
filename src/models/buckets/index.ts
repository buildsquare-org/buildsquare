import { createClient } from "@/utils/supabase/client";

export class BucketRouting {
  private static supabase = createClient();

  static profile(userId: string) {
    const path = `${userId}/pfp`;

    function getPublicUrl() {
      const {
        data: { publicUrl },
      } = BucketRouting.supabase.storage
        .from("images")
        .getPublicUrl(`${userId}/pfp`);
      return { publicUrl };
    }

    function getPath() {
      return path;
    }

    return { getPath, getPublicUrl };
  }
}
