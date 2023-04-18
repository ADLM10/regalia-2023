import { supabase } from "./supabaseClient";

export async function checkEmailExists(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("email", { count: "exact" })
    .eq("email", email);

  if (error) {
    throw error;
  }

  return data && data.length > 0 && data[0].email && data[0].email === email;
}
