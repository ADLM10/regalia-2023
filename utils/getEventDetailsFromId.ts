import { Database } from "@/types/supabase";
import { supabase } from "./supabaseClient";

export async function getEventDetailsFromId({
  select,
  event_id,
  category,
}: {
  select: string;
  event_id?: number;
  category?: string;
}) {
  try {
    let data;

    if (event_id && category === undefined) {
      data = await supabase.from("events").select(select).eq("id", event_id);
    } else {
      data = await supabase
        .from("events")
        .select(select)
        .eq("category", category);
    }

    const events: Database["public"]["Tables"]["events"]["Row"][] =
      data.data as unknown as Database["public"]["Tables"]["events"]["Row"][];

    return events;
  } catch (e) {
    console.error(e);
  }
}
