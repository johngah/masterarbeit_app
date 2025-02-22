import { useState, useEffect } from "react";

const API_BASE_URL = "https://sls.api.stw-on.de/v1";

export function useMainMeals(mensaId, date) {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formattedDate = date.toISOString().split("T")[0];

    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/meals`);
                const data = await response.json();
                // Filtern nach Mensa-ID und Datum
                const filteredMeals = data.meals.filter(
                    (meal) =>
                        meal.location.id === mensaId &&
                        meal.date === formattedDate &&
                        meal.lane.name !== "Beilage" &&
                        meal.lane.name !== "Dessert" &&
                        meal.lane.name !== "Gemüse" &&
                        meal.price.student != "0.00"
                );

                setMeals(filteredMeals);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, [mensaId, formattedDate]);

    return { meals, loading, error };
}

export function useMeals(mensaId, date) {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formattedDate = date.toISOString().split("T")[0];

    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/meals`);
                const data = await response.json();
                // Filtern nach Mensa-ID und Datum
                const filteredMeals = data.meals.filter(
                    (meal) =>
                        meal.location.id === mensaId &&
                        meal.date === formattedDate &&
                        meal.price.student != "0.00"
                );

                setMeals(filteredMeals);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, [mensaId, formattedDate]);

    return { meals, loading, error };
}
