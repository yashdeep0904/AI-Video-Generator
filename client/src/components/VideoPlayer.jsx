import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, AlertCircle } from 'lucide-react';

export default function VideoPlayer({ videoData, aspectRatio }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Auto-play when a new video loads
  useEffect(() => {
    setHasError(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [videoData]);

  const togglePlay = async () => {
    if (!videoRef.current) return;
    try {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        await videoRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setCurrentTime(cur);
    setDuration(dur);
    setProgress((cur / dur) * 100);
  };

  const handleSeek = (e) => {
    const seekTime = (Number(e.target.value) / 100) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setProgress(Number(e.target.value));
    }
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getAspectClass = () => {
    if (aspectRatio === '9:16') return 'max-w-[280px] aspect-[9/16]';
    if (aspectRatio === '1:1') return 'max-w-[400px] aspect-square';
    return 'w-full aspect-video';
  };

  return (
    <div className="w-full h-full bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center relative group">
      <div className={`relative rounded-xl overflow-hidden bg-black shadow-2xl ${getAspectClass()}`}>
        {hasError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-red-400 bg-red-950/20">
            <AlertCircle className="w-8 h-8 mb-2" />
            <p className="text-xs">Failed to load video media.</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={videoData?.src}
            poster={videoData?.poster}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onError={() => setHasError(true)}
            muted={isMuted}
            playsInline
            crossOrigin="anonymous"
            className="w-full h-full object-cover"
          />
        )}

        {!hasError && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={progress || 0}
              onChange={handleSeek}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-3">
                <button onClick={togglePlay} className="p-1 hover:text-purple-400">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsMuted(!isMuted)} className="p-1 hover:text-purple-400">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
              <button onClick={() => videoRef.current?.requestFullscreen()} className="p-1 hover:text-purple-400">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}