import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PromptPanel from './components/PromptPanel';
import ProgressIndicator from './components/ProgressIndicator';
import VideoPlayer from './components/VideoPlayer';
import ExportBar from './components/ExportBar';
import HistoryGallery from './components/HistoryGallery';

export default function App() {
  // State Machine: 'IDLE' | 'SUBMITTING' | 'PROCESSING' | 'READY' | 'ERROR'
  const [genState, setGenState] = useState('IDLE');
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Parameters
  const [prompt, setPrompt] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('cinematic');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [duration, setDuration] = useState(5);
  const [motionScale, setMotionScale] = useState(5);

  // Video output & history
  const [currentVideo, setCurrentVideo] = useState(null);
  const [history, setHistory] = useState([]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    setGenState('SUBMITTING');
    setProgress(5);
    setStageText('Parsing prompt latents...');

    setTimeout(() => {
      setGenState('PROCESSING');
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            finishGeneration();
            return 100;
          }
          if (prev === 25) setStageText('Rendering keyframes...');
          if (prev === 60) setStageText('Interpolating temporal motion...');
          if (prev === 85) setStageText('Encoding high-resolution stream...');
          return prev + 5;
        });
      }, 200);
    }, 1000);
  };


  const finishGeneration = async () => {
    const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
    
    // Clean the prompt: grab just the first 2-3 main words to ensure Pixabay finds a match
    const cleanKeywords = prompt.split(' ').slice(0, 2).join(' ').replace(/[^a-zA-Z0-9 ]/g, "");
    const query = encodeURIComponent(cleanKeywords);

    try {
      const res = await fetch(`https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${query}&safesearch=true`);
      const data = await res.json();
      
      // If it finds a video, use it. If 0 results, fallback to a stock video.
      const videoFile = data.hits?.length > 0 
        ? data.hits[0].videos.medium.url 
        : 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
      
      const pictureId = data.hits?.[0]?.picture_id;
      const posterImage = pictureId 
        ? `https://i.vimeocdn.com/video/${pictureId}_640x360.jpg` 
        : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800';

      const newVideo = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
        prompt,
        preset: selectedPreset,
        aspectRatio,
        duration,
        src: videoFile,
        poster: posterImage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setCurrentVideo(newVideo);
      setHistory((prev) => [newVideo, ...prev]);
      setGenState('READY');
    } catch (err) {
      console.error('Failed to fetch video:', err);
      setErrorMsg('Failed to find a matching video for that prompt.');
      setGenState('ERROR');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Studio Controls */}
        <div className="lg:col-span-5 h-full">
          <PromptPanel
            prompt={prompt}
            setPrompt={setPrompt}
            selectedPreset={selectedPreset}
            setSelectedPreset={setSelectedPreset}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            duration={duration}
            setDuration={setDuration}
            motionScale={motionScale}
            setMotionScale={setMotionScale}
            onGenerate={handleGenerate}
            isGenerating={genState === 'SUBMITTING' || genState === 'PROCESSING'}
          />
        </div>

        {/* Right Column: Preview, Progress & Video Player */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex-1 min-h-[420px]">
            {genState === 'IDLE' && (
              <div className="w-full h-full bg-slate-900/40 border border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center border-dashed">
                <p className="text-sm text-slate-400">Enter a prompt on the left and click <strong className="text-purple-400">Generate AI Video</strong> to start.</p>
              </div>
            )}

            {(genState === 'SUBMITTING' || genState === 'PROCESSING' || genState === 'ERROR') && (
              <ProgressIndicator
                state={genState}
                progress={progress}
                stageText={stageText}
                errorMsg={errorMsg}
                onRetry={handleGenerate}
              />
            )}

            {genState === 'READY' && (
              <VideoPlayer videoData={currentVideo} aspectRatio={aspectRatio} />
            )}
          </div>

          {genState === 'READY' && (
            <ExportBar onDownload={(fmt, res) => alert(`Downloading video as ${res} ${fmt}...`)} />
          )}

          <HistoryGallery items={history} onSelect={(item) => { setCurrentVideo(item); setGenState('READY'); }} />
        </div>
      </main>
    </div>
  );
}