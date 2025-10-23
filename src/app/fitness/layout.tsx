'use client';

import { ReactNode } from 'react';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getAllCourses } from '@/services/fitness/fitnessApi';
import { setAllCourses, setErrorMessage } from '@/store/features/workoutSlice';

import Header from '@/components/header/Header';

export default function FitnessLayout(props: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { allCourses } = useAppSelector((state) => state.workouts);

  useEffect(() => {
    getAllCourses()
      .then((res) => {
        dispatch(setAllCourses(res));
        console.log('allCourses:', allCourses);
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
      });
  }, [dispatch]);

  return (
    <div className="ml-[140px] mr-[140px] ">
      <header id="start">
        <Header />
      </header>
      <main className="mt-[60px]">{props.children}</main>
    </div>
  );
}
