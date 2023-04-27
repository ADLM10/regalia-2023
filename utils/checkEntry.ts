import { supabase } from "./supabaseClient";

export async function checkEntry(email: string) {
  const { data, error } = await supabase
    .from("swc")
    .select("entry,name,phone,id,email")
    .eq("email", email);

  if (error) {
    throw error;
  }

  return data;
}
