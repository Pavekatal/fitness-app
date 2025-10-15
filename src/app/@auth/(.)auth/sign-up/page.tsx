'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AuthForm from '@/components/auth-form/AuthForm';

export default function SignInModal() {
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back();
    };
    window.addEventListener('keydown', onKeyDown);
  }, [router]);

  const onOverlayClick = () => router.back();
  const onFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      <div onClick={onOverlayClick} className="absolute inset-0 bg-black/20 " />
      <div
        onClick={onFormClick}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[360px]"
      >
        {' '}
        <div className="w-[360px] bg-white rounded-[30px] p-10 shadow-xl">
          <AuthForm isSignUp={true} />
        </div>
      </div>
    </div>
  );
}
