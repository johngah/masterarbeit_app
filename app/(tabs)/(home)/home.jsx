import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React, { useContext } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useAuth } from "../../../contexts/AuthContext";
import { StatusBar } from "expo-status-bar";
import { hp, wp } from "../../../helpers/common";
import { useRouter, Link } from "expo-router";
import { useSchedule } from "../../../services/useSchedule";
import { useMainMeals } from "../../../services/useMeals";
import Avatar from "../../../components/Avatar";
import TerminListItem from "../../../components/TerminListItem";
import { veranstaltungen } from "../../../services/mockData";
import Quicklinks from "../../../components/Quicklinks";
import { theme, darkTheme, lightTheme } from "../../../constants/theme";
import { ThemeContext } from "../../../contexts/ThemeContext";

const Home = () => {
    const { user, setAuth } = useAuth();
    const router = useRouter();
    const today = new Date();
    const mensaId = 150;
    const { meals, loadingMeals, errorMeals } = useMainMeals(mensaId, today);
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const currentTheme = isDarkMode ? darkTheme : lightTheme;
    const statusBarColor = isDarkMode ? "dark" : "light";
    const { todaysEvents, loading } = useSchedule(user.id);

    return (
        <ScreenWrapper bg={currentTheme.colors.background}>
            <StatusBar style={statusBarColor} />
            <ScrollView style={styles.container}>
                {/*Title*/}
                <View style={styles.header}>
                    <Text
                        style={[
                            styles.title,
                            { color: currentTheme.colors.textLight },
                        ]}
                    >
                        Home
                    </Text>
                </View>

                {/*User*/}
                <View style={styles.userSection}>
                    <Avatar rounded={50} size={42} />
                    <View style={styles.userInfo}>
                        <Text
                            style={[
                                styles.userGreeting,
                                { color: currentTheme.colors.textLight },
                            ]}
                        >
                            Hey ✌🏼
                        </Text>
                        <Text
                            style={[
                                styles.userName,
                                { color: currentTheme.colors.textLight },
                            ]}
                        >
                            {user ? user.name : "Gast"}
                        </Text>
                    </View>
                </View>

                {/*Termine*/}
                <View style={styles.termine}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                        }}
                    >
                        <Text
                            style={[
                                styles.sectionTitle,
                                { color: currentTheme.colors.textLight },
                            ]}
                        >
                            Deine heutigen Termine
                        </Text>
                        <Link
                            href={"/planner"}
                            style={[
                                styles.sectionBtn,
                                { color: currentTheme.colors.textLight },
                            ]}
                        >
                            Alle anzeigen
                        </Link>
                    </View>
                    <View
                        style={[
                            styles.terminContainer,
                            {
                                backgroundColor:
                                    currentTheme.colors.sectionBackground,
                            },
                        ]}
                    >
                        {todaysEvents.length > 0 ? (
                            todaysEvents.map((item) => {
                                return (
                                    <TerminListItem
                                        key={item.name}
                                        name={item.name}
                                        zeit={item.startzeit}
                                    />
                                );
                            })
                        ) : (
                            <Text
                                style={{
                                    alignSelf: "center",
                                    padding: 30,
                                    fontWeight: "500",
                                }}
                            >
                                Du hast heute frei!
                            </Text>
                        )}
                    </View>
                </View>

                {/*Quicklinks*/}
                <View>
                    <Text
                        style={[
                            styles.sectionTitle,
                            { color: currentTheme.colors.textLight },
                        ]}
                    >
                        Quicklinks
                    </Text>
                    <Quicklinks />
                </View>

                {/*Mensa*/}
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                        }}
                    >
                        <Text
                            style={[
                                styles.sectionTitle,
                                { color: currentTheme.colors.textLight },
                            ]}
                        >
                            Mensa
                        </Text>
                        <Link
                            href={"/mensa"}
                            style={[
                                styles.sectionBtn,
                                { color: currentTheme.colors.textLight },
                            ]}
                        >
                            Alle anzeigen
                        </Link>
                    </View>
                    <View
                        style={[
                            styles.terminContainer,
                            {
                                backgroundColor:
                                    currentTheme.colors.sectionBackground,
                            },
                        ]}
                    >
                        {loadingMeals ? (
                            <ActivityIndicator size="small" color="black" />
                        ) : errorMeals ? (
                            <Text
                                style={{ color: currentTheme.colors.textDark }}
                            >
                                Fehler beim Laden der Gerichte
                            </Text>
                        ) : meals.length > 0 ? (
                            meals.map((meal) => (
                                <View
                                    key={meal.id}
                                    style={[
                                        styles.mealItem,
                                        {
                                            backgroundColor:
                                                currentTheme.colors.background,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.mealTitle,
                                            {
                                                color: currentTheme.colors
                                                    .textDark,
                                            },
                                        ]}
                                    >
                                        {meal.name}
                                    </Text>
                                </View>
                            ))
                        ) : (
                            <Text
                                style={{ color: currentTheme.colors.textDark }}
                            >
                                Keine Gerichte für heute verfügbar
                            </Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: wp(4),
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        //marginHorizontal: wp(4)
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(3.6),
        fontWeight: theme.fonts.extraBold,
    },
    userSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 10,
    },
    userGreeting: {
        color: theme.colors.textLight,
        fontWeight: theme.fonts.medium,
    },
    userName: {
        color: theme.colors.dark,
        fontWeight: theme.fonts.bold,
        fontSize: 18,
    },
    terminContainer: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 6,
        gap: 4,
    },
    section: {
        marginBottom: 16,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "500",
        marginBottom: 6,
        marginTop: 15,
    },
    sectionBtn: {
        fontSize: 12,
        fontWeight: "400",
        marginTop: 15,
        marginBottom: 6,
    },
    scheduleItem: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: "whitesmoke",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 2,
    },
    courseName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    courseDetails: {
        fontSize: 14,
        color: "#666",
    },
    mealItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "whitesmoke",
        borderRadius: 4,
        padding: 10,
    },
    mealTitle: {
        fontSize: hp(1.6),
        fontWeight: "600",
        paddingBottom: 2,
    },
});
