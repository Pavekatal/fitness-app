'use client';

import Image from 'next/image';
import { useState } from 'react';
import { WorkoutType } from '@/shared-types/sharedTypes';

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
  const [workoutСompleted, setWorkoutCompleted] = useState(false);

  const bgSelectedWorkout = isSelected ? 'bg-[rgba(247,247,247,1)]' : null;

  const titleParts = workout.name.split('/').map((part) => part.trim());
  const mainTitle = titleParts[0];
  const subTitle = titleParts[1];

  const toggle = () => {
    // временная функция, после введения глобального состояния убрать
    setWorkoutCompleted(workoutСompleted);
  };

  return (
    <>
      <div onClick={onSelect} className="pr-5">
        <div
          className={`border-b-[1px] border-solid border-[#C4C4C4]  pb-[9px] flex items-center gap-[10px] ${bgSelectedWorkout} `}
        >
          {workoutСompleted ? (
            <div onClick={toggle} className="w-6 h-6 p-0.5">
              <Image
                width={20}
                height={20}
                src="/img/checked-workout.svg"
                alt="checked-workout.svg"
                className="h-5 w-5"
              />
            </div>
          ) : (
            <div className="w-6 h-6 p-0.5 rounded-[50px] border border-solid border-black"></div>
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
