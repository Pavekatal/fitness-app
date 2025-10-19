import Button from '@/components/button/Button';
import WorkoutItem from '@/components/workout-item/WorkoutItem';
import { workouts } from '@/data';

export default function WorkoutPop() {
  const onFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black opacity-20 z-40"
        aria-hidden="true"
      />
      <div
        onClick={onFormClick}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-115 h-[609px] rounded-[30px] bg-white p-10 shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] flex flex-col z-50"
      >
        <h2 className="text-black text-[32px] font-normal leading-[38px]">
          Выберите тренировку
        </h2>
        <div className="h-[360px] mt-[48px] mb-[34px] flex workoutcontent">
          <div className=" flex flex-col gap-[10px] workoutlist ">
            {workouts.map((workout) => (
              <WorkoutItem key={workout._id} workout={workout} />
            ))}
          </div>
        </div>
        <Button className="w-[380px] h-[52px] bg-[#BCEC30] px-[26px] py-[16px] text-black text-lg font-normal leading-[21px] hover:bg-[#C6FF00] focus:bg-black focus:text-white">
          Начать
        </Button>
      </div>
    </div>
  );
}
