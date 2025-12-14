import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera'; // 👈 Added imports
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // 👈 Use SafeArea

import { useWorkoutProgress } from '../src/hooks/useWorkoutProgress';
import { SPACING, TYPOGRAPHY, useTheme } from '../src/theme';

export default function ChamberScreen() {
  const router = useRouter();
  const theme = useTheme();
  
  // 1. Get Params
  const params = useLocalSearchParams();
  const exerciseId = params.id as string; 
  // const targetReps = params.target ? parseInt(params.target as string) : 10;

  // 2. Initialize Brain
  const { updateProgress } = useWorkoutProgress();
  
  // 3. State Management
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  
  const initialReps = params.currentReps ? parseInt(params.currentReps as string) : 0;
  const [reps, setReps] = useState(initialReps);
  const [isActive, setIsActive] = useState(true);
  const [feedback, setFeedback] = useState('GOOD FORM');

  // 4. SIMULATION LOOP (Temporary)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setReps(prev => prev + 1);
        setFeedback(Math.random() > 0.7 ? 'LOWER!' : 'GOOD FORM');
      }, 2500); 
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // 5. Permissions Check
  if (!permission) return <View style={styles.container} />;
  
  if (!permission.granted) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'white', textAlign: 'center', marginBottom: 20 }}>
          Camera access is required for AI Analysis.
        </Text>
        <TouchableOpacity onPress={requestPermission} style={{ padding: 15, backgroundColor: theme.colors.primary, borderRadius: 8 }}>
           <Text style={TYPOGRAPHY.buttonText}>GRANT ACCESS</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 6. Finish & Save
  const handleFinishSession = () => {
    setIsActive(false);
    
    // Save to brain
    if (exerciseId) {
      updateProgress(exerciseId, reps);
    }

    Alert.alert(
      "Session Complete", 
      `You completed ${reps} reps.`,
      [{ text: "OK", onPress: () => router.dismissAll() }]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* LAYER 1: Camera Background */}
      <CameraView style={StyleSheet.absoluteFillObject} facing={facing} />

      {/* LAYER 2: HUD Foreground */}
      <SafeAreaView style={styles.hudContainer}>
        
        {/* --- TOP HUD --- */}
        <View style={styles.topBar}>
           <View style={styles.liveTag}>
             <View style={[styles.pulseDot, { backgroundColor: theme.colors.primary }]} />
             <Text style={[styles.liveText, { color: theme.colors.primary }]}>
               AI VISION ACTIVE
             </Text>
           </View>
        </View>

        {/* --- CENTER HUD --- */}
        <View style={styles.centerHud}>
           <Text style={[
             styles.feedbackText, 
             { color: feedback === 'GOOD FORM' ? theme.colors.primary : theme.colors.danger }
           ]}>
             {feedback}
           </Text>
        </View>

        {/* --- BOTTOM CONTROLS --- */}
        <View style={styles.bottomContainer}>
          
          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statBlock}>
              <Text style={styles.statLabel}>REPS</Text>
              <Text style={styles.statValue}>{reps}</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statLabel}>STATUS</Text>
              <Text style={[styles.statValue, { fontSize: 24, color: '#AAA' }]}>
                {isActive ? 'TRACKING' : 'PAUSED'}
              </Text>
            </View>
          </View>

          {/* Control Buttons */}
          <View style={styles.controlsRow}>
            
            {/* Left Spacer (Balances layout) */}
            <View style={styles.controlItem} />

            {/* Center Finish Button */}
            <TouchableOpacity 
              style={[styles.stopButton, { backgroundColor: theme.colors.danger }]}
              onPress={handleFinishSession}
            >
              <Text style={styles.stopButtonText}>FINISH</Text>
            </TouchableOpacity>

            {/* Right Flip Button */}
            <TouchableOpacity 
              style={styles.controlItem}
              onPress={() => setFacing(current => (current === 'back' ? 'front' : 'back'))}
            >
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="camera-flip" size={28} color="white" />
              </View>
            </TouchableOpacity>

          </View>

        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  
  hudContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  // TOP
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.gutter,
    paddingTop: SPACING.s, // Add small padding for top
    alignItems: 'center',
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  pulseDot: { width: 8, height: 8, borderRadius: 4 },
  liveText: { ...TYPOGRAPHY.mono, fontSize: 10, fontWeight: 'bold' },

  // CENTER
  centerHud: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackText: {
    ...TYPOGRAPHY.header,
    fontSize: 42,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },

  // BOTTOM
  bottomContainer: {
    paddingHorizontal: SPACING.gutter,
    paddingBottom: SPACING.m,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.xl,
  },
  statBlock: { alignItems: 'center' },
  statLabel: { ...TYPOGRAPHY.label, color: '#888', marginBottom: 4 },
  statValue: { ...TYPOGRAPHY.header, color: '#FFF', fontSize: 64, lineHeight: 64 },

  // CONTROLS
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  controlItem: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopButton: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    minWidth: 160,
  },
  stopButtonText: {
    ...TYPOGRAPHY.buttonText,
    color: '#FFF',
    fontSize: 18,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});