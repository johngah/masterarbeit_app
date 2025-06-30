import React, {
    useState,
    useCallback,
    useEffect,
    useContext,
    useRef,
} from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    FlatList,
} from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import { hp, wp } from "../../../helpers/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { theme, darkTheme, lightTheme } from "../../../constants/theme";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Dropdown } from "react-native-element-dropdown";
import { useAuth } from "../../../contexts/AuthContext";
import {
    varianten,
    nebenGroß,
    nebenKlein,
    semester,
} from "../../../constants/studyData";
import { generateTimetable, getChatGptResponse } from "../../../utils/gptUtils";
import {
    addUserMessage,
    getConversation,
    resetConversation,
} from "../../../utils/conversationHistoryUtil";
import Bubble from "../../../components/Bubble";
import LoadingDots from "../../../components/LoadingDots";

const Chat = () => {
    const { user, setAuth } = useAuth();
    const insets = useSafeAreaInsets();
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const currentTheme = isDarkMode ? darkTheme : lightTheme;
    const statusBarColor = isDarkMode ? "dark" : "light";
    const [menuVisible, setMenuVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);

    // Zustände für Chat-Nachrichten und Einstellungen
    const [messageText, setMessageText] = useState("");
    const [conversation, setConversation] = useState([]);
    const flatlist = useRef(null);
    const [previousContentHeight, setPreviousContentHeight] = useState(0);
    const [varianteState, setVariante] = useState(user?.studienvariante || "");
    const [nebenfachGroßState, setNebenfachGroß] = useState(
        user?.nebenfach_gross || ""
    );
    const [nebenfachKleinState, setNebenfachKlein] = useState(
        user?.nebenfach_klein || ""
    );
    const [semesterState, setSemester] = useState(1);

    useEffect(() => {
        setConversation(getConversation());
    }, []);

    useEffect(() => {
        if (conversation.length > 0) {
            setTimeout(() => {
                //flatlist.current?.scrollToEnd({ animated: false });
            }, 100);
        }
    }, [conversation]);

    const sendMessage = useCallback(async () => {
        try {
            setLoading(true);
            addUserMessage(messageText);
            setMessageText("");
            setConversation([...getConversation()]);
            await getChatGptResponse();
        } catch (error) {
            console.log("Fehler beim Senden der Nachricht:", error);
        } finally {
            setConversation([...getConversation()]);
            setLoading(false);
        }
    }, [messageText]);

    const generate = useCallback(async () => {
        try {
            setLoading(true);
            setMessageText("");
            await generateTimetable(user.id);
        } catch (error) {
            console.log("Fehler beim Senden der Nachricht:", error);
        } finally {
            setLoading(false);
        }
    }, [messageText]);

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
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset={0}
        >
            <ScreenWrapper bg={currentTheme.colors.background}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: currentTheme.colors.background,
                    }}
                >
                    {/* Header */}
                    <View style={{ paddingHorizontal: wp(4) }}>
                        <Header
                            title="KI-Assistent"
                            renderRight={renderHeaderRight}
                        />
                    </View>

                    {/* Dropdowns */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            paddingTop: hp(1),
                            paddingBottom: hp(0.5),
                            borderBottomStartRadius: 10,
                            borderBottomEndRadius: 10,
                            boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)",
                        }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={[
                                    styles.labelText,
                                    {
                                        color: isDarkMode
                                            ? "whitesmoke"
                                            : "black",
                                    },
                                ]}
                            >
                                Variante
                            </Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholder}
                                selectedTextStyle={[
                                    styles.selectText,
                                    { color: isDarkMode ? "white" : "black" },
                                ]}
                                containerStyle={{
                                    width: 100,
                                    borderRadius: 10,
                                }}
                                data={varianten}
                                labelField="label"
                                valueField="value"
                                placeholder="Studienvariante"
                                value={varianteState}
                                onChange={(item) => {
                                    if (varianteState !== item.value) {
                                        setVariante(item.value);
                                    }
                                }}
                            />
                        </View>

                        <View
                            style={{
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={[
                                    styles.labelText,
                                    {
                                        color: isDarkMode
                                            ? "whitesmoke"
                                            : "black",
                                    },
                                ]}
                            >
                                NF groß
                            </Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholder}
                                selectedTextStyle={[
                                    styles.selectText,
                                    { color: isDarkMode ? "white" : "black" },
                                ]}
                                containerStyle={{
                                    width: 250,
                                    borderRadius: 10,
                                }}
                                data={nebenGroß}
                                labelField="label"
                                valueField="value"
                                placeholder="Studienvariante"
                                value={nebenfachGroßState}
                                onChange={(item) => {
                                    if (nebenfachGroßState !== item.value) {
                                        setNebenfachGroß(item.value);
                                    }
                                }}
                            />
                        </View>

                        <View
                            style={{
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={[
                                    styles.labelText,
                                    {
                                        color: isDarkMode
                                            ? "whitesmoke"
                                            : "black",
                                    },
                                ]}
                            >
                                NF klein
                            </Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholder}
                                selectedTextStyle={[
                                    styles.selectText,
                                    { color: isDarkMode ? "white" : "black" },
                                ]}
                                containerStyle={{
                                    width: 200,
                                    borderRadius: 10,
                                }}
                                data={nebenKlein}
                                labelField="label"
                                valueField="value"
                                placeholder="Studienvariante"
                                value={nebenfachKleinState}
                                onChange={(item) => {
                                    if (nebenfachKleinState !== item.value) {
                                        setNebenfachKlein(item.value);
                                    }
                                }}
                            />
                        </View>

                        <View
                            style={{
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={[
                                    styles.labelText,
                                    {
                                        color: isDarkMode
                                            ? "whitesmoke"
                                            : "black",
                                    },
                                ]}
                            >
                                Semester
                            </Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholder}
                                selectedTextStyle={[
                                    styles.selectText,
                                    { color: isDarkMode ? "white" : "black" },
                                ]}
                                data={semester}
                                labelField="label"
                                valueField="value"
                                placeholder="Studienvariante"
                                value={semesterState}
                                onChange={(item) => {
                                    if (semesterState !== item.value) {
                                        setSemester(item.value);
                                    }
                                }}
                            />
                        </View>
                    </View>

                    {/* Chat-Bereich */}
                    <View style={styles.messagesContainer}>
                        <FlatList
                            data={conversation}
                            ref={(ref) => (flatlist.current = ref)}
                            onContentSizeChange={(w, h) => {
                                const scrollOffset = previousContentHeight
                                    ? h - previousContentHeight > 200
                                        ? h - 300 // nur ein Stück nach unten scrollen
                                        : h
                                    : h;

                                flatlist.current?.scrollToOffset({
                                    offset: scrollOffset,
                                    animated: true,
                                });
                                setPreviousContentHeight(h);
                            }}
                            renderItem={(itemData) => {
                                const convoItem = itemData.item;

                                return (
                                    <Bubble
                                        text={convoItem.content[0].text}
                                        role={convoItem.role}
                                    />
                                );
                            }}
                            ListFooterComponent={
                                isLoading ? (
                                    <Bubble
                                        text={<LoadingDots />}
                                        role="loading"
                                    />
                                ) : null
                            }
                        />
                    </View>

                    {/* Input */}
                    <View
                        style={[
                            styles.inputContainer,
                            { backgroundColor: currentTheme.colors.input },
                        ]}
                    >
                        <TextInput
                            style={[
                                styles.textbox,
                                { color: currentTheme.colors.text },
                            ]}
                            placeholder="Schreibe eine Nachricht..."
                            placeholderTextColor="gray"
                            onChangeText={(text) => setMessageText(text)}
                            value={messageText}
                            multiline
                            keyboardAppearance={isDarkMode ? "dark" : "light"}
                        />
                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={sendMessage}
                            disabled={!messageText}
                        >
                            <MaterialCommunityIcon
                                name="send-circle"
                                size={40}
                                color={
                                    !messageText
                                        ? isDarkMode
                                            ? "gray"
                                            : "lightgray"
                                        : theme.colors.primaryDark
                                }
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={generate}
                            disabled={!messageText}
                        >
                            <MaterialCommunityIcon
                                name="send-circle"
                                size={40}
                                color={
                                    !messageText
                                        ? isDarkMode
                                            ? "gray"
                                            : "lightgray"
                                        : theme.colors.primaryDark
                                }
                            />
                        </TouchableOpacity>
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
                                        setConversation([]);
                                        resetConversation();
                                        setMenuVisible(false);
                                    }}
                                >
                                    <Text style={styles.menuItem}>
                                        Chat löschen
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
            </ScreenWrapper>
        </KeyboardAvoidingView>
    );
};

export default Chat;

const styles = StyleSheet.create({
    dropdown: {
        flexDirection: "row",
        height: hp(4.5),
        width: 80,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.4,
        borderColor: theme.colors.text,
        borderRadius: theme.radius.xxl,
        borderCurve: "continuous",
        paddingHorizontal: 4,
        gap: 12,
    },
    placeholder: {
        color: theme.colors.textLight,
        fontSize: 14,
        paddingLeft: 13,
    },
    selectText: {
        fontSize: 12,
        paddingLeft: 13,
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
    labelText: { fontSize: 12, fontWeight: 300, marginBottom: 5 },
    inputContainer: {
        flexDirection: "row",
        boxShadow: "0 -10px 20px -5px rgba(0,0,0,0.1)",
        borderTopLeftRadius: 10,
        borderTopEndRadius: 10,
        width: "100% !important",
        height: 60,
        paddingHorizontal: 15,
        paddingVertical: 5,
        alignItems: "center",
    },
    sendButton: {
        borderRadius: 100,
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
    },
    textbox: {
        flex: 1,
    },
    messagesContainer: {
        flex: 1,
    },
});
