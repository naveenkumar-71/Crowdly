// frontend/src/components/ReelComponents/Reel.jsx
import React, { useRef, useState } from 'react';
import ReelHeader from './ReelHeader';
import ReelFooter from './ReelFooter';

function Reel({ reel }) {
  if (!reel) return null;

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative h-screen w-full snap-start bg-white flex items-center justify-center">
      {/* Main content */}
      <div className="relative flex items-center justify-center w-full max-w-7xl mx-auto">
        
        {/* CENTER - Video */}
        <div className="relative flex-shrink-0">
          <video
            ref={videoRef}
            src={reel.videoUrl}
            className="h-[75vh] w-[420px] object-cover rounded-lg"
            loop
            muted
            playsInline
            onClick={togglePlay}
          />

          {/* Play/Pause indicator */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
              <div className="bg-black/60 rounded-full p-5 hover:bg-black/70 transition">
                <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          )}

          {/* Mute button */}
          <button className="absolute bottom-4 right-4 bg-black/50 rounded-full p-2 hover:bg-black/70 transition">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          </button>
        </div>

        {/* RIGHT - Action buttons */}
        <div className="absolute right-20 top-1/2 -translate-y-1/2">
          <ReelFooter 
            likes={reel.likes}
            commentsCount={reel.commentsCount}
            sharesCount={reel.sharesCount}
          />
        </div>

        {/* BOTTOM - User info and caption */}
        <div className="absolute bottom-8 left-8">
          <ReelHeader 
            userAvatar={reel.userAvatar} 
            username={reel.username} 
            music={reel.music}
            caption={reel.caption}
          />
        </div>

      </div>
    </div>
  );
}

export default Reel;
