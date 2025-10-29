import { ExercisesType, WorkoutType } from '@/shared-types/sharedTypes';
import { useAppSelector } from '@/store/store';

const calculateProgressWorkout = (
  workoutId: string,
  progressData: number[],
  exercises: ExercisesType[],
) => {
  const totalExercises = exercises.reduce(
    (sum, exercise) => sum + exercise.quantity,
    0,
  );
  const completedExercises = progressData.reduce((sum, i) => sum + i, 0);
  return totalExercises === 0 ? 0 : (completedExercises / totalExercises) * 100;
};

export const usePercentageProgressCourse = (
  courseId: string,
  allWorkouts: WorkoutType[],
) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const allProgressCourse = currentUser?.courseProgress || [];

  const courseProgress = allProgressCourse.find(
    (course) => course.courseId === courseId,
  );

  if (!courseProgress) return 0;

  const { workoutsProgress } = courseProgress;

  const workoutProgresses = workoutsProgress.map((work) => {
    const workout = allWorkouts.find(
      (workout) => workout._id === work.workoutId,
    );

    if (!workout) return 0;

    return calculateProgressWorkout(
      work.workoutId,
      work.progressData,
      workout.exercises,
    );
  });

  const totalProgress = workoutProgresses.reduce(
    (sum, progress) => sum + progress,
    0,
  );

  return workoutProgresses.length === 0
    ? 0
    : totalProgress / workoutProgresses.length;
};
