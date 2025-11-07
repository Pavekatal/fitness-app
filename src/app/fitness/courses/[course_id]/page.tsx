'use client';

import Image from 'next/image';
import Link from 'next/link';

import { bannersCourses } from '@/data';
import { BannerCourseType } from '@/shared-types/sharedTypes';
import Button from '@/components/button/Button';
import { useAppSelector } from '@/store/store';
import ErrorMessageContent from '@/components/error-message/ErrorMessageContent';
import { useAddCourse } from '@/hooks/useAddCourse';
import { useDeleteCourse } from '@/hooks/useDeleteCourse';

export default function CoursePage() {
  const { currentCourse, errorMessage } = useAppSelector(
    (state) => state.workouts,
  );
  const { token, currentUser } = useAppSelector((state) => state.auth);
  const { onAddCourse } = useAddCourse();
  const { onDeleteCourse } = useDeleteCourse();
  const bannerCourse: BannerCourseType | undefined = bannersCourses.find(
    (banner) => banner._id === currentCourse?._id,
  );
  const isSelectedCourses = currentUser?.selectedCourses?.find(
    (courseId) => courseId === currentCourse?._id,
  );

  const onAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (currentCourse) {
      onAddCourse(e, currentCourse?._id);
    }
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (currentCourse) {
      onDeleteCourse(e, currentCourse?._id);
    }
  };

  return (
    <>
      {errorMessage ? (
        <ErrorMessageContent />
      ) : (
        <>
          <div className="flex flex-col items-center gap-10 md:gap-15">
            <div
              className="hidden md:relative h-[310px] w-full bg-no-repeat bg-contain bg-right rounded-[30px]"
              style={{
                backgroundImage: `url(${bannerCourse?.banner})`,
                backgroundColor: `${bannerCourse?.bgc}`,
              }}
            >
              <h1 className="hidden md:absolute top-10 left-10 text-white text-6xl font-medium leading-17.5 ">
                {currentCourse?.nameRU}
              </h1>
            </div>
            <div
              className="block md:hidden w-[343px] h-[389px] rounded-[30px] bg-no-repeat bg-contain bg-bottom"
              style={{
                backgroundImage: `url(${bannerCourse?.cover})`,
                backgroundColor: `${bannerCourse?.bgc}`,
              }}
            ></div>
            <div>
              <h2 className="text-[rgba(0, 0, 0, 1)] text-[24px] md:text-[40px]  leading-[28px] md:leading-[47px] font-semibold">
                Подойдет для вас, если:
              </h2>
              <div className="flex flex-col md:flex-row gap-[17px] mt-6 md:mt-10">
                {currentCourse?.fitting.map((item, i) => (
                  <span
                    key={i}
                    className="h-[141px] flex items-center gap-[25px] p-5 rounded-[28px] bg-radial-[at_25%_25%] from-[#151720] to-[#1E212E] to-75%"
                  >
                    <h3 className="text-[#BCEC30] text-[75px] md:text-7xl font-medium leading-[88px]">
                      {i + 1}
                    </h3>
                    <p className="text-white text-[18px] md:text-2xl font-normal leading-[21px] md:leading-[28px]">
                      {item}
                    </p>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-[rgba(0, 0, 0, 1)] text-[24px] md:text-[40px] leading-[28px] md:leading-[47px] font-semibold">
                Направления
              </h2>
              <div className="h-auto w-full bg-[#BCEC30] rounded-[28px] p-7.5 mt-6 md:mt-10 flex flex-col md:flex-row md:flex-wrap gap-6 md:gap-x-[124px] md:gap-y-[34px]">
                {currentCourse?.directions.map((item, i) => (
                  <p
                    key={i}
                    className="w-[284px] text-black text-[18px] md:text-2xl font-normal leading-[21px] md:leading-[28px] sparcle "
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="relative mb-[30px] md:mb-12.5 h-[568px] md:h-[588px] w-[343px] md:w-full md:overflow-hidden">
            <div className="absolute bottom-0 w-[343px] md:w-full h-[412px] md:h-[486px] rounded-[30px] p-[30px] md:p-10 bg-white shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)]   flex z-60 md:z-10 ">
              <div className="w-[283px] md:w-[437px] flex flex-col gap-[28px]">
                <h2 className="text-black text-[32px] md:text-6xl font-medium leading-[38px] md:leading-[70px] ">
                  Начните путь к новому телу
                </h2>
                <ul className="list-disc list-outside pl-[30px] text-black opacity-60 text-[18px] md:text-2xl font-normal leading-[21px] md:leading-[28px]">
                  <li className="pb-[4px]">проработка всех групп мышц</li>
                  <li className="pb-[4px]">тренировка суставов</li>
                  <li className="pb-[4px]">улучшение циркуляции крови</li>
                  <li className="pb-[4px]">упражнения заряжают бодростью</li>
                  <li className="pb-[4px]">помогают противостоять стрессам</li>
                </ul>
                {!token ? (
                  <Link
                    href="/auth/sign-in"
                    className="w-[283px] md:w-[437px] h-[50px] md:h-[52px] px-6.5 py-4 rounded-[46px] bg-[#BCEC30] text-black text-[16px] md:text-lg font-normal leading-[19px] md:leading-[21px] text-center cursor-pointer hover:bg-[#C6FF00] focus:bg-black focus:text-white"
                  >
                    Войдите, чтобы добавить курс
                  </Link>
                ) : !isSelectedCourses ? (
                  <Button
                    onClick={onAdd}
                    className="w-[283px] md:w-[437px] h-[50px] px-6.5 py-4 bg-[#BCEC30] text-black text-[16px] md:text-lg font-normal leading-[19px] md:leading-[21px] cursor-pointer hover:bg-[#C6FF00] focus:bg-black focus:text-white"
                  >
                    Добавить курс
                  </Button>
                ) : (
                  <Button
                    onClick={onDelete}
                    className="w-[283px] md:w-[437px] h-[50px] px-6.5 py-4 bg-[#BCEC30] text-black text-[16px] md:text-lg font-normal leading-[19px] md:leading-[21px] cursor-pointer hover:bg-[#C6FF00] focus:bg-black focus:text-white"
                  >
                    Удалить курс
                  </Button>
                )}
                <div className="flex-1"></div>
              </div>
            </div>
            <Image
              className="absolute z-50 right-[-28px] md:right-[57px] top-[-28px] md:top-[87px] scale-[1.51] md:scale-[1.4] "
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
