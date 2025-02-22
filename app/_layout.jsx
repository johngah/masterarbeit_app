import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { factory } from "typescript";
import { AuthProvider, useAuth, setUserData } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { getUserData } from "../services/userService";
import { ThemeProvider } from "../contexts/ThemeContext";

const _layout = () => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <MainLayout />
            </ThemeProvider>
        </AuthProvider>
    );
};

const MainLayout = () => {
    const { setAuth, setUserData } = useAuth();
    const router = useRouter();

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            console.log("session user: ", session?.user);

            if (session) {
                setAuth(session?.user);
                updateUserData(session?.user);
                router.replace("/home");
            } else {
                setAuth(null);
                router.replace("/welcome");
            }
        });
    }, []);

    const updateUserData = async (user) => {
        //console.log("test: ", user);
        let res = await getUserData(user?.id);
        //console.log("got user data ", res);
        if (res.success) setUserData(res.data);
    };

    return (
        <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
};

export default _layout;
