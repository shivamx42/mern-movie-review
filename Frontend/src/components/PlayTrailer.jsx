import React from 'react';
import YouTube from 'react-youtube';
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function PlayTrailer({ trailerId, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">

      <div className="border-2 border-black dark:border-slate-50 z-10 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 font-bold"
        >
          <IoMdCloseCircleOutline 
            size={20}
            color='white'
          />
        </button>
        <YouTube
          videoId={trailerId}
          className='w-80 md:w-[600px] h-80 md:h-96'
          opts={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </div>
  );
}
