import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import Markdown from "react-native-markdown-display";

const exampleText = `
# Vorteile von Solarenergie

**Nachhaltig**  
Die Nutzung verursacht keine Emissionen.

*Langfristig günstiger*  
Senkung der Stromkosten über viele Jahre.

| Vorteil     | Beschreibung                        |
|------------|-------------------------------------|
| Umweltfreundlich | Kein CO₂-Ausstoß                |
| Wirtschaftlich   | Spart Geld nach Investition     |
# Vorteile von Solarenergie

**Nachhaltig**  
Die Nutzung verursacht keine Emissionen.

*Langfristig günstiger*  
Senkung der Stromkosten über viele Jahre.

| Vorteil     | Beschreibung                        |
|------------|-------------------------------------|
| Umweltfreundlich | Kein CO₂-Ausstoß                |
| Wirtschaftlich   | Spart Geld nach Investition     |
# Vorteile von Solarenergie

**Nachhaltig**  
Die Nutzung verursacht keine Emissionen.

*Langfristig günstiger*  
Senkung der Stromkosten über viele Jahre.

| Vorteil     | Beschreibung                        |
|------------|-------------------------------------|
| Umweltfreundlich | Kein CO₂-Ausstoß                |
| Wirtschaftlich   | Spart Geld nach Investition     |
`;

const Bubble = (props) => {
    const { text, role } = props;

    if (role === "user") {
        return (
            <View style={[styles.bubbleContainer, styles.user]}>
                <Text style={styles.userText}>{text}</Text>
            </View>
        );
    }

    if (role === "loading") {
        return (
            <View style={[styles.bubbleContainer, styles.loading]}>
                <Text style={styles.userText}>{text}</Text>
            </View>
        );
    }

    return (
        <View style={[styles.markdownWrapper]}>
            <Markdown style={markdownStyles}>{text}</Markdown>
        </View>
    );

    // const bubbleStyle = { ...styles.container };
    // if (role === "user") {
    //     bubbleStyle.backgroundColor = theme.colors.primary;
    //     bubbleStyle.marginLeft = "auto";
    //     bubbleStyle.marginRight = 10;
    // } else if (role === "assistant") {
    //     bubbleStyle.backgroundColor = theme.colors.gray;
    //     bubbleStyle.marginRight = "auto";
    //     bubbleStyle.marginLeft = 10;
    // } else if (role === "loading") {
    //     bubbleStyle.backgroundColor = theme.colors.gray;
    //     bubbleStyle.marginRight = "auto";
    //     bubbleStyle.marginLeft = 10;
    //     bubbleStyle.marginTop = 0;
    // }

    // return (
    //     <View>
    //         <View style={bubbleStyle}>
    //             <Markdown style={markdownStyles}>{exampleText}</Markdown>
    //         </View>
    //     </View>
    // );
};

export default Bubble;

const styles = StyleSheet.create({
    bubbleContainer: {
        borderRadius: 20,
        padding: 12,
        marginBottom: 10,
        maxWidth: "90%",
    },
    user: {
        backgroundColor: theme.colors.primary,
        marginLeft: "auto",
        marginRight: 10,
    },
    loading: {
        backgroundColor: theme.colors.gray,
        marginRight: "auto",
        marginLeft: 10,
        marginTop: 0,
    },
    userText: {
        color: "white",
        fontSize: 16,
        lineHeight: 22,
    },
    markdownWrapper: {
        padding: 12,
        marginLeft: 10,
        marginRight: "auto",
        marginBottom: 10,
        maxWidth: "90%",
    },
});

const markdownStyles = StyleSheet.create({
    body: {
        backgroundColor: "transparent",
        color: "#1e1e1e",
        fontSize: 16,
        lineHeight: 24,
    },
    heading1: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
        color: "#111",
    },
    heading2: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 8,
        color: "#222",
    },
    heading3: {
        fontSize: 18,
        fontWeight: "600",
        marginVertical: 6,
        color: "#333",
    },
    paragraph: {
        marginVertical: 6,
    },
    list_item: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginVertical: 4,
    },
    list_item_content: {
        flex: 1,
        fontSize: 16,
        lineHeight: 24,
    },
    bullet_list_icon: {
        fontSize: 10,
        fontWeight: "900",
        marginRight: 8,
        lineHeight: 24,
    },
    ordered_list_icon: {
        fontSize: 10,
        marginRight: 8,
        lineHeight: 24,
    },
    fence: {
        backgroundColor: "#f6f8fa",
        borderRadius: 8,
        padding: 12,
        fontFamily: "Courier",
        fontSize: 14,
        color: "#333",
    },
    table: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        overflow: "hidden",
    },
    thead: {
        backgroundColor: "#f0f0f0",
    },
    th: {
        padding: 5,
        fontWeight: "bold",
        borderWidth: 1,
        borderColor: "#ddd",
        fontSize: 10,
    },
    tr: {
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    td: {
        padding: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        fontSize: 14,
    },
    hr: {
        borderBottomWidth: 1,
        borderColor: "#ddd",
        marginVertical: 10,
    },
});
