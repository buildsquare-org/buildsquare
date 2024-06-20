import { createBrowserClient } from "@supabase/ssr";
import { ClientEnvironment } from "../env/client-schema";

export const createClient = () =>
  createBrowserClient(
    ClientEnvironment.NEXT_PUBLIC_SUPABASE_URL!,
    ClientEnvironment.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
