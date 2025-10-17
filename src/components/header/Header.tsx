'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import Button from '../button/Button';
import Logo from '../logo/Logo';
import UserPop from '../popups/user-popup/UserPop';

export default function Header() {
  const [isAuth, setIsAuth] = useState<boolean>(true);
  const [openUserPop, setOpenUserPop] = useState<boolean>(false);

  const onOpenUserPop = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setOpenUserPop(!openUserPop);
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
      {!isAuth ? (
        <div>
          <Link href="/auth/sign-in">
            <Button className="w-[103px] bg-[#BCEC30] text-[rgba(0, 0, 0, 1)] text-[18px] font-normal leading-[21px] hover:bg-[#C6FF00]">
              Войти
            </Button>
          </Link>
        </div>
      ) : (
        /* временная функция клика */
        <div className="relative" onClick={() => setIsAuth(!isAuth)}>
          <div onClick={onOpenUserPop} className="flex items-center gap-4">
            <Image width={50} height={50} src="/img/prof.svg" alt="profile" />
            <p className="flex items-center text-black text-2xl font-normal leading-[28px] profile">
              Сергей
            </p>
          </div>
          {openUserPop && <UserPop />}
        </div>
      )}
    </div>
  );
}
