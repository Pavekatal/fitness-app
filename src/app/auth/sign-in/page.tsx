import AuthForm from '@/components/auth-form/AuthForm';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 ">
      <div className="w-[343px] md:w-[360px] bg-white rounded-[30px] p-10 shadow-xl">
        <AuthForm isSignUp={false} />
      </div>
    </div>
  );
}
