import { Database } from "@/types/supabase";
import { supabase } from "@/utils/supabaseClient";

export async function getEvents(select: string = "*") {
  let { data, error } = await supabase.from("events").select(select);

  if (error) {
    throw new Error(error.message);
  }

  const events: Database["public"]["Tables"]["events"]["Row"][] =
    data as unknown as Database["public"]["Tables"]["events"]["Row"][];

  return events;
}
