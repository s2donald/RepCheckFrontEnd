import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
// Import ThemeProvider from YOUR file, not React Navigation
import { ThemeProvider, useTheme } from '../src/theme';

// We create a wrapper component to handle the StatusBar logic cleanly
function RootLayoutNav() {
  const theme = useTheme(); // Now we can use the hook inside!

  return (
    <>
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="lobby" />
        <Stack.Screen name="exercise/[id]" />
        <Stack.Screen name="chamber" />
        <Stack.Screen name="settings" options={{ presentation: 'modal' }} /> {/* 👈 New Route */}
      </Stack>
    </>
  );
}

export default function Layout() {
  return (
    // Wrap the whole app in your State Provider
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}