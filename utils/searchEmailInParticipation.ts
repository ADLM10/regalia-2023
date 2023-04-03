import { Database } from "@/types/supabase";
import { supabase } from "./supabaseClient";

export async function searchEmailInParticipation(email: string) {
  if (email === "") {
    throw "email fetching error in getUser()";
  }

  const data = await supabase.rpc("search_email", {
    email: email,
  });

  const participationData: Database["public"]["Tables"]["participation"]["Row"][] =
    data.data as unknown as Database["public"]["Tables"]["participation"]["Row"][];

  return participationData;
}
