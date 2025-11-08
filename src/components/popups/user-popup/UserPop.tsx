'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import Button from '@/components/button/Button';
import { logout } from '@/store/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

type UserPopProps = {
  onClose: () => void;
};

export default function UserPop({ onClose }: UserPopProps) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const refPathname = useRef<string | null>(null);
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    if (refPathname.current && refPathname.current !== pathname) {
      onClose();
    }
    refPathname.current = pathname;
  }, [pathname, onClose]);

  const onLogout = () => {
    dispatch(logout());
    router.push('/fitness/main');
  };

  const onFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onFormClick}
      ref={ref}
      className="absolute mt-6 right-0 w-[266px] h-[258px] rounded-[30px] p-7.5 bg-white shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] flex flex-col items-center gap-8.5 z-100"
    >
      <div className="flex flex-col items-center gap-2.5">
        <p className="text-black text-lg font-normal leading-[22px]">
          {currentUser?.email}
        </p>
        <p className="text-[#999999] text-lg font-normal leading-[22px]">
          {currentUser?.email}
        </p>
      </div>
      <div className="flex flex-col items-center gap-2.5">
        <Link
          href="/fitness/profile"
          className="w-[206px] h-[52px] px-[26px] py-4 rounded-[46px] bg-[#BCEC30] text-black text-lg font-normal leading-[21px] text-center  hover:bg-[#C6FF00] focus:bg-black focus:text-white"
        >
          Мой профиль
        </Link>
        <Button
          onClick={onLogout}
          className="w-[206px] h-[52px] px-6.5 py-4 bg-transparent text-black text-lg font-normal leading-[21px] text-center border border-solid border-black hover:bg-[#F7F7F7] focus:bg-[#E9ECED]"
        >
          Выйти
        </Button>
      </div>
    </div>
  );
}
