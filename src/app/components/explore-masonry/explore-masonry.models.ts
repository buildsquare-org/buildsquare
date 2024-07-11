import { Database } from "@/models/supabase";

type TColumnCountMediQueries = {
  sm: number;
  md: number;
  lg: number;
  defaultColumnCount: number;
};

export type TProps = {
  initialProjects: Database["public"]["Tables"]["project"]["Row"][];
  columnCountMediaQueries: TColumnCountMediQueries;
};
