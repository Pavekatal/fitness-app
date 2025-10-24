'use client';

import Image from 'next/image';
import Link from 'next/link';

import { bannersCourses } from '@/data';
import { BannerCourseType } from '@/shared-types/sharedTypes';
import Button from '@/components/button/Button';
import { useAppSelector } from '@/store/store';
import ErrorMessageContent from '@/components/error-message/ErrorMessageContent';
import { useAddCourse } from '@/hooks/useAddCourse';

export default function CoursePage() {
  const { currentCourse, errorMessage } = useAppSelector(
    (state) => state.workouts,
  );
  const { token } = useAppSelector((state) => state.auth);
  const { onAddCourse } = useAddCourse();

  const onAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (currentCourse) {
      onAddCourse(e, currentCourse?._id);
    }
  };

  const bannerCourse: BannerCourseType | undefined = bannersCourses.find(
    (banner) => banner._id === currentCourse?._id,
  );

  return (
    <>
      {errorMessage ? (
        <ErrorMessageContent />
      ) : (
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
                {currentCourse?.nameRU}
              </h1>
            </div>
            <div>
              <h2 className="text-[rgba(0, 0, 0, 1)] text-[40px]  leading-[47px] font-semibold">
                Подойдет для вас, если:
              </h2>
              <div className="flex gap-[17px] mt-10">
                {currentCourse?.fitting.map((item, i) => (
                  <span
                    key={i}
                    className="h-[141px] flex items-center gap-[25px] p-5 rounded-[28px] bg-radial-[at_25%_25%] from-[#151720] to-[#1E212E] to-75%"
                  >
                    <h3 className="text-[#BCEC30] text-7xl font-medium leading-[88px]">
                      {i + 1}
                    </h3>
                    <p className="text-white text-2xl font-normal leading-[28px]">
                      {item}
                    </p>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-[rgba(0, 0, 0, 1)] text-[40px]  leading-[47px] font-semibold">
                Направления
              </h2>
              <div className="h-auto w-full bg-[#BCEC30] rounded-[28px] p-7.5 mt-10 flex flex-wrap gap-x-[124px] gap-y-[34px]">
                {currentCourse?.directions.map((item, i) => (
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
                <ul className="list-disc list-outside pl-[30px] text-black opacity-60 text-2xl font-normal leading-[28px]">
                  {/* {course?.fitting.map((item, i) => (
                <li className="pb-[4px]" key={i}>
                  {item}
                </li>
              ))} */}
                  <li className="pb-[4px]">проработка всех групп мышц</li>
                  <li className="pb-[4px]">тренировка суставов</li>
                  <li className="pb-[4px]">улучшение циркуляции крови</li>
                  <li className="pb-[4px]">упражнения заряжают бодростью</li>
                  <li className="pb-[4px]">помогают противостоять стрессам</li>
                </ul>
                {!token ? (
                  <Link href="/auth/sign-in">
                    <Button className="w-[437px] px-6.5 py-4 bg-[#BCEC30] text-black text-lg font-normal leading-[21px] cursor-pointer hover:bg-[#C6FF00] focus:bg-black focus:text-white">
                      Войдите, чтобы добавить курс
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={onAdd}
                    className="w-[437px] px-6.5 py-4 bg-[#BCEC30] text-black text-lg font-normal leading-[21px] cursor-pointer hover:bg-[#C6FF00] focus:bg-black focus:text-white"
                  >
                    Добавить курс
                  </Button>
                )}

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
      )}
    </>
  );
}
