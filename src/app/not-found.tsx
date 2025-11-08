import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 ">
      <div className="w-[343px] md:w-[90%] bg-white rounded-[30px] p-10 shadow-xl flex flex-col items-center gap-5">
        <h1 className="text-black text-[64px] font-medium leading-[70px]">
          404
        </h1>
        <h2 className="text-black text-[24px] md:text-[60px] font-medium leading-[28px] md:leading-[70px]">
          Страница не найдена
        </h2>
        <p className="text-black text-[17px] md:text-[32px]  font-normal md:leading-[36px] leading-[21px]">
          Перейти на{' '}
        </p>
        <Link
          className="text-black text-[17px] md:text-[32px] leading-[21px] md:leading-[36px] font-bold underline"
          href="/fitness/main"
        >
          главную страницу
        </Link>
      </div>
    </div>
  );
}
