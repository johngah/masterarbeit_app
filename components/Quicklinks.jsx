import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";

const Quicklinks = () => {
    return (
        <View>
            <View style={styles.quickLinksContainer}>
                <TouchableOpacity style={styles.quickLinkButton}>
                    <Ionicons name="calendar-outline" size="36" color="white" />
                    <Text style={styles.quickLinkText}>Stundenplan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickLinkButton}>
                    <Ionicons
                        name="bookmarks-outline"
                        size="36"
                        color="white"
                    />
                    <Text style={styles.quickLinkText}>Noten</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickLinkButton}>
                    <Ionicons name="at" size="36" color="white" />
                    <Text style={styles.quickLinkText}>E-Mail</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.quickLinksContainer}>
                <TouchableOpacity style={styles.quickLinkButton}>
                    <Ionicons
                        name="fast-food-outline"
                        size="36"
                        color="white"
                    />
                    <Text style={styles.quickLinkText}>Mensa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickLinkButton}>
                    <Ionicons name="desktop-outline" size="36" color="white" />
                    <Text style={styles.quickLinkText}>POS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickLinkButton}>
                    <Ionicons name="book-outline" size="36" color="white" />
                    <Text style={styles.quickLinkText}>Learnweb</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Quicklinks;

const styles = StyleSheet.create({
    quickLinksContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5,
        marginBottom: 5,
    },
    quickLinkButton: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        paddingVertical: 15,
        borderRadius: 8,
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    quickLinkText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },
});
