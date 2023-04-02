import { supabase } from "@/utils/supabaseClient";
export async function getEvents(select: string = "*") {
  let { data, error } = await supabase.from("events").select(select);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
