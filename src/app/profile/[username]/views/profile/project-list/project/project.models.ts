import { Database } from "@/models/supabase";

export type TProps = {
  sessionId: string | null;
  project: Database["public"]["Tables"]["project"]["Row"];
};
