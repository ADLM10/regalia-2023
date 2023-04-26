import { supabase } from "./supabaseClient";

export async function newEntrySwc({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone: string;
}) {
  const { error } = await supabase.from("swc").insert({
    name: name,
    email: email,
    phone: phone,
  });

  if (error) {
    console.error(error);
    return error;
  }
}
