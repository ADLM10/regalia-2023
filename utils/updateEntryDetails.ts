import { supabase } from "./supabaseClient";

export async function updateEntryDetails(entry_id: string, entryStatus: any) {
  console.log(entry_id, entryStatus);
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
