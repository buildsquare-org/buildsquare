import { ClientRouting } from "@/models/routing/client.routing";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(ClientRouting.auth().signIn);
  }

  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", user.id)
    .single();

  redirect(ClientRouting.profile().getbyUsername(profile?.username ?? ""));
}
