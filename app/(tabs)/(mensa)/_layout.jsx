import { Stack } from 'expo-router';

export default function MensaTabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="mensa" options={{ title: 'Profile', headerShown: false }} />
    </Stack>
  );
}
