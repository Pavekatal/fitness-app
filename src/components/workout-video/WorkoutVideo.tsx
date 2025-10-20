'use client';

import { useState } from 'react';
import ReactPlayer from 'react-player';
import PlayIcon from '../play-icon/PlayIcon';

type WorkoutVideoProps = {
  workoutSrc: string | undefined;
};

export default function WorkoutVideo({ workoutSrc }: WorkoutVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full  overflow-hidden rounded-[30px] bg-gray-100">
      <ReactPlayer
        src={workoutSrc}
        playing={isPlaying}
        width="100%"
        height="100%"
        controls={false}
        light={false}
        className="absolute top-0 left-0 w-full h-full "
        config={{
          youtube: {
            // @ts-ignore
            playerVars: {
              modestbranding: 1,
              showinfo: 0,
              rel: 0,
              fs: 0,
              controls: 0,
            },
          },
        }}
      />
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={`absolute inset-0 flex items-center justify-center  ${
          isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
        }`}
      >
        <div className="rounded-full p-6">
          {isPlaying ? null : <PlayIcon />}
        </div>
      </button>
    </div>
  );
}
