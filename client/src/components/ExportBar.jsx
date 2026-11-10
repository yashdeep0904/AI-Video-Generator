import React, { useState } from 'react';
import { Download, Share2, Copy } from 'lucide-react';

export default function ExportBar({ onDownload }) {
  const [format, setFormat] = useState('MP4');
  const [resolution, setResolution] = useState('1080p');

  return (
    <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-400 font-medium">Export Options:</span>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="bg-slate-950 border border-slate-800 text-xs rounded-lg px-3 py-1.5 text-slate-200"
        >
          <option value="MP4">MP4 (H.264)</option>
          <option value="WEBM">WebM</option>
          <option value="GIF">Animated GIF</option>
        </select>

        <select
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
          className="bg-slate-950 border border-slate-800 text-xs rounded-lg px-3 py-1.5 text-slate-200"
        >
          <option value="720p">720p HD</option>
          <option value="1080p">1080p Full HD</option>
          <option value="4K">4K Ultra HD</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => alert('Link copied to clipboard!')}
          className="p-2 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg text-xs flex items-center gap-1.5"
        >
          <Copy className="w-3.5 h-3.5" /> Copy Link
        </button>
        <button
          onClick={() => onDownload(format, resolution)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg text-xs flex items-center gap-2 transition-all shadow-md shadow-purple-600/20"
        >
          <Download className="w-4 h-4" /> Download Video
        </button>
      </div>
    </div>
  );
}