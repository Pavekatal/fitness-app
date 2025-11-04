'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import Button from '../button/Button';
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
    <div className="flex items-center justify-between mt-[50px]">
      <div className="flex flex-col items-start gap-[15px] ">
        <Link href="/fitness/main">
          <Logo />
        </Link>

        <p className=" text-[18px] text-[#999999]">
          Онлайн-тренировки для занятий дома
        </p>
      </div>
      {!currentUser ? (
        <div>
          <Link href="/auth/sign-in">
            <Button className="w-[103px] bg-[#BCEC30] text-[rgba(0, 0, 0, 1)] text-[18px] font-normal leading-[21px] hover:bg-[#C6FF00]">
              Войти
            </Button>
          </Link>
        </div>
      ) : (
        <div className="relative">
          <div onClick={onOpenUserPop} className="flex items-center gap-4">
            <Image width={50} height={50} src="/img/prof.svg" alt="profile" />
            <p className="flex items-center text-black text-2xl font-normal leading-[28px] profile">
              {currentUser.email}
            </p>
          </div>
          <div>{openUserPop && <UserPop onClose={onOverlayClick} />}</div>
        </div>
      )}
    </div>
  );
}
