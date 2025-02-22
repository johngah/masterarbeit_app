import React, { createContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Lade die gespeicherte Einstellung oder setze die Systemeinstellung
    useEffect(() => {
        const loadThemePreference = async () => {
            try {
                const storedPreference = await AsyncStorage.getItem("darkMode");
                if (storedPreference !== null) {
                    setIsDarkMode(storedPreference === "true");
                } else {
                    const systemColorScheme = Appearance.getColorScheme();
                    setIsDarkMode(systemColorScheme === "dark");
                }
            } catch (error) {
                console.error("Fehler beim Laden der Theme-Präferenz:", error);
            }
        };
        loadThemePreference();
    }, []);

    const toggleTheme = async () => {
        try {
            const newTheme = !isDarkMode;
            setIsDarkMode(newTheme);
            await AsyncStorage.setItem("darkMode", newTheme.toString());
        } catch (error) {
            console.error("Fehler beim Speichern der Theme-Präferenz:", error);
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
