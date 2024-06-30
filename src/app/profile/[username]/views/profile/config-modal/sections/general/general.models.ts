import { Database } from "@/models/supabase";

export type TGeneralSectionFormAreas = {
  name: string;
  description: string;
  picture: File[];
};

export type TGeneralSectionProps = {
  profile: Database["public"]["Tables"]["profile"]["Row"];
};
