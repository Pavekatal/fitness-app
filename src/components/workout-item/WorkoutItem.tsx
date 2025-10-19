'use client';

import { WorkoutType } from '@/shared-types/sharedTypes';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type WorkoutItemProp = {
  workout: WorkoutType;
};

export default function WorkoutItem({ workout }: WorkoutItemProp) {
  const [workoutСompleted, setWorkoutCompleted] = useState(false);

  const toggle = () => {
    // временная функция, после введения глобального состояния убрать
    setWorkoutCompleted(workoutСompleted);
  };
  return (
    <>
      <Link href={`/fitness/workouts/${workout._id}`}>
        <div className="pr-5">
          <div className="border-b-[1px] border-solid border-[#C4C4C4]  pb-[9px] flex items-center gap-[10px]">
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
                {workout.name}
              </h4>
              <p className="text-black text-[16px] font-normal leading-[18px] ">
                {workout.exercises}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
