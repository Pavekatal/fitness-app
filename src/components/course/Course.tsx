import { CourseType } from '@/shared-types/sharedTypes';
import Image from 'next/image';

type CourseProp = {
  course: CourseType;
};

export default function Course({ course }: CourseProp) {
  return (
    <div className="w-[360px] h-[501px] rounded-[30px] shadow-lg bg-white transition-transform duration-300 ease-in-out hover:scale-101">
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
            src="/img/add.svg"
            alt="add course"
            title="Добавить курс"
          />
        </button>
      </div>
      <div className="mt-[24px] mb-[15px] mx-[30px]">
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
      </div>
    </div>
  );
}
