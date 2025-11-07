'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { CourseType, WorkoutType } from '@/shared-types/sharedTypes';
import Button from '../button/Button';
import { bannersCourses } from '@/data';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setIsLoading } from '@/store/features/workoutSlice';
import { useAddCourse } from '@/hooks/useAddCourse';
import { usePercentageProgressCourse } from '@/hooks/useProgressCourse';
import { useDeleteCourse } from '@/hooks/useDeleteCourse';
import { useAllWorkouts } from '@/hooks/useAllWorkouts';

interface CourseProp {
  course: CourseType;
  onWorkoutPop?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => void;
  selectedCourse?: string | null;
}

export default function Course({ course, onWorkoutPop }: CourseProp) {
  const dispatch = useAppDispatch();
  const { isLoading, errorMessage } = useAppSelector((state) => state.workouts);
  const { token } = useAppSelector((state) => state.auth);
  const [localAllWorkout, setLocalAllWorkout] = useState<WorkoutType[]>([]);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isProfile: boolean = pathname.startsWith('/fitness/profile');
  const coverCourse = bannersCourses.find((cover) => cover._id === course._id);
  const { fetchAllWorkouts } = useAllWorkouts();
  const { onAddCourse } = useAddCourse();
  const { onDeleteCourse } = useDeleteCourse();

  useEffect(() => {
    if (pathname.startsWith('/fitness/profile')) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        dispatch(setIsLoading(true));
        if (course?._id && fetchAllWorkouts) {
          fetchAllWorkouts(course._id, token).then((res) => {
            setLocalAllWorkout(res);
          });
        }
      }, 1500);

      return () => {
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }
      };
    }
  }, [dispatch, token, course._id, pathname, fetchAllWorkouts]);

  const percentProgressCourse = usePercentageProgressCourse(
    course._id,
    localAllWorkout,
  );

  const valueProgress = (progress: number): string => {
    let textButton = '';

    if (progress === 0) {
      textButton = 'Начать тренировки';
    }
    if (progress > 0 && progress < 100) {
      textButton = 'Продолжить';
    }
    if (progress === 100) {
      textButton = 'Начать заново';
    }

    return textButton;
  };

  return (
    <>
      <Link href={`/fitness/courses/${course._id}`}>
        <div
          className={`w-[343px] md:w-[360px]  rounded-[30px] shadow-lg bg-white transition-transform duration-300 ease-in-out hover:scale-101  ${isLoading ? 'bg-white opacity-40 cursor-wait' : ''}`}
        >
          <div className="relative">
            <Image
              className=" rounded-[30px]"
              width={343}
              height={325}
              src={`${coverCourse?.cover}`}
              alt="yoga"
            />

            {!isProfile ? (
              <button
                onClick={(e) => onAddCourse(e, course._id)}
                className="absolute top-[20px] right-[20px] bg-none p-0 border-none cursor-pointer  rounded-full w-[32px] h-[32px] hover:scale-[1.1] hover:shadow-xl"
              >
                <Image
                  width={32}
                  height={32}
                  src="/img/add.svg"
                  alt="add course"
                  title="Добавить курс"
                />
              </button>
            ) : (
              <button
                onClick={(e) => onDeleteCourse(e, course._id)}
                className="absolute top-[20px] rounded-full right-[20px] bg-none p-0 border-none cursor-pointer w-[32px] h-[32px] hover:scale-[1.1] hover:shadow-xl"
              >
                <Image
                  width={32}
                  height={32}
                  src="/img/remove.svg"
                  alt="add course"
                  title="Удалить курс"
                />
              </button>
            )}
          </div>
          <div className="mt-[24px] pb-[15px] mx-[21px] md:mx-[30px]">
            <h3 className="text-[rgba(0, 0, 0, 1)] text-[24px] md:text-[32px] font-medium leading-[28px] md:leading-[38px]">
              {course.nameRU}
            </h3>
            <div className="flex gap-[6px] flex-wrap mt-[20px]">
              <div className="flex items-center gap-[6px] h-[38px] rounded-[50px] bg-[#F7F7F7] p-2.5">
                <Image
                  width={18}
                  height={18}
                  src="/img/calendar.svg"
                  alt="duration in days"
                />
                <p className="text-[rgba(32, 32, 32, 1)] text-[16px] font-normal leading-[19px]">
                  {course.durationInDays} дней
                </p>
              </div>
              <div className="flex items-center gap-[6px] h-[38px] rounded-[50px] bg-[#F7F7F7] p-2.5">
                <Image
                  width={18}
                  height={18}
                  src="/img/time.svg"
                  alt="daily duration in minutes"
                />
                <p className="text-[rgba(32, 32, 32, 1)] text-[16px] font-normal leading-[19px]">
                  {course.dailyDurationInMinutes.from}-
                  {course.dailyDurationInMinutes.to} мин/день
                </p>
              </div>
              <div className="flex items-center gap-[6px] h-[38px] rounded-[50px] bg-[#F7F7F7] p-2.5">
                <Image
                  width={18}
                  height={18}
                  src="/img/difficulty.png"
                  alt="difficulty"
                />
                <p className="text-[rgba(32, 32, 32, 1)] text-[16px] font-normal leading-[19px]">
                  Сложность
                </p>
              </div>
            </div>
            {isProfile && (
              <div className=" flex flex-col gap-10 mt-5">
                <div className="flex flex-col gap-2.5 items-start">
                  <p className="text-black text-lg font-normal leading-[21px]">
                    {isLoading
                      ? 'Получение данных...'
                      : errorMessage
                        ? errorMessage
                        : `Прогресс ${Math.round(percentProgressCourse)} %`}
                  </p>
                  <div className="w-full h-1.5 rounded-[50px] bg-[rgba(247,247,247,1)] overflow-hidden ">
                    <div
                      className=" h-full rounded-[50px] bg-[rgba(0,193,255,1)] duration-500 ease-in-out"
                      style={{ width: `${percentProgressCourse}%` }}
                    ></div>
                  </div>
                </div>
                {onWorkoutPop && (
                  <Button
                    onClick={(
                      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                    ) => onWorkoutPop(e, course._id)}
                    className="w-[300px] h-[52px] bg-[#BCEC30] px-[26px] py-[16px] text-black text-lg font-normal leading-[21px] hover:bg-[#C6FF00] focus:bg-black focus:text-white"
                  >
                    {valueProgress(percentProgressCourse)}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </>
  );
}
