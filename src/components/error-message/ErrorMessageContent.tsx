import { useAppSelector } from '@/store/store';

export default function ErrorMessageContent() {
  const { errorMessage } = useAppSelector((state) => state.workouts);

  return (
    <div className="w-full h-auto mt-10 mb-10  text-[46px] text-black bg-white p-10 text-center rounded-[30px] shadow-lg">
      {errorMessage}
    </div>
  );
}
