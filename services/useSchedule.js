import { useState, useEffect } from "react";

// Mock-Daten für den Stundenplan
const MOCK_SCHEDULE = [
  {
    id: 1,
    courseName: "Mathematik I",
    time: "08:00 - 09:30",
    location: "Raum A101",
    date: "2024-12-06", // Datum im ISO-Format
  },
  {
    id: 2,
    courseName: "Physik Grundlagen",
    time: "10:00 - 11:30",
    location: "Raum B202",
    date: "2024-12-06",
  },
  {
    id: 3,
    courseName: "Programmierung",
    time: "13:00 - 14:30",
    location: "Raum C303",
    date: "2024-12-07",
  },
  {
    id: 4,
    courseName: "Design Thinking",
    time: "15:00 - 16:30",
    location: "Raum D404",
    date: "2024-12-07",
  },
];

export function useSchedule(date) {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulierte Datenabfrage mit Mock-Daten
    const fetchSchedule = async () => {
      setLoading(true);

      try {
        // Simuliere eine kurze Ladezeit
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Filtere die Mock-Daten nach dem ausgewählten Datum
        const formattedDate = date.toISOString().split("T")[0];
        const filteredSchedule = MOCK_SCHEDULE.filter(
          (item) => item.date === formattedDate
        );

        setSchedule(filteredSchedule);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [date]);

  return { schedule, loading, error };
}
