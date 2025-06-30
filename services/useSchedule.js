import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function getTodayName() {
    const days = [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
    ];
    const todayIndex = new Date().getDay();
    return days[todayIndex];
}

function sortEventsByStartTime(events) {
    return [...events].sort((a, b) => a.startzeit.localeCompare(b.startzeit));
}

export function useSchedule(userId) {
    const [allEvents, setAllEvents] = useState([]);
    const [todaysEvents, setTodaysEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSchedule() {
            setLoading(true);
            const { data, error } = await supabase
                .from("profile")
                .select("schedule")
                .eq("id", userId)
                .single();

            if (error) {
                console.error(error);
                setError("Fehler beim Laden des Stundenplans");
                setLoading(false);
                return;
            }

            const schedule = data?.schedule?.stundenplan || [];
            const todayName = getTodayName();
            const today = schedule.filter(
                (item) => item.wochentag === todayName
            );

            setAllEvents(sortEventsByStartTime(schedule));
            setTodaysEvents(sortEventsByStartTime(today));
            setLoading(false);
        }

        fetchSchedule();
    }, [userId]);

    return {
        allEvents,
        todaysEvents,
        loading,
        error,
    };
}
