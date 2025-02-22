import {
    StyleSheet,
    Text,
    View,
    Pressable,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useAuth } from "../../../contexts/AuthContext";
import Avatar from "../../../components/Avatar";
import { StatusBar } from "expo-status-bar";
import { hp, wp } from "../../../helpers/common";
import { useRouter } from "expo-router";
import { useMeals } from "../../../services/useMeals";
import { theme, darkTheme, lightTheme } from "../../../constants/theme";
import { ThemeContext } from "../../../contexts/ThemeContext";

const Mensa = () => {
    const { user, setAuth } = useAuth();
    const router = useRouter();
    const mensaId = 150; // Mensa Uni hildesheim
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { meals, loading, error } = useMeals(mensaId, selectedDate);
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const currentTheme = isDarkMode ? darkTheme : lightTheme;
    const statusBarColor = isDarkMode ? "dark" : "light";

    // Hilfsfunktion: Generiere die nächsten 7 Tage
    const generateDates = () => {
        const today = new Date();
        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            return date;
        });
    };

    const [dates, setDates] = useState(generateDates());

    // Render-Funktion: Datumsauswahl
    const renderDateItem = (date) => {
        const isSelected = selectedDate.toDateString() === date.toDateString();
        return (
            <TouchableOpacity
                style={[styles.dateItem, isSelected && styles.selectedDateItem]}
                onPress={() => setSelectedDate(date)}
            >
                <Text
                    style={[
                        styles.dateText,
                        isSelected && styles.selectedDateText,
                    ]}
                >
                    {date.toLocaleDateString("de-DE", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                    })}
                </Text>
            </TouchableOpacity>
        );
    };

    // Render-Funktion: Gericht
    const renderMealItem = ({ item }) => (
        <View style={styles.mealItem}>
            <Text style={styles.mealName}>{item.name}</Text>
            <Text style={styles.mealCategory}>
                {item.tags.categories.map((cat) => cat.name).join(", ")}
            </Text>
            <Text style={styles.mealPrice}>
                Studierende: {item.price.student} €
            </Text>
            <Text style={styles.mealPrice}>
                Mitarbeiter: {item.price.employee} €
            </Text>
            <Text style={styles.mealPrice}>Gäste: {item.price.guest} €</Text>
        </View>
    );

    return (
        <ScreenWrapper bg={currentTheme.colors.tabBG}>
            <StatusBar style={statusBarColor} />
            <View style={styles.container}>
                {/*Title*/}
                <View style={styles.header}>
                    <Text
                        style={[
                            styles.title,
                            { color: currentTheme.colors.textLight },
                        ]}
                    >
                        Mensa
                    </Text>
                </View>
                {/* Datumsanzeige */}
                <View
                    style={[
                        styles.dateListContainer,
                        {
                            backgroundColor: currentTheme.colors.tabBG,
                            borderBottomColor: "darkgray",
                        },
                    ]}
                >
                    <FlatList
                        data={dates}
                        horizontal
                        keyExtractor={(item) => item.toISOString()}
                        renderItem={({ item }) => renderDateItem(item)}
                        contentContainerStyle={styles.dateList}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                {/* Gerichte */}
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator
                            size="large"
                            color={theme.colors.primary}
                        />
                        <Text style={{ color: currentTheme.colors.textDark }}>
                            Lade Gerichte...
                        </Text>
                    </View>
                ) : meals.length > 0 ? (
                    <FlatList
                        data={meals}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderMealItem}
                        contentContainerStyle={styles.mealList}
                    />
                ) : (
                    <View style={styles.noMealsContainer}>
                        <Text style={{ color: currentTheme.colors.textDark }}>
                            Keine Gerichte für diesen Tag verfügbar.
                        </Text>
                    </View>
                )}
            </View>
        </ScreenWrapper>
    );
};

export default Mensa;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        marginHorizontal: wp(4),
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(3.6),
        fontWeight: theme.fonts.extraBold,
    },
    dateListContainer: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "#fff",
    },
    dateList: {
        paddingHorizontal: 10,
    },
    dateItem: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        backgroundColor: theme.colors.gray,
    },
    selectedDateItem: {
        backgroundColor: theme.colors.primary,
    },
    dateText: {
        fontSize: 14,
        color: "#333",
    },
    selectedDateText: {
        color: "#fff",
        fontWeight: "bold",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    mealList: {
        padding: 10,
    },
    mealItem: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 100,
        elevation: 3,
    },
    mealName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    mealCategory: {
        fontSize: 14,
        color: "#555",
        marginTop: 5,
    },
    mealPrice: {
        fontSize: 14,
        color: "#333",
        marginTop: 5,
    },
    noMealsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
