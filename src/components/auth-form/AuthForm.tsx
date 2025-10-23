'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import Logo from '@/components/logo/Logo';
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import { UserAuthType } from '@/shared-types/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentUser } from '@/store/features/authSlice';
import { setIsLoading } from '@/store/features/workoutSlice';
import { login, registry } from '@/services/auth/authApi';
import { toast } from 'react-toastify';

type AuthFormProps = {
  isSignUp: boolean;
};

export default function AuthForm({ isSignUp }: AuthFormProps) {
  const dispatch = useAppDispatch();
  const { isLoading, errorMessage } = useAppSelector((state) => state.workouts);
  const [authDataField, setAuthDataField] = useState<UserAuthType>({
    email: '',
    password: '',
    repeatePassword: '',
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    repeatePassword: false,
  });
  const [error, setError] = useState<string>('');

  const router = useRouter();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: false, password: false, repeatePassword: false };

    if (!authDataField.email.trim()) {
      newErrors.email = true;
      setError('Заполните все поля');
      isValid = false;
    }

    if (!authDataField.password.trim()) {
      newErrors.password = true;
      setError('Заполните все поля');
      isValid = false;
    }

    if (isSignUp && !authDataField.repeatePassword?.trim()) {
      newErrors.repeatePassword = true;
      setError('Заполните все поля');
      isValid = false;
    }

    if (
      isSignUp &&
      authDataField.password.trim() !== authDataField.repeatePassword?.trim()
    ) {
      newErrors.password = true;
      newErrors.repeatePassword = true;
      setError('Пароли не совпадают. Повторите попытку');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onChangeAuthField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: false });
    setError('');
    setAuthDataField({ ...authDataField, [name]: value });
  };

  const onSubmitUserData = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(setIsLoading(true));

    const dataToSend = {
      email: authDataField.email,
      password: authDataField.password,
    };

    if (!isSignUp) {
      login(dataToSend)
        .then((res) => {
          dispatch(setCurrentUser(dataToSend));
          console.log(res.token);
          router.back();
          router.refresh();
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              setError(error.response.data.message);
            } else if (error.request) {
              setError(
                'Похоже, что-то с интернет-подключением... Попробуйте позже',
              );
            } else {
              setError('Возникла неизвестная ошибка, попробуйте позже');
            }
          }
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    } else {
      dispatch(setIsLoading(true));
      registry(dataToSend)
        .then((res) => {
          dispatch(setCurrentUser(dataToSend));
          console.log(res.message);
          toast(res.message);
          router.back();
          router.back();
          router.refresh();
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              setError(error.response.data.message);
            } else if (error.request) {
              setError(
                'Похоже, что-то с интернет-подключением... Попробуйте позже',
              );
            } else {
              setError('Возникла неизвестная ошибка, попробуйте позже');
            }
          }
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    }
  };

  return (
    <form className="flex flex-col items-center ">
      <div className="mb-[48px]  ">
        <Logo />
      </div>
      <div className="flex flex-col items-center gap-8.5">
        <div className="flex flex-col items-center gap-2.5">
          <Input
            onChange={onChangeAuthField}
            error={errors.email}
            id="email"
            name="email"
            value={authDataField.email}
            type="text"
            placeholder="Эл. почта"
            className="w-[280px] h-[52px] "
          />
          <Input
            onChange={onChangeAuthField}
            error={errors.password}
            id="password"
            name="password"
            value={authDataField.password}
            type="password"
            placeholder="Пароль"
            className="w-[280px] h-[52px]"
          />
          {isSignUp && (
            <Input
              onChange={onChangeAuthField}
              error={errors.repeatePassword}
              id="repeatePassword"
              name="repeatePassword"
              value={authDataField.repeatePassword}
              type="password"
              placeholder="Повторите пароль"
              className="w-[280px] h-[52px]"
            />
          )}
          {!errorMessage && (
            <p className="text-[rgba(219,0,48,1)] text-sm font-normal leading-[16px] text-center ">
              {error}
            </p>
          )}
        </div>
        <div className="flex flex-col items-center gap-2.5">
          <Button
            onClick={onSubmitUserData}
            className={`w-[280px] h-[52px] bg-[#BCEC30] px-[26px] py-[16px] text-black text-[18px] font-normal leading-[21px] hover:bg-[#C6FF00] focus:bg-black focus:text-white ${isLoading ? 'bg-[#F7F7F7] text-[#999999] pointer-events-none' : ''} `}
          >
            {!isSignUp ? 'Войти' : 'Зарегистрироваться'}
          </Button>

          <Link
            href={!isSignUp ? '/auth/sign-up' : '/auth/sign-in'}
            className={`rounded-[46px] text-center w-[280px] h-[52px] bg-transparent px-[26px] py-[16px] text-black text-[18px] font-normal leading-[21px] border border-solid border-black hover:bg-[#F7F7F7] focus:bg-[#E9ECED]   ${isLoading ? 'border-[1px_solid_-rgba(153,153,153,1)]' : ''} ${isLoading ? 'text-[#999999]' : ''} ${isLoading ? 'bg-transparent' : ''} ${isLoading ? 'pointer-events-none ' : ''} ' `}
          >
            {!isSignUp ? 'Зарегистрироваться' : 'Войти'}
          </Link>
        </div>
      </div>
    </form>
  );
}
