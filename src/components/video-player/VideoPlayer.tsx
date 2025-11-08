import ReactPlayer from 'react-player';

type WorkoutVideoProps = {
  workoutSrc: string | undefined;
};

export default function VideoPlayer({ workoutSrc }: WorkoutVideoProps) {
  return (
    <div className="relative aspect-video w-full  overflow-hidden rounded-[30px] bg-gray-100">
      <ReactPlayer
        src={workoutSrc}
        width="100%"
        height="100%"
        controls
        light={false}
        className="absolute top-0 left-0 w-full h-full "
      />
      {/* <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={`absolute inset-0 flex items-center justify-center  ${
          isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
        }`}
      >
        <div className="rounded-full p-6">
          {isPlaying ? null : <PlayIcon />}
        </div>
      </button> */}
    </div>
  );
}
