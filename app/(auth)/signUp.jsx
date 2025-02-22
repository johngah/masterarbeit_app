import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState, useMemo } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { hp, wp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import Icon from "../../assets/icons";
import { StatusBar } from "expo-status-bar";
import BackButton from "../../components/BackButton";
import { useRouter } from "expo-router";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { supabase } from "../../lib/supabase";
import { Dropdown } from "react-native-element-dropdown";

const SignUp = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const nameRef = useRef("");
    const passwordRef = useRef("");
    const varianteRef = useRef("");
    const [varianteState, setVariante] = useState("");
    const [nebenfachGroß, setNebenfachGroß] = useState("");
    const [nebenfachKlein, setNebenfachKlein] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert("Sign Up", "Please fill all the fields!");
            return;
        }

        let name = nameRef.current.trim();
        let email = emailRef.current.trim();
        let password = passwordRef.current.trim();
        let studienvariante = varianteState.trim();
        let nebenfach_gross = nebenfachGroß.trim();
        let nebenfach_klein = nebenfachKlein.trim();

        setLoading(true);

        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                    studienvariante,
                    nebenfach_gross,
                    nebenfach_klein,
                },
            },
        });
        setLoading(false);

        //console.log(varianteState, nebenGroß, nebenKlein);

        if (error) {
            Alert.alert("Sign Up", error.message);
        }
    };

    const varianten = [
        { label: "IIM", value: "IIM" },
        { label: "IKS", value: "IKS" },
        { label: "LIN", value: "LIN" },
        { label: "DISO", value: "DISO" },
        { label: "GIM", value: "GIM" },
        { label: "DRIKK", value: "DRIKK" },
    ];

    const nebenGroß = [
        {
            label: "BWL",
            value: "BWL",
        },
        {
            label: "Geschichte",
            value: "GES",
        },
        {
            label: "Informationstechnologie",
            value: "INFO",
        },
        {
            label: "Literatur",
            value: "LIT",
        },
        {
            label: "Medienwissenschaft",
            value: "MED",
        },
        {
            label: "Musikwissenschaft",
            value: "MUS",
        },
        {
            label: "Philosophie",
            value: "PHIL",
        },
        {
            label: "Physik",
            value: "PHY",
        },
        {
            label: "Psychologie",
            value: "PSY",
        },
        {
            label: "Soziologie",
            value: "SOZ",
        },
        {
            label: "Technik",
            value: "TEC",
        },
        {
            label: "Übersetzungswissenschaft",
            value: "UEB",
        },
    ];

    const nebenKlein = [
        {
            label: "BWL",
            value: "BWL",
        },
        {
            label: "Geschichte",
            value: "GES",
        },
        {
            label: "Informationstechnologie",
            value: "INFO",
        },
        {
            label: "Literatur",
            value: "LIT",
        },
        {
            label: "Medienwissenschaft",
            value: "MED",
        },
        {
            label: "Musikwissenschaft",
            value: "MUS",
        },
        {
            label: "Philosophie",
            value: "PHIL",
        },
        {
            label: "Physik",
            value: "PHY",
        },
        {
            label: "Psychologie",
            value: "PSY",
        },
        {
            label: "Soziologie",
            value: "SOZ",
        },
        {
            label: "Technik",
            value: "TEC",
        },
        {
            label: "Übersetzungswissenschaft",
            value: "UEB",
        },
    ];

    return (
        <ScreenWrapper bg={"white"}>
            <StatusBar style="dark" />
            <View style={styles.container}>
                {/* Back Button */}
                <Pressable
                    onPress={() => router.replace("/welcome")}
                    style={styles.button}
                >
                    <Icon
                        name="arrowLeft"
                        strokeWidth={2.5}
                        size={26}
                        color={theme.colors.text}
                    />
                </Pressable>

                {/* Welcome Back */}
                <View>
                    <Text style={styles.welcomeText}>Let's</Text>
                    <Text style={styles.welcomeText}>Get Started</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <Text
                        style={{ fontSize: hp(1.5), color: theme.colors.text }}
                    >
                        Bitte gib deine Informationen ein.
                    </Text>
                    <Input
                        icon={<Icon name="user" size={26} strokeWidth={1.6} />}
                        placeholder="Name"
                        onChangeText={(value) => {
                            nameRef.current = value;
                        }}
                    />
                    <Input
                        icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
                        placeholder="E-Mail"
                        inputMode="email"
                        autoCapitalize="none"
                        onChangeText={(value) => {
                            emailRef.current = value;
                        }}
                    />
                    <Input
                        icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
                        placeholder="Passwort"
                        secureTextEntry
                        onChangeText={(value) => {
                            passwordRef.current = value;
                        }}
                    />
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectText}
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
                        renderLeftIcon={() => (
                            <Icon name="edit" size={26} strokeWidth={1.6} />
                        )}
                    />
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectText}
                        data={nebenGroß}
                        labelField="label"
                        valueField="value"
                        placeholder="Nebenfach Groß"
                        value={varianteState}
                        onChange={(item) => {
                            if (varianteState !== item.value) {
                                setNebenfachGroß(item.value);
                            }
                        }}
                        renderLeftIcon={() => (
                            <Icon name="heart" size={26} strokeWidth={1.6} />
                        )}
                    />
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectText}
                        data={nebenKlein}
                        labelField="label"
                        valueField="value"
                        placeholder="Nebenfach Klein"
                        value={varianteState}
                        onChange={(item) => {
                            if (varianteState !== item.value) {
                                setNebenfachKlein(item.value);
                            }
                        }}
                        renderLeftIcon={() => (
                            <Icon name="location" size={26} strokeWidth={1.6} />
                        )}
                    />
                    <Button
                        title={"Sign up"}
                        loading={loading}
                        onPress={onSubmit}
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Du hast schon einen Account?
                    </Text>
                    <Pressable onPress={() => router.push("login")}>
                        <Text
                            style={[
                                styles.footerText,
                                {
                                    color: theme.colors.primaryDark,
                                    fontWeight: theme.fonts.semibold,
                                },
                            ]}
                        >
                            Login
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        paddingHorizontal: wp(5),
    },
    button: {
        alignSelf: "flex-start",
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: "rgba(0,0,0,0.07)",
    },
    welcomeText: {
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
        color: theme.colors.text,
    },
    form: {
        gap: 15,
    },
    forgotPassword: {
        textAlign: "right",
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },
    footerText: {
        textAlign: "center",
        color: theme.colors.text,
        fontSize: hp(1.6),
    },
    dropdown: {
        flexDirection: "row",
        height: hp(7.2),
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.4,
        borderColor: theme.colors.text,
        borderRadius: theme.radius.xxl,
        borderCurve: "continuous",
        paddingHorizontal: 18,
        gap: 12,
    },
    placeholder: {
        color: theme.colors.textLight,
        fontSize: 14,
        paddingLeft: 13,
    },
    selectText: {
        fontSize: 14,
        paddingLeft: 13,
    },
});
