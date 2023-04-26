import { supabase } from "./supabaseClient";

export async function updateEntryDetails(entry_id: string, entryStatus: any) {
  const { data, error } = await supabase
    .from("swc")
    .update({
      entry: entryStatus,
    })
    .eq("id", entry_id)
    .select("entry");

  if (error) {
    throw error;
  }

  return data;
}
