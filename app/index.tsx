import { useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useGhostAuth } from '../src/hooks/useGhostAuth';
// 1. Import the Theme Hook
import { TYPOGRAPHY, useTheme } from '../src/theme';

export default function LoadingScreen() {
  const router = useRouter();
  const { userId, isLoaded: authLoaded } = useGhostAuth();
  const [permission, requestPermission] = useCameraPermissions();
  
  // 2. Get the current colors
  const theme = useTheme();

  useEffect(() => {
    async function checkReadiness() {
      if (!authLoaded) return;

      // Check Camera Permissions
      if (!permission || !permission.granted) {
        const result = await requestPermission();
        if (!result.granted) {
            // In a real app, you'd show a "Permission Required" screen here.
            return; 
        }
      }

      // If Auth is good and Camera is good -> Go to Lobby
      if (userId) {
        router.replace('/lobby');
      }
    }

    checkReadiness();
  }, [authLoaded, userId, permission]);

  return (
    // 3. Apply Dynamic Theme Styles
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      {/* Spinner matches the Theme Primary (Neon or Mint) */}
      <ActivityIndicator size="large" color={theme.colors.primary} />
      
      {/* Text matches the Theme Muted color */}
      <Text style={[styles.loadingText, { color: theme.colors.textMuted }]}>
        Initializing RepCheck...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    // backgroundColor handled inline
  },
  loadingText: {
    ...TYPOGRAPHY.mono, // Use the "Hacker/Code" font for the loading state
    marginTop: 20,
    fontSize: 12,
    // color handled inline
  },
});