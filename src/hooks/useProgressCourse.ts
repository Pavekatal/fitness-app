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
  const totalWorkouts = allWorkouts.length;

  let completedCount = 0;
  for (const workout of allWorkouts) {
    const progress = workoutsProgress.find(
      (work) => work.workoutId === workout._id,
    );
    if (progress && progress.workoutCompleted) {
      completedCount++;
    }
  }

  const progressPercent =
    totalWorkouts === 0 ? 0 : (completedCount / totalWorkouts) * 100;
  return progressPercent;
};
