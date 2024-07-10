import { Database } from "@/models/supabase";

export type TProps = {
  initialProjects: Database["public"]["Tables"]["project"]["Row"][];
};
