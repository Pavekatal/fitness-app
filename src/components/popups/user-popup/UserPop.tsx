import Link from 'next/link';

export default function UserPop() {
  return (
    <div className="absolute mt-6 right-0 w-[266px] h-[258px] rounded-[30px] p-7.5 bg-white shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] flex flex-col items-center gap-8.5 z-100">
      <div className="flex flex-col items-center gap-2.5">
        <p className="text-black text-lg font-normal leading-[22px]">Сергей</p>
        <p className="text-[#999999] text-lg font-normal leading-[22px]">
          sergey.petrov96@mail.ru
        </p>
      </div>
      <div className="flex flex-col items-center gap-2.5">
        <Link
          href="/fitness/profile"
          className="w-[206px] h-[52px] px-[26px] py-[16px] rounded-[46px] bg-[#BCEC30] text-black text-lg font-normal leading-[21px] text-center  hover:bg-[#C6FF00] focus:bg-black focus:text-white"
        >
          Мой профиль
        </Link>
        <Link
          href="/fitness/main"
          className="w-[206px] h-[52px] px-[26px] py-[16px] rounded-[46px] bg-transparent text-black text-lg font-normal leading-[21px] text-center border border-solid border-black hover:bg-[#F7F7F7] focus:bg-[#E9ECED]"
        >
          Выйти
        </Link>
      </div>
    </div>
  );
}
