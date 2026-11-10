import React from 'react';
import { History, Play, Film } from 'lucide-react';

export default function HistoryGallery({ items = [], onSelect }) {
  if (!items.length) return null;

  return (
    <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <History className="w-3.5 h-3.5" /> Generation History ({items.length})
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="group relative rounded-xl border border-slate-800 bg-slate-900 overflow-hidden cursor-pointer hover:border-purple-500 transition-all p-3 flex flex-col gap-2"
          >
            <div className="w-full h-16 rounded-lg bg-gradient-to-br from-purple-900/40 to-slate-950 flex items-center justify-center border border-slate-800/80 group-hover:border-purple-500/50 relative overflow-hidden">
              <Film className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <p className="text-[11px] text-slate-200 font-medium truncate">{item.prompt}</p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                <span className="capitalize">{item.preset}</span>
                <span>{item.duration}s</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}