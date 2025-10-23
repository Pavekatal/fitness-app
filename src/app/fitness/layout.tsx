'use client';

import { ReactNode } from 'react';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getAllCourses } from '@/services/fitness/fitnessApi';
import {
  setAllCourses,
  setErrorMessage,
  setIsLoading,
} from '@/store/features/workoutSlice';

import Header from '@/components/header/Header';
import { usePathname } from 'next/navigation';
import { getUserData } from '@/services/auth/authApi';
import { setCurrentUser } from '@/store/features/authSlice';
import { useInitAuth } from '@/hooks/useInitAuth';

export default function FitnessLayout(props: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const { allCourses } = useAppSelector((state) => state.workouts);
  const pathname = usePathname();

  useInitAuth();

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

  return (
    <div className="ml-[140px] mr-[140px] ">
      <header id="start">
        <Header />
      </header>
      <main className="mt-[60px]">{props.children}</main>
    </div>
  );
}
