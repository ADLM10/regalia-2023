import { supabase } from "./supabaseClient";

export async function newTeamRegistration({
  team_name,
  team_members,
  event_id,
  valoId = [""],
  email,
}: {
  team_name: string;
  team_members: string[];
  event_id: number;
  valoId?: string[];
  email: string;
}) {
  const members: { [key: string]: string } = {};

  team_members.forEach((member_email, index) => {
    members[`team_member_${index}`] = member_email;
  });

  const { error } = await supabase.from("participation").insert({
    team_name: team_name,
    ...members,
    registered_by: email,
    event_id: event_id,
    valorant_id: valoId,
  });
  if (error) {
    console.error(error);
    throw error;
  }
  return null;
}

export async function newSoloRegistration({
  event_id,
  email,
}: {
  event_id: number;
  email: string;
}) {
  const { error } = await supabase.from("participation").insert({
    registered_by: email,
    event_id: event_id,
  });
  if (error) {
    console.error(error);
    return error;
  }
  return null;
}
