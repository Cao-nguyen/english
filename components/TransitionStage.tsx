import React from 'react';
import { LESSON_TITLE, LESSON_SUBTITLE } from '../constants';
import { Sparkles, Play } from 'lucide-react';

interface TransitionStageProps {
  onComplete: () => void;
}

export const TransitionStage: React.FC<TransitionStageProps> = ({ onComplete }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-8 animate-in fade-in zoom-in duration-700">
      <div className="mb-8 p-8 bg-yellow-100 rounded-full text-yellow-600 shadow-lg animate-bounce-slow">
        <Sparkles size={80} />
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 tracking-tight leading-tight max-w-6xl">
        {LESSON_TITLE}
      </h1>
      <div className="w-48 h-2 bg-blue-500 rounded-full mb-12 mx-auto"></div>
      <h2 className="text-3xl md:text-5xl text-slate-700 font-bold mb-16">
        {LESSON_SUBTITLE}
      </h2>
      
      <button 
        onClick={onComplete}
        className="group relative px-12 py-6 bg-blue-600 text-white text-3xl font-bold rounded-full shadow-2xl hover:bg-blue-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex items-center gap-4 overflow-hidden"
      >
        <span className="relative z-10">Bắt đầu bài học</span>
        <Play className="relative z-10 fill-current" size={36} />
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      </button>
    </div>
  );
};