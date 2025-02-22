import { Stack } from "expo-router";
import { Text } from "react-native";

export default function ProfileTabLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="profile"
                options={{ title: "Profile", headerShown: false }}
            />
            <Stack.Screen
                name="editProfile"
                options={{
                    title: "Edit Profile",
                    headerShown: false,
                    presentation: "modal",
                }}
            />
        </Stack>
    );
}
