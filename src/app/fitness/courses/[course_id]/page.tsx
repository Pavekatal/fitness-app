'use client';

import { useParams } from 'next/navigation';
import { bannersCourses, courses } from '@/data';
import { BannerCourseType, CourseType } from '@/shared-types/sharedTypes';
import Button from '@/components/button/Button';
import Image from 'next/image';

export default function CoursePage() {
  const params = useParams<{ course_id: string }>();

  const course: CourseType | undefined = courses.find(
    (course) => course._id === params.course_id,
  );

  if (!courses) {
    console.log('Курс не найден');
  }

  const bannerCourse: BannerCourseType | undefined = bannersCourses.find(
    (banner) => banner._id === params.course_id,
  );

  return (
    <>
      <div className="flex flex-col gap-15">
        <div
          className="relative h-[310px] w-full bg-[#FFC700] bg-no-repeat bg-contain bg-right rounded-[30px]"
          style={{
            backgroundImage: `url(${bannerCourse?.banner})`,
            backgroundColor: `${bannerCourse?.bgc}`,
          }}
        >
          <h1 className="absolute top-10 left-10 text-white text-6xl font-medium leading-17.5 ">
            {course?.name}
          </h1>
        </div>
        <div>
          <h2 className="text-[rgba(0, 0, 0, 1)] text-[40px]  leading-[47px] font-semibold">
            Подойдет для вас, если:
          </h2>
          <div className="flex gap-[17px] mt-10">
            <span className="h-[141px] flex items-center gap-[25px] p-5 rounded-[28px] bg-radial-[at_25%_25%] from-[#151720] to-[#1E212E] to-75%">
              <h3 className="text-[#BCEC30] text-7xl font-medium leading-[88px]">
                1
              </h3>
              <p className="text-white text-2xl font-normal leading-[28px]">
                Давно хотели попробовать йогу, но не решались начать
              </p>
            </span>
            <span className="h-[141px] flex items-center gap-[25px] p-5 rounded-[28px] bg-radial-[at_25%_25%] from-[#151720] to-[#1E212E] to-75%">
              <h3 className="text-[#BCEC30] text-7xl font-medium leading-[88px]">
                2
              </h3>
              <p className="text-white text-2xl font-normal leading-[28px]">
                Хотите укрепить позвоночник, избавиться от болей в спине и
                суставах
              </p>
            </span>
            <span className="h-[141px] flex items-center gap-[25px] p-5 rounded-[28px] bg-radial-[at_25%_25%] from-[#151720] to-[#1E212E] to-75%">
              <h3 className="text-[#BCEC30] text-7xl font-medium leading-[88px]">
                3
              </h3>
              <p className="text-white text-2xl font-normal leading-[28px]">
                Ищете активность, полезную для тела и души
              </p>
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-[rgba(0, 0, 0, 1)] text-[40px]  leading-[47px] font-semibold">
            Направления
          </h2>
          <div className="h-auto w-full bg-[#BCEC30] rounded-[28px] p-7.5 mt-10 flex flex-wrap gap-x-[124px] gap-y-[34px]">
            {course?.directions.map((item, i) => (
              <p
                key={i}
                className="w-[284px] text-black text-2xl font-normal leading-[28px] sparcle "
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="relative  mb-12.5 h-[588px] w-full overflow-hidden">
        <div className="absolute bottom-0 w-full h-[486px] rounded-[30px] p-10 bg-white shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)]   flex ">
          <div className="w-[437px] flex flex-col gap-[28px]">
            <h2 className="text-black text-6xl font-medium leading-[70px] ">
              Начните путь к новому телу
            </h2>
            <ul className="list-disc list-inside text-black opacity-60 text-2xl font-normal leading-[28px]">
              <li>проработка всех групп мышц</li>
              <li>тренировка суставов</li>
              <li>улучшение циркуляции крови</li>
              <li>упражнения заряжают бодростью</li>
              <li>помогают противостоять стрессам</li>
            </ul>
            <Button className="w-[473px] px-6.5 py-4 bg-[#BCEC30] text-black text-lg font-normal leading-[21px]  hover:bg-[#C6FF00] focus:bg-black focus:text-white">
              Войдите, чтобы добавить курс
            </Button>
            <div className="flex-1"></div>
          </div>
        </div>

        <Image
          className="absolute z-50 right-[57px] top-[87px] scale-[1.4] "
          width={520}
          height={540}
          src="/img/start-up.png"
          alt="start-up"
        />
      </div>
    </>
  );
}
