import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { MOCK_WORKOUT } from '../../src/data/mockWorkout';
import { SPACING, TYPOGRAPHY, useTheme } from '../../src/theme';

export default function ExerciseDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const theme = useTheme();

  const exercise = MOCK_WORKOUT.exercises.find((e) => e.id === id);

  if (!exercise) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      {/* HEADER: Back Navigation */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.textPrimary} />
        <Text style={[styles.backText, { color: theme.colors.textPrimary }]}>Go Home</Text>
      </TouchableOpacity>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={[styles.label, { color: theme.colors.textMuted }]}>Excercise</Text>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{exercise.name}</Text>
        
        <View style={styles.statsRow}>
          
          {/* REPS CARD */}
          <View style={[
            styles.statTag, 
            { backgroundColor: theme.colors.card }, // Dynamic Card BG
            theme.shadows.card // Dynamic Shadow
          ]}>
            <Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>REPS</Text>
            <Text style={[styles.statValue, { color: theme.colors.textPrimary }]}>{exercise.reps}</Text>
          </View>

          {/* DIFFICULTY CARD */}
          <View style={[
            styles.statTag, 
            { backgroundColor: theme.colors.badge[exercise.difficulty] }, // Badge BG
            theme.shadows.card
          ]}>
            <Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>CLASS</Text>
            <Text style={[
              styles.statValue, 
              { color: theme.colors.badgeText[exercise.difficulty] } // Badge Text
            ]}>
              {exercise.difficulty}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={[styles.label, { color: theme.colors.textMuted }]}>Overview</Text>
        <Text style={[styles.instructions, { color: theme.colors.textSecondary }]}>
          {exercise.instructions}
        </Text>
      </View>

      {/* FOOTER ACTION */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            { backgroundColor: theme.colors.primary }, // Neon/Mint BG
            theme.shadows.floating // Glow effect
          ]} 
          onPress={() => router.push('/chamber')}
        >
          {/* Button Text Color (Dark text on Neon, White text on Mint) */}
          <Text style={[styles.actionText, { color: theme.colors.buttonText }]}>
            START EXERCISE
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  
  backButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: SPACING.gutter, 
    marginTop: SPACING.s 
  },
  
  backText: { 
    ...TYPOGRAPHY.label, 
    marginLeft: SPACING.s 
  },

  content: { 
    padding: SPACING.gutter, 
    marginTop: SPACING.m 
  },
  
  label: { 
    ...TYPOGRAPHY.label, 
    marginBottom: SPACING.s 
  },
  
  title: { 
    ...TYPOGRAPHY.header, 
    fontSize: 32, 
    marginBottom: SPACING.l 
  },
  
  statsRow: { 
    flexDirection: 'row', 
    gap: SPACING.m, 
    marginBottom: SPACING.xl 
  },
  
  statTag: { 
    padding: SPACING.m, 
    borderRadius: 8, 
    minWidth: 100 
  },
  
  statLabel: { 
    ...TYPOGRAPHY.label, 
    fontSize: 10, 
    opacity: 0.8 
  },
  
  statValue: { 
    ...TYPOGRAPHY.subHeader, 
    marginTop: 4 
  },

  divider: { 
    height: 1, 
    backgroundColor: '#e0e0e0', // Keep static gray divider
    marginBottom: SPACING.l 
  },
  
  instructions: { 
    ...TYPOGRAPHY.body, 
    fontSize: 16, 
    lineHeight: 24 
  },

  footer: { 
    position: 'absolute', 
    bottom: 40, 
    left: SPACING.gutter, 
    right: SPACING.gutter 
  },
  
  actionButton: { 
    padding: 18, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  
  actionText: { 
    ...TYPOGRAPHY.buttonText 
  },
});