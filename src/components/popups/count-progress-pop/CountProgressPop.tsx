import Image from 'next/image';

type CountProgressPopProps = {
  errorResult: string;
};

export default function CountProgressPop({
  errorResult,
}: CountProgressPopProps) {
  const onFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };
  console.log('errorResult', errorResult);

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-20 z-70"
        aria-hidden="true"
      />
      <div
        onClick={onFormClick}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[426px] min-h-[270px] bg-white rounded-[30px] p-10 shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] z-80 flex flex-col items-center gap-[34px] "
      >
        <h1 className="text-black  text-[40px] font-semibold text-center leading-[47px]">
          {`${errorResult ? errorResult : 'Ваш прогресс засчитан!'}`}
        </h1>
        {!errorResult && (
          <div className="w-[68px] h-[68px] p-[5px] ">
            <Image
              width={68}
              height={68}
              src="/img/checked-workout.svg"
              alt="checked workout"
            />
          </div>
        )}
      </div>
    </>
  );
}
