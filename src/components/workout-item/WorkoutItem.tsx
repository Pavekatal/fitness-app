'use client';

import Image from 'next/image';
import { ProgressTypeOfCourse, WorkoutType } from '@/shared-types/sharedTypes';

type WorkoutItemProp = {
  workout: WorkoutType;
  courseProgress: ProgressTypeOfCourse | undefined;
  isSelected: boolean;
  onSelect: () => void;
};

export default function WorkoutItem({
  workout,
  courseProgress,
  isSelected,
  onSelect,
}: WorkoutItemProp) {
  // const [workoutCompleted, setWorkoutCompleted] = useState<boolean>(false);
  const bgSelectedWorkout = isSelected ? 'bg-[rgba(247,247,247,1)]' : null;
  const titleParts = workout.name.split('/').map((part) => part.trim());
  const mainTitle = titleParts[0];
  const subTitle =
    titleParts.length >= 2 ? `${titleParts[1]} / ${titleParts[2]}` : null;

  const workoutProgressItem = courseProgress?.workoutsProgress.find(
    (work) => work.workoutId === workout._id,
  );
  const workoutCompleted = workoutProgressItem?.workoutCompleted;

  return (
    <>
      <div onClick={onSelect} className="pr-5">
        <div
          className={`border-b-[1px] border-solid border-[#C4C4C4]  pb-[9px] flex items-center gap-[10px] ${bgSelectedWorkout} `}
        >
          {workoutCompleted ? (
            <div className="w-6 h-6 p-0.5">
              <Image
                width={20}
                height={20}
                src="/img/checked-workout.svg"
                alt="checked-workout.svg"
                className="h-5 w-5"
              />
            </div>
          ) : (
            <div className="p-0.5">
              <div className="w-5 h-5 rounded-[50px] border border-solid border-black"></div>
            </div>
          )}
          <div className="flex flex-col  gap-[10px]">
            <h4 className="text-black text-[18px] md:text-[24px] font-normal leading-[19px] md:leading-[26px] ">
              {mainTitle}
            </h4>
            {subTitle ? (
              <p className="text-black text-[14px] md:text-[16px] font-normal leading-[16px] md:leading-[18px] ">
                {subTitle}
              </p>
            ) : (
              <p className=" text-black text-[14px] md:text-[16px] font-normal leading-[16px] md:leading-[18px] "></p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
