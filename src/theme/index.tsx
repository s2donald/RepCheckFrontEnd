import React, { createContext, useContext, useState } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';

// ==========================================
// 1. RAW PALETTES (UNCHANGED)
// ==========================================
const PALETTE_DARK = {
  background: '#0F111A',
  card: '#1E2330',
  textPrimary: '#FFFFFF',
  textSecondary: '#94A3B8',
  textMuted: '#475569',
  primary: '#00FFA3',
  danger: '#FF2E93',
  streak: '#FFD300',
  cyan: '#00F0FF',
  gold: '#FFD300',
  pink: '#FF2E93',
};

const PALETTE_LIGHT = {
  background: '#F4F6F9',
  card: '#FFFFFF',
  textPrimary: '#1A202C',
  textSecondary: '#718096',
  textMuted: '#A0AEC0',
  primary: '#00D189',
  danger: '#FF005C',
  streak: '#FF005C',
  cyan: '#00B5D8',
  orange: '#F6AD55',
  pink: '#D53F8C',
};

// ==========================================
// 2. SHARED CONSTANTS (UNCHANGED)
// ==========================================
export const SPACING = { xs: 4, s: 8, m: 16, gutter: 20, l: 24, xl: 32 };

export const TYPOGRAPHY = {
  header: { fontSize: 28, fontWeight: '800' as '800', letterSpacing: 1.5 },
  subHeader: { fontSize: 20, fontWeight: '700' as '700' },
  body: { fontSize: 16, lineHeight: 24 },
  mono: { fontSize: 13, fontFamily: 'Courier' },
  label: { fontSize: 11, fontWeight: '900' as '900', textTransform: 'uppercase' as 'uppercase', letterSpacing: 1 },
  buttonText: { fontWeight: '900' as '900', fontSize: 18, letterSpacing: 1, textTransform: 'uppercase' as 'uppercase' },
};

// ==========================================
// 3. THEME DEFINITIONS (UNCHANGED)
// ==========================================
export const DARK_THEME = {
  mode: 'dark',
  colors: {
    background: PALETTE_DARK.background,
    card: PALETTE_DARK.card,
    textPrimary: PALETTE_DARK.textPrimary,
    textSecondary: PALETTE_DARK.textSecondary,
    textMuted: PALETTE_DARK.textMuted,
    primary: PALETTE_DARK.primary,
    danger: PALETTE_DARK.danger,
    streak: PALETTE_DARK.streak,
    buttonText: '#0F111A',
    badge: {
      Light: 'rgba(0, 240, 255, 0.15)',
      Moderate: 'rgba(255, 211, 0, 0.15)',
      Savage: 'rgba(255, 46, 147, 0.15)',
    },
    badgeText: {
      Light: PALETTE_DARK.cyan,
      Moderate: PALETTE_DARK.gold,
      Savage: PALETTE_DARK.pink,
    }
  },
  shadows: {
    card: { shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
    floating: { shadowColor: PALETTE_DARK.primary, shadowOpacity: 0.6, shadowOffset: { width: 0, height: 8 }, shadowRadius: 12, elevation: 10 }
  }
};

export const LIGHT_THEME = {
  mode: 'light',
  colors: {
    background: PALETTE_LIGHT.background,
    card: PALETTE_LIGHT.card,
    textPrimary: PALETTE_LIGHT.textPrimary,
    textSecondary: PALETTE_LIGHT.textSecondary,
    textMuted: PALETTE_LIGHT.textMuted,
    primary: PALETTE_LIGHT.primary,
    danger: PALETTE_LIGHT.danger,
    streak: PALETTE_LIGHT.streak,
    buttonText: '#FFFFFF',
    badge: {
      Light: '#E6FFFA',
      Moderate: '#FFFFF0',
      Savage: '#FFF5F7',
    },
    badgeText: {
      Light: PALETTE_LIGHT.cyan,
      Moderate: PALETTE_LIGHT.orange,
      Savage: PALETTE_LIGHT.pink,
    }
  },
  shadows: {
    card: { shadowColor: '#1A202C', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
    floating: { shadowColor: PALETTE_LIGHT.primary, shadowOpacity: 0.4, shadowOffset: { width: 0, height: 8 }, shadowRadius: 16, elevation: 8 }
  }
};

// ==========================================
// 4. THEME PROVIDER & HOOK (NEW LOGIC)
// ==========================================

// Create Context
const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useNativeColorScheme();
  // Default to system, but allow toggle
  const [mode, setMode] = useState<'light' | 'dark'>(systemScheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Select the active theme object
  const activeTheme = mode === 'dark' ? DARK_THEME : LIGHT_THEME;

  // Combine the theme object with the toggle function
  const value = {
    ...activeTheme,
    toggleTheme, // 👈 We inject this so any component can call it
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// The Hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};