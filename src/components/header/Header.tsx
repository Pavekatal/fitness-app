'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import Logo from '../logo/Logo';
import UserPop from '../popups/user-popup/UserPop';
import { useAppSelector } from '@/store/store';

export default function Header() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [openUserPop, setOpenUserPop] = useState<boolean>(false);

  const onOpenUserPop = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setOpenUserPop(!openUserPop);
  };

  const onOverlayClick = () => {
    if (openUserPop) {
      setOpenUserPop(false);
    }
  };

  return (
    <div className="flex items-center justify-between mt-10 md:mt-[50px]">
      <div className="flex flex-col items-start gap-[15px] ">
        <Link href="/fitness/main">
          <Logo />
        </Link>

        <p className="hidden md:block md:text-[18px] text-[#999999]">
          Онлайн-тренировки для занятий дома
        </p>
      </div>
      {!currentUser ? (
        <Link
          href="/auth/sign-in"
          className="min-w-[83px] md:w-[103px] max-h-9 md:max-h-[52px] bg-[#BCEC30] px-4 md:px-[26px] py-2 md:py-4 rounded-[46px] text-center text-[rgba(0, 0, 0, 1)] text-[18px] font-normal leading-[19px] hover:bg-[#C6FF00] focus:bg-black focus:text-white"
        >
          Войти
        </Link>
      ) : (
        <div className="relative">
          <div onClick={onOpenUserPop} className="flex items-center  profile">
            <Image
              width={50}
              height={50}
              src="/img/prof.svg"
              alt="profile"
              className="w-9 h-9 md:w-[50px] md:h-[50px]"
            />
            <p className="hidden md:flex items-center ml-4 text-black text-2xl font-normal leading-[28px] ">
              {currentUser.email}
            </p>
          </div>
          <div>{openUserPop && <UserPop onClose={onOverlayClick} />}</div>
        </div>
      )}
    </div>
  );
}
