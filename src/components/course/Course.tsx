'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { CourseType } from '@/shared-types/sharedTypes';
import Button from '../button/Button';
import { bannersCourses } from '@/data';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { deleteCourse } from '@/services/fitness/fitnessApi';
import { setIsLoading } from '@/store/features/workoutSlice';
import { useAddCourse } from '@/hooks/useAddCourse';

interface CourseProp {
  course: CourseType;
  onWorkoutPop: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => void;
  selectedCourse?: string | null;
}

export default function Course({ course, onWorkoutPop }: CourseProp) {
  const dispath = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.workouts);
  const { token } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const isProfile: boolean = pathname.startsWith('/fitness/profile');
  const coverCourse = bannersCourses.find((cover) => cover._id === course._id);
  const { onAddCourse } = useAddCourse();

  // const progressDataCourse = currentUser?.courseProgress

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

  const onDeleteCourse = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (token) {
      dispath(setIsLoading(true));
      deleteCourse(course._id, token)
        .then((res) => {
          toast.success(res.message);
          window.location.reload();
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
          dispath(setIsLoading(false));
        });
    }
  };

  return (
    <>
      <Link href={`/fitness/courses/${course._id}`}>
        <div
          className={`w-[360px]  rounded-[30px] shadow-lg bg-white transition-transform duration-300 ease-in-out hover:scale-101  ${isLoading ? 'bg-white opacity-40 cursor-wait' : ''}`}
        >
          <div className="relative">
            <Image
              className=" rounded-[30px]"
              width={360}
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
                onClick={onDeleteCourse}
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
          <div className="mt-[24px] pb-[15px] mx-[30px]">
            <h3 className="text-[rgba(0, 0, 0, 1)] text-[32px] font-medium leading-[38px]">
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
                    Прогресс {course.difficulty} %
                  </p>
                  <div className="w-full h-1.5 rounded-[50px] bg-[rgba(247,247,247,1)] overflow-hidden ">
                    <div
                      className=" h-full rounded-[50px] bg-[rgba(0,193,255,1)] duration-500 ease-in-out"
                      style={{ width: `${course.difficulty}%` }}
                    ></div>
                  </div>
                </div>
                <Button
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                  ) => onWorkoutPop(e, course._id)}
                  className="w-[300px] h-[52px] bg-[#BCEC30] px-[26px] py-[16px] text-black text-lg font-normal leading-[21px] hover:bg-[#C6FF00] focus:bg-black focus:text-white"
                >
                  {valueProgress(course.order)}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Link>
    </>
  );
}
