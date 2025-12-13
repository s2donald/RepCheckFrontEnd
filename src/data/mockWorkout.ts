export interface Exercise {
  id: string;
  name: string;
  reps: number;
  difficulty: 'Light' | 'Moderate' | 'Savage';
  instructions: string;
}

export interface WorkoutPlan {
  weekday: string;
  dayMonth: string;
  status: 'PENDING' | 'COMPLETE';
  streakCurrent: number;
  completedCount: number;
  totalCount: number;
  exercises: Exercise[];
}

const today = new Date();

export const MOCK_WORKOUT: WorkoutPlan = {
  weekday: today.toLocaleDateString('en-GB', { weekday: 'long' }),
  dayMonth: today.toLocaleDateString('en-GB', { day: '2-digit', month: 'long' }),
  status: 'PENDING',
  completedCount: 1,
  totalCount: 3,
  streakCurrent: 5,  // The user is on a 5-day streak
  exercises: [
    {
      id: 'legs_sq_01',
      name: 'Bodyweight Squat',
      reps: 10,
      difficulty: 'Light',
      instructions: 'Stand with feet shoulder-width apart. Lower your hips back and down as if sitting in a chair. Keep your chest up.',
    },
    {
      id: 'chest_pu_01',
      name: 'Pushups',
      reps: 15,
      difficulty: 'Moderate',
      instructions: 'Start in a plank position. Lower your body until your chest nearly touches the floor. Push back up explosively.',
    },
    {
      id: 'back_pu_01',
      name: 'Weighted Pullups',
      reps: 15,
      difficulty: 'Savage',
      instructions: 'Secure the weight using a dip belt or by pinching a dumbbell between your feet. Grip the bar slightly wider than shoulder-width. Pull your body up until your chin clears the bar, then lower with control.',
    },
  ],
};