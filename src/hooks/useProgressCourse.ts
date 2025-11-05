import { WorkoutType } from '@/shared-types/sharedTypes';
import { useAppSelector } from '@/store/store';

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

  let totalExercises = 0;
  let totalCompletedReps = 0;

  for (const workout of allWorkouts) {
    const totalRepsWorkouts = workout.exercises.reduce(
      (sum, reps) => sum + reps.quantity,
      0,
    );

    totalExercises += totalRepsWorkouts;

    const progress = workoutsProgress.find(
      (work) => work.workoutId === workout._id,
    );

    if (progress && progress.progressData) {
      const completedRepsInWorkout = progress.progressData.reduce(
        (sum, rep) => sum + rep,
        0,
      );

      totalCompletedReps += completedRepsInWorkout;
    }
  }

  console.log(
    'totalCompletedReps and totalExercises',
    totalCompletedReps,
    totalExercises,
  );

  const progressPercent =
    totalExercises === 0 ? 0 : (totalCompletedReps / totalExercises) * 100;
  return progressPercent;
};
