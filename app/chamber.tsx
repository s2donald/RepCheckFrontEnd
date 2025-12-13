import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SPACING, TYPOGRAPHY, useTheme } from '../src/theme';

export default function ChamberScreen() {
  const router = useRouter();
  const theme = useTheme();

  const handleReturnToBase = () => {
    router.dismissAll();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* THE "HUD" OVERLAY */}
      <View style={styles.overlay}>
        {/* Neon Green text is fine on black */}
        <Text style={[styles.placeholderText, { color: theme.colors.primary }]}>
            [ CAMERA FEED OFFLINE ]
        </Text>
        <Text style={styles.subText}>System Ready. Awaiting Input.</Text>
      </View>
      
      {/* FOOTER CONTROLS */}
      <SafeAreaView style={styles.footerContainer}>
        
        {/* ❌ WAS: borderColor: theme.colors.card (Dark Grey in Dark Mode) */}
        {/* ✅ NOW: borderColor: '#FFFFFF' (Always White) */}
        <TouchableOpacity 
          style={[styles.backButton, { borderColor: '#FFFFFF' }]} 
          onPress={handleReturnToBase}
        >
          {/* ❌ WAS: color: theme.colors.card */}
          {/* ✅ NOW: color: '#FFFFFF' */}
          <Text style={[styles.backText, { color: '#FFFFFF' }]}>
            ← RETURN TO BASE
          </Text>
        </TouchableOpacity>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000000', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  overlay: {
    alignItems: 'center',
    opacity: 0.7,
  },

  placeholderText: { 
    ...TYPOGRAPHY.header,
    letterSpacing: 2,
    marginBottom: SPACING.s,
    textAlign: 'center',
  },

  subText: {
    ...TYPOGRAPHY.mono,
    color: '#ffffff', // This was already correct
    letterSpacing: 1,
  },

  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: SPACING.l,
  },

  backButton: { 
    borderWidth: 2,
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.xl,
    borderRadius: 50, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },

  backText: { 
    ...TYPOGRAPHY.buttonText,
    fontSize: 14,
  }
});