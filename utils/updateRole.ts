import { supabase } from "./supabaseClient";

export async function updateRole({
  email,
  role,
}: {
  email: string;
  role: string;
}) {
  const { error } = await supabase
    .from("users")
    .update({ role: role })
    .eq("email", email);

  if (error) {
    throw error;
  }
}
