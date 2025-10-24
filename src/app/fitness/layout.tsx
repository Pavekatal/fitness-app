'use client';

import { ReactNode } from 'react';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { getAllCourses, getCourse } from '@/services/fitness/fitnessApi';
import {
  setAllCourses,
  setCurrentCourse,
  setErrorMessage,
  setIsLoading,
} from '@/store/features/workoutSlice';
import Header from '@/components/header/Header';
import { getUserData } from '@/services/auth/authApi';
import { setCurrentUser } from '@/store/features/authSlice';
import { useInitAuth } from '@/hooks/useInitAuth';

export default function FitnessLayout(props: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const { allCourses } = useAppSelector((state) => state.workouts);
  const pathname = usePathname();
  const params = useParams<{ course_id: string }>();

  useInitAuth();

  // Загрузка всех курсов
  useEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(setErrorMessage(''));

    if (!allCourses.length) {
      getAllCourses()
        .then((res) => {
          dispatch(setAllCourses(res));
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
    }
  }, [dispatch, allCourses]);

  // Загрузка данных о пользователе
  useEffect(() => {
    if (pathname.startsWith('/fitness/profile')) {
      dispatch(setErrorMessage(''));
      if (token) {
        dispatch(setIsLoading(true));
        const fetchUserData = async () => {
          return await getUserData(token);
        };
        fetchUserData()
          .then((res) => {
            if (res) {
              dispatch(setCurrentUser(res));
            } else {
              throw new Error();
            }
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
                dispatch(
                  setErrorMessage(
                    'Неизвестная ошибка. Попробуйте перезагрузить страницу',
                  ),
                );
              }
            }
          })
          .finally(() => {
            dispatch(setIsLoading(false));
          });
      }
    }
  }, [dispatch, pathname, token]);

  // Загрузка данных конкретного курса
  useEffect(() => {
    if (pathname.startsWith('/fitness/courses')) {
      dispatch(setErrorMessage(''));
      dispatch(setIsLoading(true));
      getCourse(params.course_id)
        .then((res) => {
          dispatch(setCurrentCourse(res));
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
              dispatch(
                setErrorMessage(
                  'Неизвестная ошибка. Попробуйте перезагрузить страницу',
                ),
              );
            }
          }
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    }
  }, [dispatch, pathname, params.course_id]);

  return (
    <div className="ml-[140px] mr-[140px] ">
      <header id="start">
        <Header />
      </header>
      <main className="mt-[60px]">{props.children}</main>
    </div>
  );
}
