import React, { useState } from "react";
import {
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    SafeAreaView,
    View,
    ScrollView,
    Text,
} from "react-native";
import { theme } from "../constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");

export default function Schedule({ schedule }) {
    const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
    const shortDays = ["Mo", "Di", "Mi", "Do", "Fr"];
    const [selectedDay, setSelectedDay] = useState(0);

    // Provisorische Veranstaltungen
    const events = [
        {
            day: "Mo",
            start: "10:15",
            end: "11:45",
            title: "Seminar B: Software Engineering",
            dozent: "Prof. Dr. Schmidt",
            room: "SC.B.147",
        },
        {
            day: "Mo",
            start: "14:15",
            end: "15:45",
            title: "Wirtschaftspsychologie",
            dozent: "Dr. Hanse",
            room: "Forum H4",
        },
        {
            day: "Di",
            start: "08:30",
            end: "10:00",
            title: "Informationsmanagement",
            dozent: "Prof. Dr. Whomser-Hacker",
            room: "H2",
        },
    ];

    const longDays = {
        Mo: "Montag",
        Di: "Dienstag",
        Mi: "Mittwoch",
        Do: "Donnerstag",
        Fr: "Freitag",
    };

    const filteredEvents = schedule.filter(
        (event) => event.wochentag === longDays[shortDays[selectedDay]]
    );

    // Filtern der Events anhand des aktuell ausgewählten Tages
    // const filteredEvents = schedule.filter(
    //     (event) => event.wochentag === days[selectedDay]
    // );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* Wochentags-Picker */}
                <View style={styles.picker}>
                    <View style={styles.itemRow}>
                        {shortDays.map((shortDay, index) => (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => setSelectedDay(index)}
                            >
                                <View
                                    style={[
                                        styles.item,
                                        selectedDay === index &&
                                            styles.selectedItem,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.itemDate,
                                            selectedDay === index &&
                                                styles.selectedItemDate,
                                        ]}
                                    >
                                        {shortDay}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>
                </View>

                {/* Inhalt für den gewählten Tag */}
                <View style={styles.content}>
                    <Text style={styles.subtitle}>
                        Stundenplan für {days[selectedDay]}
                    </Text>
                    <ScrollView style={styles.eventContainer}>
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event, index) => (
                                <View key={index} style={styles.eventCard}>
                                    <Text style={styles.eventTime}>
                                        {event.startzeit} - {event.endzeit}
                                    </Text>
                                    <Text style={styles.eventTitle}>
                                        {event.name}
                                    </Text>
                                    <Text style={styles.eventDozent}>
                                        {event.dozent}
                                    </Text>
                                    <Text style={styles.eventRoom}>
                                        {event.room}
                                    </Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noEvent}>
                                Keine Veranstaltungen heute!
                            </Text>
                        )}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24,
    },
    picker: {
        maxHeight: 74,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    subtitle: {
        fontSize: 17,
        fontWeight: "600",
        color: "#999999",
        marginBottom: 12,
    },
    itemRow: {
        width: width,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
    },
    item: {
        flex: 1,
        height: 50,
        marginHorizontal: 4,
        paddingVertical: 6,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#e3e3e3",
        alignItems: "center",
        justifyContent: "center",
    },
    selectedItem: {
        backgroundColor: theme.colors.primary,
    },
    itemDate: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111",
    },
    selectedItemDate: {
        color: "#fff",
    },
    eventContainer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        backgroundColor: "transparent",
    },
    eventCard: {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    eventTime: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 4,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 4,
    },
    eventDozent: {
        fontSize: 14,
        marginBottom: 4,
    },
    eventRoom: {
        fontSize: 14,
        fontStyle: "italic",
    },
    noEvent: {
        fontSize: 16,
        color: "#999",
        textAlign: "center",
        marginTop: 200,
    },
});
