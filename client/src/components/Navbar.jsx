import React from 'react';
import { Sparkles, Coins } from 'lucide-react';

export default function Navbar({ tokens = 120 }) {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-white leading-tight">VideoStudio AI</h1>
          <p className="text-xs text-slate-400">Generative Video Engine</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <Coins className="w-4 h-4 text-amber-400" />
          <span><strong className="text-white">{tokens}</strong> Credits Left</span>
        </div>
        <button className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all">
          Upgrade Pro
        </button>
      </div>
    </header>
  );
}