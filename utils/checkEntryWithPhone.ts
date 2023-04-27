import { supabase } from "./supabaseClient";

export async function checkEntryWithPhone(phone: string) {
  const { data, error } = await supabase
    .from("swc")
    .select("entry,name,phone,id,email")
    .eq("phone", phone);

  if (error) {
    throw error;
  }

  return data;
}
