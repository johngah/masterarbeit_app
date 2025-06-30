import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
    TouchableOpacity,
    Modal,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../contexts/AuthContext";
import { StatusBar } from "expo-status-bar";
import { hp, wp } from "../../../helpers/common";
import { theme, lightTheme, darkTheme } from "../../../constants/theme";
import Icon from "../../../assets/icons";
import { useRouter } from "expo-router";
import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Schedule from "../../../components/Schedule";
import { getSchedule } from "../../../utils/scheduleUtils";
import { Ionicons } from "@expo/vector-icons";

const Planner = () => {
    const { user, setAuth } = useAuth();
    const router = useRouter();
    const [schedule, setSchedule] = useState([]);
    const [hasData, setData] = useState(false);
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const currentTheme = isDarkMode ? darkTheme : lightTheme;
    const statusBarColor = isDarkMode ? "dark" : "light";
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        const fetchSchedule = async () => {
            if (user) {
                const scheduleData = await getSchedule(user.id);
                if (scheduleData) {
                    setSchedule(scheduleData.stundenplan);
                    setData(true);
                } else {
                    setData(false);
                }
            } else {
                setData(false);
            }
        };

        fetchSchedule();
    }, [user]);

    const renderHeaderRight = () => (
        <TouchableOpacity
            onPress={() => setMenuVisible(true)}
            style={styles.headerButton}
        >
            <Ionicons
                name="ellipsis-horizontal-circle"
                size={28}
                color={isDarkMode ? "white" : "black"}
            />
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper bg={currentTheme.colors.background}>
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
                        Studienplan
                    </Text>
                    {renderHeaderRight()}
                </View>
                <View style={styles.container3}>
                    {!hasData ? (
                        <View style={styles.container2}>
                            <Image
                                style={styles.welcomeImage}
                                resizeMode="contain"
                                source={require("../../../assets/images/welcome.png")}
                            />
                            <Text
                                style={[
                                    styles.title2,
                                    { color: currentTheme.colors.textDark },
                                ]}
                            >
                                Du hast noch keinen Studienplan
                            </Text>
                            <View style={{ gap: 20 }}>
                                <Text
                                    style={[
                                        styles.punchline,
                                        { color: currentTheme.colors.textDark },
                                    ]}
                                >
                                    Lass dir mit deinem persönlichen virtuellen
                                    Assistenten das perfekte Semester erstellen.
                                </Text>
                            </View>
                            <View style={styles.footer}>
                                <Button
                                    title="Jetzt KI-Assistenten verwenden!"
                                    buttonStyle={{ marginHorizontal: wp(3) }}
                                    textStyle={{ fontSize: hp(2) }}
                                    onPress={() => router.push("chat")}
                                />
                            </View>
                        </View>
                    ) : (
                        <Schedule schedule={schedule} />
                    )}
                </View>
                {/* Modal für das Menü */}
                <Modal
                    presentationStyle="overFullScreen"
                    visible={menuVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setMenuVisible(false)}
                >
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        onPress={() => setMenuVisible(false)}
                        activeOpacity={1}
                    >
                        <View style={styles.menuContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    setMenuVisible(false);
                                }}
                            >
                                <Text style={styles.menuItem}>
                                    Stundenplan löschen
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setMenuVisible(false);
                                    router.navigate("chat");
                                }}
                            >
                                <Text style={styles.menuItem}>
                                    Zum KI-Assistenten
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
                <View></View>
            </View>
        </ScreenWrapper>
    );
};

const noData = () => {};

export default Planner;

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
    title2: {
        color: theme.colors.text,
        fontSize: hp(2.5),
        fontWeight: theme.fonts.bold,
    },
    container3: {
        flex: 1,
    },
    container2: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        //backgroundColor: "white",
        paddingHorizontal: wp(4),
    },
    welcomeImage: {
        height: hp(30),
        width: wp(100),
        alignSelf: "center",
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(3.6),
        textAlign: "center",
        fontWeight: theme.fonts.extraBold,
    },
    punchline: {
        textAlign: "center",
        paddingHorizontal: wp(10),
        fontSize: hp(1.9),
        color: theme.colors.text,
    },
    footer: {
        gap: 30,
        width: "100%",
    },
    bottomTextContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },
    loginText: {
        textAlign: "center",
        color: theme.colors.text,
        fontSize: hp(1.6),
    },
    picker: {
        flex: 1,
        maxHeight: 74,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
    },
    item: {
        flex: 1,
        height: 50,
        width: 47,
        marginHorizontal: 0,
        paddingVertical: 6,
        paddingHorizontal: 0,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#e3e3e3",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    itemRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
    },
    itemDate: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    menuContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        width: "80%",
        alignItems: "center",
    },
    menuItem: {
        fontSize: 18,
        paddingVertical: 12,
    },
});
