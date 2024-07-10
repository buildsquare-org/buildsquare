import { Database } from "@/models/supabase";

export type TProps = {
  project: Database["public"]["Tables"]["project"]["Row"];
};
