import Link from 'next/link';
import Logo from '@/components/logo/Logo';
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';

type AuthFormProps = {
  isSignUp: boolean;
};

export default function AuthForm({ isSignUp }: AuthFormProps) {
  return (
    <form className="flex flex-col items-center ">
      <div className="mb-[48px]  ">
        <Logo />
      </div>
      <div className="flex flex-col items-center gap-8.5">
        <div className="flex flex-col items-center gap-2.5">
          {isSignUp && (
            <Input
              id="email"
              name="email"
              type="text"
              placeholder="Эл. почта"
              className="w-[280px] h-[52px] "
            />
          )}
          <Input
            id="login"
            name="login"
            type="text"
            placeholder="Логин"
            className="w-[280px] h-[52px] "
          />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            className="w-[280px] h-[52px]"
            autoComplete="current password"
          />
          {isSignUp && (
            <Input
              id="repeat-password"
              name="repeat-password"
              type="password"
              placeholder="Повторите пароль"
              className="w-[280px] h-[52px]"
              autoComplete="current password"
            />
          )}
        </div>
        <div className="flex flex-col items-center gap-2.5">
          <Button className="w-[280px] h-[52px] bg-[#BCEC30] px-[26px] py-[16px] text-black text-[18px] font-normal leading-[21px] hover:bg-[#C6FF00] focus:bg-black focus:text-white">
            {!isSignUp ? 'Войти' : 'Зарегистрироваться'}
          </Button>
          <Link
            href={!isSignUp ? '/auth/sign-up' : '/auth/sign-in'}
            className="rounded-[46px] text-center w-[280px] h-[52px] bg-transparent px-[26px] py-[16px] text-black text-[18px] font-normal leading-[21px] border border-solid border-black hover:bg-[#F7F7F7] focus:bg-[#E9ECED]"
          >
            {!isSignUp ? 'Зарегистрироваться' : 'Войти'}
          </Link>
        </div>
      </div>
    </form>
  );
}
