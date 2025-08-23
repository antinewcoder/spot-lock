import { createClient } from "@/supabase/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function userLogin(
  email: string,
  password: string,
  router: AppRouterInstance
) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("Login error:", error.message);
    return { error: error.message };
  }
  router.push("/passwords"); 
  return { error: null };
}
