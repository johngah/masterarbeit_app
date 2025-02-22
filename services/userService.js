import { supabase } from "../lib/supabase";

export const getUserData = async (userId) => {
    try {
        const { data, error } = await supabase
            .from("profile") // Die Tabelle 'profile'
            .select("*") // Wähle alle Spalten
            .eq("id", userId) // Filtere nach der User-ID
            .single(); // Erwartet nur eine Zeile

        if (error) {
            return { success: false, msg: error?.message };
        }

        return { success: true, data };
    } catch (error) {
        console.log("got error: ", error);
        return { success: false, msg: error.message };
    }
};

export const updateUser = async (userId, data) => {
    try {
        console.log("data ", data);
        const { error } = await supabase
            .from("profile")
            .update(data)
            .eq("id", userId);

        if (error) {
            return { success: false, msg: error?.message };
        }

        return { success: true, data };
    } catch (error) {
        console.log("got error: ", error);
        return { success: false, msg: error.message };
    }
};
