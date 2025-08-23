import { createClient } from '@/supabase/client';

export async function signOutUser() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut();
    if (error){
        console.log("Sign out error:", error.message);
        return error.message;
    }
    return null;
  } 