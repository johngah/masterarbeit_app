import { Stack } from 'expo-router';

export default function HomeTabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" options={{ title: 'Home', headerShown: false }} />
    </Stack>
  );
}
