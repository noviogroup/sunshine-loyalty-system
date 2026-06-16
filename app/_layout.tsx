import { Stack } from 'expo-router';
import { colors } from '../src/theme';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.white },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(customer)" />
      <Stack.Screen name="(admin)" />
      <Stack.Screen name="(executive)" />
    </Stack>
  );
}
