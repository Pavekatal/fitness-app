'use client';

import Link from 'next/link';
import Button from '../button/Button';
import Logo from '../logo/Logo';

export default function Header() {
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
      <div>
        <Link href="/auth/sign-in">
          <Button className="w-[103px] bg-[#BCEC30] text-[rgba(0, 0, 0, 1)] text-[18px] font-normal leading-[21px] hover:bg-[#C6FF00]">
            Войти
          </Button>
        </Link>
      </div>
    </div>
  );
}
