import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Switch,
    useColorScheme,
    Appearance,
    StatusBar,
} from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useRouter } from "expo-router";
import Header from "../../../components/Header";
import { hp, wp } from "../../../helpers/common";
import { useAuth } from "../../../contexts/AuthContext";
import Icon from "../../../assets/icons";
import { lightTheme, darkTheme, theme } from "../../../constants/theme";
import { supabase } from "../../../lib/supabase";
import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import { useState, useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

const ProfileTab = () => {
    const { user, setAuth } = useAuth();
    const router = useRouter();
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const currentTheme = isDarkMode ? darkTheme : lightTheme;
    const statusBarColor = isDarkMode ? "dark" : "dark";

    const handleLogout = async () => {
        Alert.alert(
            "Bestätigen",
            "Bist du sicher, dass du dich ausloggen möchtest?",
            [
                {
                    text: "Abbrechen",
                    onPress: () => console.log("modal cancelled"),
                    style: "cancel",
                },
                {
                    text: "Logout",
                    onPress: () => onLogout(),
                    style: "destructive",
                },
            ]
        );
    };

    const onLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            Alert.alert("Sign out", "Error signing out");
        }
    };

    return (
        <ScreenWrapper bg={currentTheme.colors.background}>
            <StatusBar style={statusBarColor} />
            <View
                style={{
                    flex: 1,
                    backgroundColor: currentTheme.colors.background,
                    paddingHorizontal: wp(7),
                }}
            >
                <View>
                    <Header title="Profil" mb={30} showBackButton={false} />
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleLogout}
                    >
                        <Icon name="logout" color={theme.colors.rose} />
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>
                    <View style={{ gap: 15 }}>
                        <View style={styles.avatarContainer}>
                            <Avatar
                                uri={user.image}
                                size={hp(12)}
                                rounded={theme.radius.xxl * 1.4}
                            />
                        </View>
                        <View style={{ alignItems: "center", gap: 4 }}>
                            <Text
                                style={[
                                    styles.userName,
                                    { color: currentTheme.colors.textDark },
                                ]}
                            >
                                {user && user.name}
                            </Text>
                            <Text style={styles.infoText}>
                                {user && user.address}
                            </Text>
                        </View>

                        <View style={{ gap: 10, paddingHorizontal: 0 }}>
                            <Text
                                style={[
                                    styles.sectionTitle,
                                    { color: currentTheme.colors.textDark },
                                ]}
                            >
                                Persönliche Informationen
                            </Text>
                            <View
                                style={[
                                    styles.section,
                                    {
                                        backgroundColor:
                                            currentTheme.colors
                                                .sectionBackground,
                                    },
                                ]}
                            >
                                <View style={styles.info}>
                                    <Text
                                        style={[
                                            styles.infoTitle,
                                            {
                                                color: currentTheme.colors
                                                    .textDark,
                                            },
                                        ]}
                                    >
                                        E-Mail:
                                    </Text>
                                    <Text
                                        style={[
                                            styles.infoText,
                                            {
                                                color: currentTheme.colors
                                                    .textDark,
                                            },
                                        ]}
                                    >
                                        {user && user.email}
                                    </Text>
                                </View>
                            </View>

                            <Text
                                style={[
                                    styles.sectionTitle,
                                    { color: currentTheme.colors.textDark },
                                ]}
                            >
                                Dein Studium
                            </Text>
                            <View
                                style={[
                                    styles.section,
                                    {
                                        backgroundColor:
                                            currentTheme.colors
                                                .sectionBackground,
                                    },
                                ]}
                            >
                                {user && user.studienvariante && (
                                    <View style={styles.info}>
                                        <Text
                                            style={[
                                                styles.infoTitle,
                                                {
                                                    color: currentTheme.colors
                                                        .textDark,
                                                },
                                            ]}
                                        >
                                            Studienvariante:
                                        </Text>
                                        <Text
                                            style={[
                                                styles.infoText,
                                                {
                                                    color: currentTheme.colors
                                                        .textDark,
                                                },
                                            ]}
                                        >
                                            {user && user.studienvariante}
                                        </Text>
                                    </View>
                                )}

                                {user && user.nebenfach_gross && (
                                    <View style={styles.info}>
                                        <Text
                                            style={[
                                                styles.infoTitle,
                                                {
                                                    color: currentTheme.colors
                                                        .textDark,
                                                },
                                            ]}
                                        >
                                            Nebenfach Groß:
                                        </Text>
                                        <Text
                                            style={[
                                                styles.infoText,
                                                {
                                                    color: currentTheme.colors
                                                        .textDark,
                                                },
                                            ]}
                                        >
                                            {user && user.nebenfach_gross}
                                        </Text>
                                    </View>
                                )}

                                {user && user.nebenfach_klein && (
                                    <View style={styles.info}>
                                        <Text
                                            style={[
                                                styles.infoTitle,
                                                {
                                                    color: currentTheme.colors
                                                        .textDark,
                                                },
                                            ]}
                                        >
                                            Nebenfach Klein:
                                        </Text>
                                        <Text
                                            style={[
                                                styles.infoText,
                                                {
                                                    color: currentTheme.colors
                                                        .textDark,
                                                },
                                            ]}
                                        >
                                            {user && user.nebenfach_klein}
                                        </Text>
                                    </View>
                                )}
                            </View>

                            <Text
                                style={[
                                    styles.sectionTitle,
                                    { color: currentTheme.colors.textDark },
                                ]}
                            >
                                App Einstellungen
                            </Text>
                            <View
                                style={[
                                    styles.section,
                                    {
                                        backgroundColor:
                                            currentTheme.colors
                                                .sectionBackground,
                                    },
                                ]}
                            >
                                <View style={styles.info}>
                                    <Text
                                        style={[
                                            styles.infoTitle,
                                            {
                                                color: currentTheme.colors
                                                    .textDark,
                                            },
                                        ]}
                                    >
                                        Dark Mode
                                    </Text>
                                    <Switch
                                        onChange={toggleTheme}
                                        value={isDarkMode}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <Button
                        title="Profil bearbeiten"
                        buttonStyle={{
                            paddingHorizontal: wp(4),
                            marginTop: hp(1),
                        }}
                        onPress={() => router.push("editProfile")}
                    />
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default ProfileTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        marginHorizontal: wp(4),
        marginBottom: 20,
    },
    headerShape: {
        width: wp(100),
        height: hp(20),
    },
    avatarContainer: {
        height: hp(12),
        width: hp(12),
        alignSelf: "center",
    },
    userName: {
        fontSize: hp(3),
        fontWeight: "500",
        //color: currentTheme.colors.textDark,
    },
    info: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    infoText: {
        fontSize: hp(1.6),
        fontWeight: "500",
        //color: currentTheme.colors.textDark,
    },
    logoutButton: {
        position: "absolute",
        right: 0,
        padding: 6,
        borderRadius: 10,
        backgroundColor: "#fee2e2",
    },
    section: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 15,
        gap: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: hp(1.6),
        fontWeight: "500",
    },
    infoTitle: {
        fontSize: hp(1.6),
        fontWeight: "500",
        //color: currentTheme.colors.textLight,
    },
});
