import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { MOCK_WORKOUT } from '../src/data/mockWorkout';
import { useGhostAuth } from '../src/hooks/useGhostAuth';
// Import only what we need from the theme
import { SPACING, TYPOGRAPHY, useTheme } from '../src/theme';

export default function LobbyScreen() {
  const router = useRouter();
  const { userId } = useGhostAuth();
  const theme = useTheme();

  const isComplete = MOCK_WORKOUT.status === 'COMPLETE';
  const progressPercent = (MOCK_WORKOUT.completedCount / MOCK_WORKOUT.totalCount) * 100;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      {/* --- HEADER (3-Column Layout) --- */}
      <View style={styles.header}>
        
        {/* LEFT: Placeholder to balance the layout */}
        <View style={styles.headerLeft} />

        {/* CENTER: App Logo */}
        <View style={styles.headerCenter}>
          <Text style={[styles.logoText, { color: theme.colors.textPrimary }]}>REPCHECK</Text>
          {/* <Text style={[styles.tinyId, { color: theme.colors.textMuted }]}>ID: {userId?.slice(-4)}</Text> */}
        </View>

        {/* RIGHT: Streak Counter */}
        <View style={styles.headerRight}>
          <Text style={[styles.streakText, { color: theme.colors.textPrimary }]}>
            {MOCK_WORKOUT.streakCurrent}
          </Text>
          <MaterialCommunityIcons 
            name={isComplete ? "fire" : "fire-off"} 
            size={24} 
            color={isComplete ? theme.colors.streak : theme.colors.textMuted} 
          />
        </View>
      </View>

      {/* --- DASHBOARD (Date & Progress) --- */}
      <View style={styles.dashboardRow}>
        
        {/* LEFT: Date Stack */}
        <View>
          <Text style={[styles.weekdayText, { color: theme.colors.textPrimary }]}>
            {MOCK_WORKOUT.weekday}
          </Text>
          <Text style={[styles.dateText, { color: theme.colors.textPrimary }]}>
            {MOCK_WORKOUT.dayMonth}
          </Text>
        </View>

        {/* RIGHT: Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBarBackground, { backgroundColor: theme.colors.card }]}>
            <View style={[
                styles.progressBarFill, 
                { width: `${progressPercent}%`, backgroundColor: theme.colors.primary }
            ]} />
          </View>
          
          <Text style={[styles.progressText, { color: theme.colors.textMuted }]}>
            {MOCK_WORKOUT.completedCount} / {MOCK_WORKOUT.totalCount} COMPLETED
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={[styles.sectionTitle, { color: theme.colors.textMuted }]}>DAILY MISSION</Text>

      {/* --- WORKOUT LIST --- */}
      <FlatList
        data={MOCK_WORKOUT.exercises}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: SPACING.gutter, paddingBottom: 100 }}
        renderItem={({ item }) => (
          
          <TouchableOpacity 
            activeOpacity={0.9}
            onPress={() => router.push(`/exercise/${item.id}`)}
          >
            {/* Wrapper View handles the Shadow */}
            <View style={[styles.cardWrapper, theme.shadows.card]}>
              <ImageBackground
                source={{ }}
                style={styles.cardBackground}
                imageStyle={{ borderRadius: 12 }}
              >
                {/* Overlay handles readability */}
                <View style={styles.cardOverlay}>
                  
                  {/* Card Header: Badge & Reps */}
                  <View style={styles.cardHeader}>
                    <View style={[
                        styles.badge, 
                        // Use Dynamic Badge Background from Theme
                        { backgroundColor: theme.colors.badge[item.difficulty] }
                    ]}>
                      <Text style={[
                          styles.badgeText, 
                          // Use Dynamic Badge Text Color
                          { color: theme.colors.badgeText[item.difficulty] }
                      ]}>
                        {item.difficulty}
                      </Text>
                    </View>
                    
                    <Text style={styles.repsTag}>{item.reps} REPS</Text>
                  </View>

                  {/* Card Footer: Title */}
                  <View>
                    <Text style={styles.exerciseNameLight}>{item.name}</Text>
                  </View>

                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={[styles.toolbar, { backgroundColor: theme.colors.card, borderTopColor: theme.colors.background }]}>
        
        {/* HOME TAB (Active) */}
        <TouchableOpacity style={styles.tabItem}>
          <MaterialCommunityIcons name="home-variant" size={28} color={theme.colors.primary} />
          <Text style={[styles.tabLabel, { color: theme.colors.primary }]}>BASE</Text>
        </TouchableOpacity>

        {/* SETTINGS TAB (Inactive) */}
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/settings')}>
          <MaterialCommunityIcons name="cog" size={28} color={theme.colors.textMuted} />
          <Text style={[styles.tabLabel, { color: theme.colors.textMuted }]}>SYSTEM</Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------
// STYLES (Layout Only - No Static Colors)
// ---------------------------------------------------------

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    // No padding here, we use gutter in children
  },
  
  // HEADER LAYOUT
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginTop: SPACING.s,
    marginBottom: SPACING.l,
    paddingHorizontal: SPACING.gutter, 
  },
  
  headerLeft: { flex: 1 }, // Empty spacer
  
  headerCenter: {
    flex: 2, 
    alignItems: 'center', 
  },
  
  headerRight: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4, 
  },

  logoText: {
    ...TYPOGRAPHY.header,
    fontSize: 18,
    fontStyle: 'italic',
  },
  
  tinyId: {
    fontSize: 10,
    fontFamily: 'Courier',
    marginTop: 2,
  },

  streakText: {
    ...TYPOGRAPHY.header,
    fontSize: 20,
  },

  // DASHBOARD LAYOUT
  dashboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end', 
    marginBottom: SPACING.l,
    paddingHorizontal: SPACING.gutter,
  },

  weekdayText: {
    ...TYPOGRAPHY.label,
    fontSize: 12,
    marginBottom: 0,
  },

  dateText: {
    ...TYPOGRAPHY.header,
    fontSize: 26,
    lineHeight: 30,
  },

  progressContainer: {
    width: '45%', 
    alignItems: 'flex-end',
  },

  progressBarBackground: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    marginBottom: 6,
    overflow: 'hidden',
  },

  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },

  progressText: {
    ...TYPOGRAPHY.label,
    fontSize: 9, // Slightly larger than 7 so it's readable
  },

  divider: {
    height: 1,
    backgroundColor: '#e0e0e0', // This is fine to keep static gray
    marginBottom: SPACING.l,
    marginHorizontal: SPACING.gutter,
  },

  sectionTitle: { 
    ...TYPOGRAPHY.label, 
    marginBottom: SPACING.m,
    paddingHorizontal: SPACING.gutter,
  },

  // CARD STYLES
  cardWrapper: {
    marginBottom: SPACING.m,
    borderRadius: 12,
    backgroundColor: 'transparent', // Let the shadow wrapper be transparent
  },

  cardBackground: {
    height: 180, // Taller for cinematic look
  },

  cardOverlay: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.4)', // Dark overlay for text readability
    padding: SPACING.m,
    justifyContent: 'space-between',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  repsTag: {
    ...TYPOGRAPHY.label,
    color: '#ffffff', // Always white on image
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },

  exerciseNameLight: {
    ...TYPOGRAPHY.header,
    fontSize: 24,
    color: '#ffffff', // Always white on image
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  
  badge: { 
    paddingHorizontal: SPACING.s, 
    paddingVertical: SPACING.xs, 
    borderRadius: 4 
  },
  
  badgeText: { 
    ...TYPOGRAPHY.label 
  },
  toolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 30, // Extra padding for iPhone Home Indicator
    borderTopWidth: 1,
    elevation: 20, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    ...TYPOGRAPHY.label,
    fontSize: 9,
    marginTop: 4,
  }
});