import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useRouter } from "expo-router";
import BackButton from "./BackButton";
import { hp, wp } from "../helpers/common";
import { theme, darkTheme, lightTheme } from "../constants/theme";
import { ThemeContext } from "../contexts/ThemeContext";

const Header = ({
    title,
    renderRight,
    showBackButton = true,
    mb = 10,
    ph = 10,
}) => {
    const router = useRouter();
    const { isDarkMode } = useContext(ThemeContext);
    const currentTheme = isDarkMode ? darkTheme : lightTheme;

    return (
        <View
            style={[
                styles.container,
                { marginBottom: mb, paddingHorizontal: ph },
            ]}
        >
            {showBackButton && (
                <View style={styles.backButton}>
                    <BackButton router={router} />
                </View>
            )}
            <Text
                style={[styles.title, { color: currentTheme.colors.textDark }]}
            >
                {title || ""}
            </Text>
            <View style={styles.right}>{renderRight && renderRight()}</View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        gap: 10,
    },
    title: {
        fontSize: hp(2.7),
        fontWeight: theme.fonts.semibold,
        color: theme.colors.textDark,
    },
    backButton: {
        position: "absolute",
        left: 0,
    },
    right: {
        position: "absolute",
        right: 0,
    },
});
