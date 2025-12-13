import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SPACING, TYPOGRAPHY, useTheme } from '../src/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const theme = useTheme(); // 👈 Access the theme AND the toggle function

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>SETTINGS</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>DONE</Text>
        </TouchableOpacity>
      </View>

      {/* THEME TOGGLE ROW */}
      <View style={[styles.row, { backgroundColor: theme.colors.card }]}>
        <View style={styles.rowLeft}>
          <MaterialCommunityIcons 
            name="theme-light-dark" 
            size={24} 
            color={theme.colors.textPrimary} 
          />
          <Text style={[styles.label, { color: theme.colors.textPrimary }]}>Dark Mode</Text>
        </View>
        
        <Switch 
          value={theme.mode === 'dark'}
          onValueChange={theme.toggleTheme} // 👈 The magic switch
          trackColor={{ false: '#767577', true: theme.colors.primary }}
          thumbColor={'#f4f3f4'}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACING.gutter },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.s,
  },
  title: { ...TYPOGRAPHY.header, fontSize: 24 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.m,
    borderRadius: 12,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.m },
  label: { ...TYPOGRAPHY.subHeader, fontSize: 16 },
});