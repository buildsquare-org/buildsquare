import { Database } from "@/models/supabase";

export type TProps = {
  profile: Database["public"]["Tables"]["profile"]["Row"];
  className?: Element["className"];
};
