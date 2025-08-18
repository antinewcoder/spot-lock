import { createClient } from '@/supabase/client';

export async function signOutUser() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut();
    if (error){
        return error.message;
    }
    return null;
  } 