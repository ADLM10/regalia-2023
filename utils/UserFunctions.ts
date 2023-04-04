import { Database } from "../types/supabase";
import { supabase } from "./supabaseClient";

export async function getUserProfile(id: string) {
  let { data, error } = await supabase.from("users").select("*").eq("id", id);

  if (error) {
    console.error(error);
  }

  const users: Database["public"]["Tables"]["users"]["Row"][] =
    data as Database["public"]["Tables"]["users"]["Row"][];

  return users;
}

export async function isUserDetailsEmpty() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user !== null) {
    let data = await getUserProfile(user.id);

    if (data && (data[0]["name"] === null || data[0]["college"] === null)) {
      return true;
    }
  }
  return false;
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
