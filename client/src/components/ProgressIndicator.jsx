import React from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export default function ProgressIndicator({ state, progress, stageText, errorMsg, onRetry }) {
  if (state === 'ERROR') {
    return (
      <div className="w-full h-full min-h-[360px] bg-red-950/20 border border-red-900/50 rounded-2xl flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mb-3" />
        <h3 className="text-lg font-bold text-red-200 mb-1">Generation Failed</h3>
        <p className="text-xs text-red-300/80 max-w-md mb-4">{errorMsg || 'An unknown error occurred during render.'}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white text-xs font-semibold rounded-lg flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Retry Generation
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[360px] bg-slate-950 border border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      <div className="relative mb-6">
        <Loader2 className="w-14 h-14 text-purple-500 animate-spin" />
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
          {progress}%
        </span>
      </div>

      <h3 className="text-base font-semibold text-slate-200 mb-2">Generating Video Content</h3>
      <p className="text-xs text-purple-400 font-mono mb-4 animate-pulse">{stageText}</p>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
        <div
          className="bg-gradient-to-r from-purple-600 to-indigo-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}