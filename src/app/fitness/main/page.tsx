'use client';

import { useAppSelector } from '@/store/store';
import Courses from '@/components/courses/Courses';

export default function Home() {
  const { errorMessage } = useAppSelector((state) => state.workouts);

  return (
    <>
      <section className="flex justify-between ">
        <h1 className="text-[#202020] text-[60px] font-medium leading-[70px] ">
          Начните заниматься спортом и улучшите качество жизни
        </h1>
        <div>
          <div className="relative bg-[#BCEC30] text-[#202020] text-[32px] w-[288px] h-[102px] px-[20px] py-[16px] font-normal leading-[38px] triangle">
            Измени своё тело за полгода!
            <div className="absolute w-0; h-0; border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[40px] border-t-[#BCEC30] rotate-[40deg] top-[90px] left-[120px]"></div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center mb-[81px]">
        {errorMessage ? (
          <div className="w-full h-auto mt-10 mb-10  text-[46px] text-black bg-white p-10 text-center rounded-[30px] shadow-lg">
            {errorMessage}
          </div>
        ) : (
          <>
            <Courses />
            <a
              href="#start"
              className="w-[127px] h-[52px] rounded-[46px] px-[26px] py-[16px] bg-[#BCEC30] text-[rgba(0, 0, 0, 1)] text-[18px] font-normal leading-[21px] cursor-pointer"
            >
              Наверх &uarr;
            </a>
          </>
        )}
      </section>
    </>
  );
}
