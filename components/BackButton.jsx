import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import Icon from "../assets/icons";
import { theme, darkTheme, lightTheme } from "../constants/theme";
import { ThemeContext } from "../contexts/ThemeContext";

const BackButton = ({ size = 26, router, screen }) => {
    const { isDarkMode } = useContext(ThemeContext);
    const currentTheme = isDarkMode ? darkTheme : lightTheme;
    return (
        <Pressable
            onPress={() => router.back()}
            style={[
                styles.button,
                {
                    backgroundColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.14)"
                        : "rgba(0, 0, 0, 0.07)",
                },
            ]}
        >
            <Icon
                name="arrowLeft"
                strokeWidth={2.5}
                size={size}
                color={isDarkMode ? "gray" : theme.colors.text}
            />
        </Pressable>
    );
};

export default BackButton;

const styles = StyleSheet.create({
    button: {
        alignSelf: "flex-start",
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: "rgba(0,0,0,0.07)",
    },
});
