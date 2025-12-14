// src/hooks/useWorkoutProgress.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

const STORAGE_KEY = '@repcheck_progress';
const DATE_KEY = '@repcheck_last_reset'; // When did we last wipe the reps?
const STREAK_KEY = '@repcheck_streak_count';
const LAST_COMPLETED_KEY = '@repcheck_last_completed_date'; // When did we last hit 100%?

export function useWorkoutProgress() {
  const [progress, setProgress] = useState<{[id: string]: number}>({});
  const [streak, setStreak] = useState(0);

  // 1. HELPER: Get "Today" as a simple string (e.g., "Mon Dec 25 2025")
  const getDayString = (date: Date) => date.toDateString();

  const loadProgress = async () => {
    try {
      const today = new Date();
      const todayStr = getDayString(today);
      
      // A. HANDLE DAILY RESET (Reps)
      const lastResetDate = await AsyncStorage.getItem(DATE_KEY);
      const savedProgressStr = await AsyncStorage.getItem(STORAGE_KEY);
      
      if (lastResetDate !== todayStr) {
        // New Day! Wipe reps.
        await AsyncStorage.setItem(DATE_KEY, todayStr);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({}));
        setProgress({});
      } else {
        // Same Day, load reps.
        if (savedProgressStr) setProgress(JSON.parse(savedProgressStr));
      }

      // B. HANDLE STREAK CALCULATION
      const savedStreak = parseInt(await AsyncStorage.getItem(STREAK_KEY) || '0');
      const lastCompletedDate = await AsyncStorage.getItem(LAST_COMPLETED_KEY);

      // Calculate Yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = getDayString(yesterday);

      // Streak Logic:
      // 1. If we completed today: Show Saved Streak.
      // 2. If we completed yesterday: Show Saved Streak (Streak is alive).
      // 3. If last completion was BEFORE yesterday: Streak is broken (0).
      if (lastCompletedDate === todayStr || lastCompletedDate === yesterdayStr) {
        setStreak(savedStreak);
      } else {
        setStreak(0); // You missed a day!
      }

    } catch (e) {
      console.error("Failed to load data", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProgress();
    }, [])
  );

  const updateProgress = async (id: string, reps: number) => {
    const newProgress = { ...progress, [id]: reps };
    setProgress(newProgress);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  };

  // 2. NEW FUNCTION: Mark the day as "Mission Complete"
  const completeDailyMission = async () => {
    const todayStr = getDayString(new Date());
    const lastCompletedDate = await AsyncStorage.getItem(LAST_COMPLETED_KEY);

    // If already marked complete today, do nothing.
    if (lastCompletedDate === todayStr) return;

    // Check if we are extending a streak from yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = getDayString(yesterday);

    let newStreak = 1; // Default: Start new streak
    const currentSavedStreak = parseInt(await AsyncStorage.getItem(STREAK_KEY) || '0');

    if (lastCompletedDate === yesterdayStr) {
       // We did it yesterday, so today is +1
       newStreak = currentSavedStreak + 1;
    }

    // Save
    setStreak(newStreak);
    await AsyncStorage.setItem(STREAK_KEY, newStreak.toString());
    await AsyncStorage.setItem(LAST_COMPLETED_KEY, todayStr);
    console.log("🔥 STREAK UPDATED:", newStreak);
  };

  return { progress, streak, updateProgress, completeDailyMission };
}