import { Stack } from "expo-router";

export default function StudyTabLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="planner"
                options={{ title: "Planner", headerShown: false }}
            />
            <Stack.Screen
                name="chat"
                options={{ title: "Chat", headerShown: false }}
            />
        </Stack>
    );
}
