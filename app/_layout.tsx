import { Stack } from 'expo-router';
import { colors } from '../src/theme';
import { DemoStateProvider } from '../src/context/DemoStateContext';

export default function RootLayout() {
  return (
    <DemoStateProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.white },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(customer)" />
        <Stack.Screen name="(admin)" />
        <Stack.Screen name="(executive)" />
      </Stack>
    </DemoStateProvider>
  );
}
