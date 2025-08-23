import { createClient } from '../../supabase/client';

export async function signInWithOAuth() {
    const supabase = createClient();
    const redirect = typeof window !== 'undefined' ? 
        window.location.origin : 
        process.env.NEXTAUTH_URL;
    
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${redirect}/passwords`,
          }
    })
    if (error) {
        return error.message;
    }
    //redirects to the OAuth provider
    if (data?.url){
        window.location.href = data.url;
    }
}