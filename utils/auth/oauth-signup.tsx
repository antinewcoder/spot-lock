import { createClient } from '../../supabase/client';

export async function signInWithOAuth() {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
    })
    if (error) {
        return { error: error.message }
    }
    //redirects to the OAuth provider
    if (data?.url){
        window.location.href = data.url;
    }
}