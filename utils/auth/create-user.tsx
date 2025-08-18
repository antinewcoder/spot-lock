import { createClient } from '../../supabase/client';
import { AuthError, Session, User } from '@supabase/supabase-js';

type SignUpResult = {
  data: { user: User | null; session: Session | null };
  error: AuthError | null;
};

export default async function createUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<SignUpResult> {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { firstName, lastName } },
  });


  return { data, error };
}