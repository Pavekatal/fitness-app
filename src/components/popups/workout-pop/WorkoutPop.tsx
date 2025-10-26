'use client';

import Link from 'next/link';
import { useState } from 'react';

import WorkoutItem from '@/components/workout-item/WorkoutItem';
// import { workouts } from '@/data';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setSelectedWorkout } from '@/store/features/workoutSlice';

export default function WorkoutPop() {
  const dispatch = useAppDispatch();
  const { allWorkouts, selectedWorkout, isLoading, errorMessage } =
    useAppSelector((state) => state.workouts);
  const [activeWorkoutId, setActiveWorkoutId] = useState<string | null>(null);

  const onFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const onSelectWorkout = (id: string) => {
    setActiveWorkoutId(id);
    dispatch(setSelectedWorkout(id));
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black opacity-20 z-40"
        aria-hidden="true"
      />
      <div
        onClick={onFormClick}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-115 h-[609px] rounded-[30px] bg-white p-10 shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] flex flex-col z-50"
      >
        <h2 className="text-black text-[32px] font-normal leading-[38px]">
          Выберите тренировку
        </h2>
        <div className="h-[360px] mt-[48px] mb-[34px] flex workoutcontent">
          {isLoading ? (
            <h4 className="text-black text-[24px] font-normal leading-[26px] ">
              Тренировки загружаются ...
            </h4>
          ) : errorMessage ? (
            <h4 className="text-black text-[24px] font-normal leading-[28px] w-[380px] text-center ">
              {errorMessage}
            </h4>
          ) : (
            <div className=" flex flex-col gap-[10px] workoutlist ">
              {allWorkouts.map((workout) => (
                <WorkoutItem
                  key={workout._id}
                  workout={workout}
                  isSelected={activeWorkoutId === workout._id}
                  onSelect={() => onSelectWorkout(workout._id)}
                />
              ))}
            </div>
          )}
        </div>
        <Link
          href={`/fitness/workouts/${selectedWorkout}`}
          className="w-[380px] h-[52px] rounded-[46px] px-[26px] py-[16px] bg-[#BCEC30] text-[rgba(0, 0, 0, 1)] text-[18px] text-center font-normal leading-[21px] cursor-pointer"
        >
          Начать
        </Link>
      </div>
    </div>
  );
}
