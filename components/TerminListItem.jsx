import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { hp, wp } from "../helpers/common";
import { theme, darkTheme, lightTheme } from "../constants/theme";
import { ThemeContext } from "../contexts/ThemeContext";

const TerminListItem = ({ name, dozent, zeit, raum }) => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const currentTheme = isDarkMode ? darkTheme : lightTheme;

    return (
        <View
            style={[
                styles.terminItem,
                { backgroundColor: currentTheme.colors.background },
            ]}
        >
            <View>
                <Text
                    style={[
                        styles.terminTitle,
                        { color: currentTheme.colors.textDark },
                    ]}
                >
                    {name}
                </Text>
                {/* <Text
                    style={[
                        styles.terminDozent,
                        { color: currentTheme.colors.textDark },
                    ]}
                >
                    {dozent}
                </Text> */}
            </View>
            <View>
                <Text
                    style={[
                        styles.terminTime,
                        { color: currentTheme.colors.textDark },
                    ]}
                >
                    {zeit} Uhr
                </Text>
                {/* <Text
                    style={[
                        styles.terminRaum,
                        { color: currentTheme.colors.textDark },
                    ]}
                >
                    {raum}
                </Text> */}
            </View>
        </View>
    );
};

export default TerminListItem;

const styles = StyleSheet.create({
    terminItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 4,
        padding: 10,
    },
    terminTitle: {
        fontSize: hp(1.6),
        fontWeight: "600",
        paddingBottom: 2,
    },
    terminDozent: {
        fontSize: hp(1.4),
        fontWeight: "400",
    },
    terminTime: {
        fontSize: hp(1.6),
        fontWeight: "600",
        textAlign: "right",
        paddingBottom: 2,
    },
    terminRaum: {
        fontSize: hp(1.4),
        fontWeight: "400",
        textAlign: "right",
    },
});
