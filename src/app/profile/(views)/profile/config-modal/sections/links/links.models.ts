import { Database } from "@/models/supabase";

export type TLinksSectionFormAreas = {
  github_url: string;
  twitter_url: string;
  linkedin_url: string;
  wild_link: string;
};

export type TLinksSectionProps = {
  profile: Database["public"]["Tables"]["profile"]["Row"];
};
