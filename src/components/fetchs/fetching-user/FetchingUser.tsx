'use client';

import { useUserData } from '@/hooks/useUserData';
import { getUserData } from '@/services/auth/authApi';
import { setCurrentUser } from '@/store/features/authSlice';
import { setErrorMessage, setIsLoading } from '@/store/features/workoutSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { AxiosError } from 'axios';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function FetchingUser() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const { fetchUserData } = useUserData();

  // Загрузка данных о пользователе
  useEffect(() => {
    if (pathname.startsWith('/fitness/profile')) {
      dispatch(setErrorMessage(''));
      if (token) {
        dispatch(setIsLoading(true));
        fetchUserData(token);
        // const fetchUserData = async () => {
        //   return await getUserData(token);
        // };
        // fetchUserData()
        //   .then((res) => {
        //     if (res) {
        //       dispatch(setCurrentUser(res));
        //     } else {
        //       throw new Error();
        //     }
        //   })
        //   .catch((error) => {
        //     if (error instanceof AxiosError) {
        //       if (error.response) {
        //         dispatch(setErrorMessage(error.response.data));
        //       } else if (error.request) {
        //         dispatch(
        //           setErrorMessage(
        //             'Похоже, что-то с интернет-соединением. Попробуйте позже',
        //           ),
        //         );
        //       } else {
        //         dispatch(
        //           setErrorMessage(
        //             'Неизвестная ошибка. Попробуйте перезагрузить страницу',
        //           ),
        //         );
        //       }
        //     }
        //   })
        //   .finally(() => {
        //     dispatch(setIsLoading(false));
        //   });
      }
    }
  }, [dispatch, pathname, token]);

  return <></>;
}
