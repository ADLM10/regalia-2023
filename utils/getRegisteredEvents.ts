import { Database } from "@/types/supabase";
import { supabase } from "./supabaseClient";

export async function getRegisteredEvents({
  email,
  select = `id, team_name, team_member_0, team_member_1, team_member_2, team_member_3, team_member_4, team_member_5,
  team_member_6, team_member_7, team_member_8, team_member_9, team_member_10, team_member_11, team_member_12, team_member_13, team_member_14, team_member_15,
  transaction_id, transaction_verified, registration_cancelled, events(name, poster_image, fees)`,
}: {
  email: string;
  select?: string;
}) {
  try {
    let { data, error } = await supabase
      .from("participation")
      .select(select)
      .eq("registered_by", email);

    const participationData: Database["public"]["Tables"]["participation"]["Row"][] =
      data as unknown as Database["public"]["Tables"]["participation"]["Row"][];

    return participationData;
  } catch (e) {
    console.error(e);
  }
}
