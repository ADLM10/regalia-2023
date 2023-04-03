import { Database } from "@/types/supabase";
import { supabase } from "./supabaseClient";

export async function getSponsorData(select: string = "*") {
  let { data, error } = await supabase.from("sponsors").select(select);
  //   console.log(error)
  //     console.log(data)
  //   if (error) {
  //     throw new Error(error.message);
  //   }

  const sponsors: Database["public"]["Tables"]["sponsors"]["Row"][] =
    data as unknown as Database["public"]["Tables"]["sponsors"]["Row"][];

  return sponsors;
}
