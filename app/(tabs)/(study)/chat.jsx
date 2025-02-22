import React, { useState, useCallback, useEffect, useContext } from "react";
import { Text, View } from "react-native";
//import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import { hp, wp } from "../../../helpers/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { theme, darkTheme, lightTheme } from "../../../constants/theme";
import { ThemeContext } from "../../../contexts/ThemeContext";

const Chat = () => {
    const insets = useSafeAreaInsets();
    const [messages, setMessages] = useState([]);
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const currentTheme = isDarkMode ? darkTheme : lightTheme;
    const statusBarColor = isDarkMode ? "dark" : "light";

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hello developer",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any",
                },
            },
        ]);
    }, []);

    // const onSend = useCallback((messages = []) => {
    //     setMessages((previousMessages) =>
    //         GiftedChat.append(previousMessages, messages)
    //     );
    // }, []);

    return (
        <ScreenWrapper bg={currentTheme.colors.sectionBackground}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    paddingHorizontal: wp(4),
                    marginBottom: insets.bottom,
                }}
            >
                <Header title="KI-Assistent" />

                {/* <GiftedChat
                    messages={messages}
                    onSend={(messages) => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                    placeholder="Schreibe eine Nachricht..."
                    renderAvatar={null}
                    alwaysShowSend={true}
                    renderBubble={(props) => {
                        return (
                            <Bubble
                                {...props}
                                wrapperStyle={{
                                    right: {
                                        backgroundColor: theme.colors.primary,
                                    },
                                }}
                                //textStyle={{
                                //right: {
                                //    color: 'black',
                                //}
                            }}
                            />
                        );
                    }}
                    // TODO Send Icon
                    renderSend={(props) => {
                        <Send {...props}>
                            <View style={{ flexDirection: "row", height: 44 }}>
                                <Text>Senden</Text>
                            </View>
                        </Send>;
                    }}
                />  */}
            </View>
        </ScreenWrapper>
    );
};

export default Chat;
