import { supabase } from "../lib/supabase";

export const getSchedule = async (userId) => {
    const { data, error } = await supabase
        .from("profile")
        .select("schedule")
        .eq("id", userId)
        .single();

    if (error) {
        console.error("Fehler beim Laden des Stundenplans:", error);
        return null;
    }

    return data.schedule;
};
