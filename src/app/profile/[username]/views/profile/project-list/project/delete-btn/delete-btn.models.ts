import { Database } from "@/models/supabase";

export type Tprops = {
  project: Database["public"]["Tables"]["project"]["Row"];
};
