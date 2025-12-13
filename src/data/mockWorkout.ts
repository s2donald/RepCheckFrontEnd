export interface Exercise {
  id: string;
  name: string;
  shortDescription: string;
  reps: number;
  difficulty: 'Light' | 'Moderate' | 'Savage';
  instructions: string;
  image: string;
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
      shortDescription: 'Fundamental leg strength and mobility builder.',
      reps: 10,
      difficulty: 'Light',
      instructions: 'Stand with feet shoulder-width apart. Lower your hips back and down as if sitting in a chair. Keep your chest up.',
      image: require('../../assets/images/exercises/squat_image.png'),
    },
    {
      id: 'chest_pu_01',
      name: 'Pushups',
      shortDescription: 'Classic upper body pushing strength exercise.',
      reps: 15,
      difficulty: 'Moderate',
      instructions: 'Start in a plank position. Lower your body until your chest nearly touches the floor. Push back up explosively.',
      image: require('../../assets/images/exercises/pushup_exercise.png'),
    },
    {
      id: 'back_pu_01',
      name: 'Weighted Pullups',
      shortDescription: 'Advanced vertical pulling for back width.',
      reps: 15,
      difficulty: 'Savage',
      instructions: 'Secure the weight using a dip belt or by pinching a dumbbell between your feet. Grip the bar slightly wider than shoulder-width. Pull your body up until your chin clears the bar, then lower with control.',
      image: require('../../assets/images/exercises/pullup.png'),
    },
  ],
};