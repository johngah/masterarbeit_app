import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../constants/theme";

const Bubble = (props) => {
    const { text, role } = props;

    const bubbleStyle = { ...styles.container };
    if (role === "user") {
        bubbleStyle.backgroundColor = theme.colors.primary;
        bubbleStyle.marginLeft = "auto";
        bubbleStyle.marginRight = 10;
    } else if (role === "assistant") {
        bubbleStyle.backgroundColor = theme.colors.gray;
        bubbleStyle.marginRight = "auto";
        bubbleStyle.marginLeft = 10;
    } else if (role === "loading") {
        bubbleStyle.backgroundColor = theme.colors.gray;
        bubbleStyle.marginRight = "auto";
        bubbleStyle.marginLeft = 10;
        bubbleStyle.marginTop = 0;
    }

    return (
        <View>
            <View style={bubbleStyle}>
                <Text>{text}</Text>
            </View>
        </View>
    );
};

export default Bubble;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary,
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 12,
        marginBottom: 10,
        maxWidth: "90%",
    },
    wrapperStyle: {
        flexDirection: "row",
        justifyContent: "center",
    },
});
