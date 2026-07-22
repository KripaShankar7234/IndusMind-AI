import React from 'react';
import { Cpu } from 'lucide-react';

const Loader = ({ label = 'Processing Industrial Neural Index...', fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 gap-4 text-center">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-500 animate-pulse">
          <Cpu className="w-8 h-8 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        <div className="absolute inset-0 rounded-2xl border-2 border-blue-500 border-t-transparent animate-spin" />
      </div>
      <p className="text-sm font-medium text-slate-300 tracking-wide">{label}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0F172A]/90 backdrop-blur-lg flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
