import { useSegments } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { darkTheme, lightTheme, theme } from "../../constants/theme";
import Avatar from "../../components/Avatar";
import { useAuth } from "../../contexts/AuthContext";
import { hp, wp } from "../../helpers/common";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function TabLayout() {
    const { user, setAuth } = useAuth();
    const segments = useSegments();
    const { isDarkMode } = useContext(ThemeContext);
    const currentTheme = isDarkMode ? darkTheme : lightTheme;

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                tabBarStyle: {
                    backgroundColor: currentTheme.colors.tabBG,
                },
            }}
        >
            <Tabs.Screen
                initialRouteName="(home)"
                name="(home)"
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="(study)"
                options={{
                    title: "Studienplan",
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={22} name="list-alt" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="(mensa)"
                options={{
                    title: "Mensa",
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={22} name="cutlery" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="(profile)"
                options={{
                    title: "Profil",
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Avatar
                            uri={user?.image}
                            size={hp(3.6)}
                            rounded={theme.radius.sm}
                            style={{ borderWidth: 2 }}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
