import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import { progress } from '@/data';

type ProgressPopProps = {
  onSelect: () => void;
};

export default function ProgressPop({ onSelect }: ProgressPopProps) {
  const onFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-20 z-40"
        aria-hidden="true"
      />
      <div
        onClick={onFormClick}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[426px] h-[596px] p-10 rounded-[30px] shadow-[0p_4px_67px_-12px_rgba(0,0,0,0.13)] bg-white z-50"
      >
        <h2 className="text-black text-[32px]  font-normal leading-[38px]">
          Мой прогресс
        </h2>
        <div className="flex flex-col w-[346px] h-[347px] items-start gap-[20px] mt-[47px] mb-[34px] pr-5 workoutlist">
          {progress.map((item) => (
            <div
              key={item._id}
              className="flex flex-col items-start gap-[10px] mb-[1px]"
            >
              <p className=" w-[320px] h-10 text-black text-[18px] font-normal leading-[19px] ">
                Сколько раз вы сделали {item.name.toLowerCase()}?
              </p>
              <Input
                id={item._id}
                name={item.name}
                type="number"
                placeholder="0"
                className="w-[320px] h-[52px]"
              />
            </div>
          ))}
        </div>
        <Button
          onClick={onSelect}
          className="w-[346px] px-6.5 py-4 bg-[#BCEC30] text-black text-lg font-normal leading-[21px]  hover:bg-[#C6FF00] focus:bg-black focus:text-white "
        >
          Сохранить
        </Button>
      </div>
    </>
  );
}
