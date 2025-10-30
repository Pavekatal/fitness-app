'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { WorkoutType } from '@/shared-types/sharedTypes';
import { useAppSelector } from '@/store/store';

type WorkoutItemProp = {
  workout: WorkoutType;
  isSelected: boolean;
  onSelect: () => void;
};

export default function WorkoutItem({
  workout,
  isSelected,
  onSelect,
}: WorkoutItemProp) {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { selectedCourse } = useAppSelector((state) => state.workouts);
  const [workoutСompleted, setWorkoutCompleted] = useState(false);
  const bgSelectedWorkout = isSelected ? 'bg-[rgba(247,247,247,1)]' : null;
  const titleParts = workout.name.split('/').map((part) => part.trim());
  const mainTitle = titleParts[0];
  const subTitle =
    titleParts.length >= 2 ? `${titleParts[1]} / ${titleParts[2]}` : null;
  const courseProgress = currentUser?.courseProgress?.find(
    (progress) => progress.courseId === selectedCourse,
  );
  const workoutProgress = courseProgress?.workoutsProgress.find(
    (work) => work.workoutId === workout._id,
  );

  useEffect(() => {
    if (workoutProgress) setWorkoutCompleted(workoutProgress?.workoutCompleted);
  }, [workoutProgress]);

  return (
    <>
      <div onClick={onSelect} className="pr-5">
        <div
          className={`border-b-[1px] border-solid border-[#C4C4C4]  pb-[9px] flex items-center gap-[10px] ${bgSelectedWorkout} `}
        >
          {workoutСompleted ? (
            <div className="w-6 h-6 p-0.5">
              <Image
                width={24}
                height={24}
                src="/img/checked-workout.svg"
                alt="checked-workout.svg"
                className="h-5 w-5"
              />
            </div>
          ) : (
            <div className="w-5 h-5 p-0.5 rounded-[50px] border border-solid border-black"></div>
          )}
          <div className="flex flex-col  gap-[10px]">
            <h4 className="text-black text-[24px] font-normal leading-[26px] ">
              {mainTitle}
            </h4>
            {subTitle ? (
              <p className="text-black text-[16px] font-normal leading-[18px] ">
                {subTitle}
              </p>
            ) : (
              <p className=" text-black text-[16px] font-normal leading-[18px] "></p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
