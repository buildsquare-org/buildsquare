import { Database } from "@/models/supabase";

export type TProps = {
  userId: Database["public"]["Tables"]["user"]["Row"]["id"];
};
