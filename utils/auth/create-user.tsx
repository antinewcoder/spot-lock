import createClient from '../../supabase/client';

type SignUpResult = {
  data: any;
  error: any;
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
    options: {
      data: 
        { firstName, lastName } 
    },
  });

  return { data, error };
}