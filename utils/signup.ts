import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function signupWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = createBrowserSupabaseClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  });

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    // options: {
    //   data: {},
    // },
  });
  console.log(error);
}
