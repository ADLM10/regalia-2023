import { Database } from "./../types/supabase";
import { supabase } from "./supabaseClient";

export async function getUserProfile(id: string, select: string = "*") {
  let { data, error } = await supabase
    .from("users")
    .select(select)
    .eq("id", id);

  if (error) {
    console.error(error);
  }

  const users: Database["public"]["Tables"]["users"][] =
    data as unknown as Database["public"]["Tables"]["users"][];
  return users;
}
