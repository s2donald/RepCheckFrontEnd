import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import 'react-native-get-random-values'; // Required for uuid
import { v4 as uuidv4 } from 'uuid';

const USER_ID_KEY = 'repcheck_user_id';

export function useGhostAuth() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function getIdentity() {
      try {
        // 1. Try to fetch existing ID
        let id = await SecureStore.getItemAsync(USER_ID_KEY);

        // 2. If none, generate and save
        if (!id) {
          id = uuidv4();
          await SecureStore.setItemAsync(USER_ID_KEY, id);
          console.log('✨ New Ghost ID Generated:', id);
        } else {
          console.log('📂 Existing Ghost ID Loaded:', id);
        }

        setUserId(id);
      } catch (e) {
        console.error('Auth Error:', e);
      } finally {
        setIsLoaded(true);
      }
    }

    getIdentity();
  }, []);

  return { userId, isLoaded };
}