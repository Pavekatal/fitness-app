'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { useInitAuth } from '@/hooks/useInitAuth';
import { setErrorMessage } from '@/store/features/workoutSlice';
import { useAppDispatch } from '@/store/store';

export default function InitAuthAndClearError() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(setErrorMessage(''));
  }, [pathname, dispatch]);

  useInitAuth();
  return <></>;
}
