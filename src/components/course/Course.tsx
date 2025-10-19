'use client';

import { CourseType } from '@/shared-types/sharedTypes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '../button/Button';

interface CourseProp {
  course: CourseType;
  onWorkoutPop?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Course({ course, onWorkoutPop }: CourseProp) {
  const pathname = usePathname();

  const isProfile: boolean = pathname.startsWith('/fitness/profile');
  console.log(isProfile);

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
        <div className="w-[360px]  rounded-[30px] shadow-lg bg-white transition-transform duration-300 ease-in-out hover:scale-101">
          <div className="relative">
            <Image
              className=" rounded-[30px]"
              width={360}
              height={325}
              src={`${course.cover}`}
              alt="yoga"
            />

            <button className="absolute top-[20px] right-[20px] bg-none p-0 border-none cursor-pointer w-[32px] h-[32px]">
              <Image
                width={32}
                height={32}
                src={!isProfile ? '/img/add.svg' : '/img/remove.svg'}
                alt="add course"
                title={!isProfile ? 'Добавить курс' : 'Удалить курс'}
              />
            </button>
          </div>
          <div className="mt-[24px] pb-[15px] mx-[30px]">
            <h3 className="text-[rgba(0, 0, 0, 1)] text-[32px] font-medium leading-[38px]">
              {course.name}
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
                    Прогресс {course.progress} %
                  </p>
                  <div className="w-full h-1.5 rounded-[50px] bg-[rgba(247,247,247,1)] overflow-hidden ">
                    <div
                      className=" h-full rounded-[50px] bg-[rgba(0,193,255,1)] duration-500 ease-in-out"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <Button
                  onClick={onWorkoutPop}
                  className="w-[300px] h-[52px] bg-[#BCEC30] px-[26px] py-[16px] text-black text-lg font-normal leading-[21px] hover:bg-[#C6FF00] focus:bg-black focus:text-white"
                >
                  {valueProgress(course.progress)}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Link>
    </>
  );
}
