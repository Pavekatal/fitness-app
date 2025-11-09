'use client';

import { useUserData } from '@/hooks/useUserData';

import { setErrorMessage, setIsLoading } from '@/store/features/workoutSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
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
      }
    }
  }, [dispatch, pathname, token]);

  return <></>;
}
