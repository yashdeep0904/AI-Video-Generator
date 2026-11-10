import React from 'react';
import { Wand2, Film, Sparkles, SlidersHorizontal } from 'lucide-react';

const PRESETS = [
  { id: 'cinematic', label: 'Cinematic', icon: '🎬' },
  { id: 'anime', label: 'Anime', icon: '🎨' },
  { id: 'cyberpunk', label: 'Cyberpunk', icon: '⚡' },
  { id: 'photorealistic', label: 'Realistic', icon: '📸' },
  { id: '3d-render', label: '3D Render', icon: '🧊' }
];

const ASPECT_RATIOS = [
  { id: '16:9', label: '16:9 Landscape' },
  { id: '9:16', label: '9:16 Portrait' },
  { id: '1:1', label: '1:1 Square' }
];

export default function PromptPanel({
  prompt,
  setPrompt,
  selectedPreset,
  setSelectedPreset,
  aspectRatio,
  setAspectRatio,
  duration,
  setDuration,
  motionScale,
  setMotionScale,
  onGenerate,
  isGenerating
}) {
  const handleEnhance = () => {
    if (!prompt.trim()) return;
    setPrompt(`${prompt}, cinematic lighting, photorealistic details, 8k resolution, smooth motion, high dynamic range`);
  };

  return (
    <div className="p-5 flex flex-col gap-6 bg-slate-900/50 rounded-2xl border border-slate-800 h-full overflow-y-auto">
      {/* Prompt Input Block */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-purple-400" /> Video Prompt
          </label>
          <button
            onClick={handleEnhance}
            type="button"
            className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" /> Enhance Prompt
          </button>
        </div>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the video you want to generate (e.g., A cybernetic samurai standing under neon rain in Neo-Tokyo)..."
            rows={4}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none transition-all"
          />
          <span className="absolute bottom-3 right-3 text-[10px] text-slate-500">
            {prompt.length}/500 chars
          </span>
        </div>
      </div>

      {/* Style Presets */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Style Presets</label>
        <div className="grid grid-cols-3 gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setSelectedPreset(preset.id)}
              className={`p-2.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                selectedPreset === preset.id
                  ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span>{preset.icon}</span>
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Generation Parameters */}
      <div className="flex flex-col gap-4 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Parameters
        </div>

        {/* Aspect Ratio */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-slate-300">Aspect Ratio</span>
          <div className="grid grid-cols-3 gap-2">
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio.id}
                onClick={() => setAspectRatio(ratio.id)}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                  aspectRatio === ratio.id
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {ratio.label}
              </button>
            ))}
          </div>
        </div>

        {/* Duration & Motion Sliders */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-slate-300">Duration ({duration}s)</span>
            <input
              type="range"
              min="3"
              max="10"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="accent-purple-500"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-slate-300">Motion Strength ({motionScale})</span>
            <input
              type="range"
              min="1"
              max="10"
              value={motionScale}
              onChange={(e) => setMotionScale(Number(e.target.value))}
              className="accent-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Submit Action */}
      <button
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="mt-auto w-full py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        <Film className="w-4 h-4" />
        {isGenerating ? 'Processing Video...' : 'Generate AI Video'}
      </button>
    </div>
  );
}