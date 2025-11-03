'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import WorkoutItem from '@/components/workout-item/WorkoutItem';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setIsLoading,
  setSelectedWorkout,
} from '@/store/features/workoutSlice';
import { deleteProgress } from '@/services/fitness/fitnessApi';
import Button from '@/components/button/Button';

import { useUserData } from '@/hooks/useUserData';

export default function WorkoutPop() {
  const dispatch = useAppDispatch();
  const {
    allWorkouts,
    selectedWorkout,
    selectedCourse,
    isLoading,
    errorMessage,
  } = useAppSelector((state) => state.workouts);
  const { token, currentUser } = useAppSelector((state) => state.auth);
  const [activeWorkoutId, setActiveWorkoutId] = useState<string | null>(null);
  const [currentStatusWorkout, setCurrentStatusWokout] = useState<
    'start' | 'delete' | null
  >(null);

  const courseProgress = currentUser?.courseProgress?.find(
    (progress) => progress.courseId === selectedCourse,
  );
  const courseCompleted = courseProgress?.courseCompleted;
  const { fetchUserData } = useUserData();

  const onFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const onSelectWorkout = (id: string) => {
    setActiveWorkoutId(id);
    dispatch(setSelectedWorkout(id));

    const workoutProgressItem = courseProgress?.workoutsProgress.find(
      (work) => work.workoutId === id,
    );

    if (workoutProgressItem?.workoutCompleted) {
      setCurrentStatusWokout('delete');
    } else {
      setCurrentStatusWokout('start');
    }
  };

  const onDeleteProgress = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (token && selectedCourse && activeWorkoutId) {
      dispatch(setIsLoading(true));
      if (!activeWorkoutId) {
        toast.warn('Выберите тренировку, которую хотите удалить');
        return;
      }
      deleteProgress(token, selectedCourse, activeWorkoutId)
        .then((res) => {
          toast.success(res.message);
          fetchUserData(token);
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              toast.error(error.response.data);
            } else if (error.request) {
              toast.error(
                'Похоже, что-то с интернет-соединением. Попробуйте позже',
              );
            } else {
              toast.error(
                'Неизвестная ошибка. Попробуйте перезагрузить страницу',
              );
            }
          }
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    }
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
              {allWorkouts.map((workout) => {
                return (
                  <WorkoutItem
                    key={workout._id}
                    workout={workout}
                    courseProgress={courseProgress}
                    isSelected={activeWorkoutId === workout._id}
                    onSelect={() => onSelectWorkout(workout._id)}
                  />
                );
              })}
            </div>
          )}
        </div>
        {activeWorkoutId === null ? (
          courseCompleted ? (
            <Button
              onClick={onDeleteProgress}
              className="w-[380px] h-[52px] bg-[#BCEC30] px-[26px] py-[16px] text-black text-lg font-normal leading-[21px] hover:bg-[#C6FF00] focus:bg-black focus:text-white"
            >
              Удалить прогресс
            </Button>
          ) : (
            <Link
              href={`/fitness/workouts/${selectedWorkout}`}
              className="w-[380px] h-[52px] rounded-[46px] px-[26px] py-[16px] bg-[#BCEC30] text-[rgba(0, 0, 0, 1)] text-[18px] text-center font-normal leading-[21px] cursor-pointer"
            >
              Начать
            </Link>
          )
        ) : currentStatusWorkout === 'delete' ? (
          <Button
            onClick={onDeleteProgress}
            className="w-[380px] h-[52px] bg-[#BCEC30] px-[26px] py-[16px] text-black text-lg font-normal leading-[21px] hover:bg-[#C6FF00] focus:bg-black focus:text-white"
          >
            Удалить прогресс
          </Button>
        ) : (
          <Link
            href={`/fitness/workouts/${selectedWorkout}`}
            className="w-[380px] h-[52px] rounded-[46px] px-[26px] py-[16px] bg-[#BCEC30] text-[rgba(0, 0, 0, 1)] text-[18px] text-center font-normal leading-[21px] cursor-pointer"
          >
            Начать
          </Link>
        )}
      </div>
    </div>
  );
}
