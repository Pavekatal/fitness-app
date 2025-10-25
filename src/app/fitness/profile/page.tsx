'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

import Button from '@/components/button/Button';
import Course from '@/components/course/Course';
import WorkoutPop from '@/components/popups/workout-pop/WorkoutPop';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { logout } from '@/store/features/authSlice';
import { getAllWorkouts } from '@/services/fitness/fitnessApi';
import {
  setAllWorkouts,
  setErrorMessage,
  setIsLoading,
} from '@/store/features/workoutSlice';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { currentUser, token } = useAppSelector((state) => state.auth);
  const { allCourses } = useAppSelector((state) => state.workouts);
  const [openWorkoutPop, setOpenWorkoutPop] = useState<boolean>(false);

  const router = useRouter();

  const coursesUser = allCourses.filter((courses) =>
    currentUser?.selectedCourses?.includes(courses._id),
  );

  const onWorkoutPop = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setOpenWorkoutPop(!openWorkoutPop);
    dispatch(setErrorMessage(''));

    dispatch(setIsLoading(true));
    getAllWorkouts(id, token)
      .then((res) => {
        dispatch(setAllWorkouts(res));
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            dispatch(setErrorMessage(error.response.data));
          } else if (error.request) {
            dispatch(
              setErrorMessage(
                'Похоже, что-то с интернет-соединением. Попробуйте позже',
              ),
            );
          } else {
            setErrorMessage(
              'Неизвестная ошибка. Попробуйте перезагрузить страницу',
            );
          }
        }
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
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
      <div className="flex flex-col gap-15">
        <div>
          <h2 className="text-black text-[40px] font-semibold leading-[47px]">
            Профиль
          </h2>
          <div className="mt-7.5 w-full h-[257px] p-7.5 rounded-[30px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] bg-white flex gap-[33px] items-start">
            <Image
              width={197}
              height={197}
              src="/img/profile-page.png"
              alt="avatar user"
            />
            <div className="flex flex-col items-start gap-11">
              <div className="flex flex-col gap-7.5 items-start">
                <h3 className="text-black text-[32px] font-medium leading-[38px]">
                  {currentUser?.email}
                </h3>
                <p className="text-black text-lg font-normal leading-[21px] ">
                  Логин: {currentUser?.email}
                </p>
              </div>
              <Button
                onClick={onLogout}
                className="w-[192px] px-6.5 py-4 bg-transparent border border-solid border-black text-black text-lg font-normal leading-[21px]  hover:bg-[#F7F7F7] focus:bg-[#E9ECED]"
              >
                Выйти
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-black text-[40px] font-semibold leading-[47px]">
            Мои курсы
          </h2>
          <div className="mt-10 mb-[280px] flex flex-wrap gap-10">
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
      </div>
      <div onClick={onOverlayClick}>{openWorkoutPop && <WorkoutPop />}</div>
    </div>
  );
}
