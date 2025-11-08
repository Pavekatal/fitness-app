'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/button/Button';
import Course from '@/components/course/Course';
import WorkoutPop from '@/components/popups/workout-pop/WorkoutPop';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { logout } from '@/store/features/authSlice';
import {
  setErrorMessage,
  setIsLoading,
  setSelectedCourse,
} from '@/store/features/workoutSlice';
import { useAllWorkouts } from '@/hooks/useAllWorkouts';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { currentUser, token } = useAppSelector((state) => state.auth);
  const { allCourses } = useAppSelector((state) => state.workouts);
  const [openWorkoutPop, setOpenWorkoutPop] = useState<boolean>(false);
  const router = useRouter();
  const coursesUser = allCourses.filter((courses) =>
    currentUser?.selectedCourses?.includes(courses._id),
  );
  const { fetchAllWorkouts } = useAllWorkouts();

  const onWorkoutPop = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setOpenWorkoutPop(!openWorkoutPop);
    localStorage.setItem('selectCourseId', id);
    dispatch(setSelectedCourse(id));
    dispatch(setErrorMessage(''));
    dispatch(setIsLoading(true));
    fetchAllWorkouts(id, token);
  };

  const onLogout = () => {
    dispatch(logout());
    router.push('/fitness/main');
  };

  const onOverlayClick = () => {
    if (openWorkoutPop) {
      setOpenWorkoutPop(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col items-center gap-6 md:gap-15 mb-10">
        <div className="flex flex-col items-start md:w-full">
          <div className="flex items-start">
            <h2 className="text-black text-[24px] md:text-[40px] font-semibold leading-7 md:leading-[47px]">
              Профиль
            </h2>
          </div>
          <div className="mt-6 md:mt-7.5 w-[343px] md:w-full h-auto md:h-[257px] p-7.5 rounded-[30px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] bg-white flex flex-col md:flex-row gap-[30px] md:gap-[33px] items-center md:items-start">
            <Image
              width={197}
              height={197}
              src="/img/profile-page.png"
              alt="avatar user"
              className="w-[141px] md:w-[197px] h-[141px] md:h-[197px]  "
            />
            <div className="w-full flex flex-col items-start gap-5 md:gap-11">
              <div className="flex flex-col gap-5 md:gap-7.5 items-start">
                <h3 className="text-black text-[24px] md:text-[32px] font-medium leading-7 md:leading-[38px]">
                  {currentUser?.email}
                </h3>
                <p className="text-black text-[16px] md:text-lg font-normal leading-[19px] md:leading-[21px] ">
                  Логин: {currentUser?.email}
                </p>
              </div>
              <Button
                onClick={onLogout}
                className="w-full h-[50px] md:w-48 px-6.5 py-4 bg-transparent border border-solid border-black text-black text-[16px] md:text-lg font-normal leading-[19px] md:leading-[21px]  hover:bg-[#F7F7F7] focus:bg-[#E9ECED]"
              >
                Выйти
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start md:w-full">
          <div className="flex items-start">
            <h2 className="text-black text-[24px] md:text-[40px] font-semibold leading-7 md:leading-[47px]">
              Мои курсы
            </h2>
          </div>
          <div className="flex flex-col mt-6 md:w-full md:mt-10 mb-6 md:mb-[280px] md:flex-row md:flex-wrap gap-10">
            {coursesUser.length !== 0 ? (
              coursesUser.map((course) => (
                <Course
                  onWorkoutPop={onWorkoutPop}
                  key={course._id}
                  course={course}
                />
              ))
            ) : (
              <div className="w-full h-auto mt-10 mb-10  text-[38px] text-black bg-white p-10 text-center rounded-[30px] shadow-lg">
                У вас пока нет добавленных курсов
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col items-end">
          <a
            href="#start"
            className="block md:hidden w-[127px] h-[52px] rounded-[46px] px-[26px] py-4 bg-[#BCEC30] text-[rgba(0, 0, 0, 1)] text-[18px] font-normal leading-[21px] cursor-pointer"
          >
            Наверх &uarr;
          </a>
        </div>
      </div>
      <div onClick={onOverlayClick}>{openWorkoutPop && <WorkoutPop />}</div>
    </div>
  );
}
