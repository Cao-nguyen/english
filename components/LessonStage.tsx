import React, { useState } from 'react';
import { VOCAB_WORDS } from '../constants';
import { DynamicIcon } from './Icons';
import { Volume2, ArrowRight, ArrowLeft } from 'lucide-react';

interface LessonStageProps {
  onComplete: () => void;
}

export const LessonStage: React.FC<LessonStageProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentWord = VOCAB_WORDS[currentIndex];

  const handleNext = () => {
    if (currentIndex < VOCAB_WORDS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const playAudio = () => {
    // Fallback using Web Speech API
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      {/* Header with progress */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-slate-800">Learn Vocabulary</h2>
        <span className="text-2xl font-bold bg-blue-100 text-blue-700 px-6 py-2 rounded-full">
          Word {currentIndex + 1} of {VOCAB_WORDS.length}
        </span>
      </div>

      {/* Main Flashcard */}
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border-2 border-slate-100 flex flex-col items-center text-center p-12 md:p-16 transition-all duration-300 min-h-[600px] justify-center">
        
        {/* Icon/Image */}
        <div className="w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center shadow-md mb-10 border-4 border-blue-100">
            <DynamicIcon name={currentWord.iconName} size={80} className="text-blue-600" />
        </div>

        {/* Word & Pronunciation */}
        <h3 className="text-6xl md:text-8xl font-extrabold text-slate-800 mb-6 tracking-tight">
          {currentWord.word}
        </h3>
        
        <div className="flex items-center gap-6 mb-12">
          <span className="font-mono text-3xl md:text-4xl text-slate-500 bg-slate-100 px-6 py-2 rounded-2xl border-2 border-slate-200">
            {currentWord.pronunciation}
          </span>
          <button 
            onClick={playAudio}
            className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:scale-110 transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2"
            title="Listen to pronunciation"
          >
            <Volume2 size={40} />
          </button>
        </div>

        {/* Meaning & Example */}
        <div className="w-full space-y-10">
          <div className="border-t-4 border-slate-100 pt-8">
            <p className="text-xl font-bold text-slate-400 uppercase tracking-wider mb-4">Vietnamese Meaning</p>
            <p className="text-4xl md:text-5xl font-bold text-indigo-600">{currentWord.meaning}</p>
          </div>

          <div className="bg-yellow-50 rounded-3xl p-8 border-2 border-yellow-100">
             <p className="text-xl font-bold text-yellow-600 uppercase tracking-wider mb-4 flex items-center justify-center gap-2">
               Example Sentence
             </p>
             <p className="text-3xl text-slate-700 italic font-serif leading-relaxed">
               "{currentWord.exampleSentence}"
             </p>
          </div>
        </div>

      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center mt-12">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-3 px-10 py-5 rounded-2xl text-2xl font-bold transition-all
            ${currentIndex === 0 
              ? 'text-slate-300 cursor-not-allowed' 
              : 'text-slate-600 hover:bg-white hover:shadow-xl bg-slate-50 border-2 border-slate-200'}`}
        >
          <ArrowLeft size={32} />
          <span>Previous</span>
        </button>

        <button 
          onClick={handleNext}
          className="flex items-center gap-3 px-12 py-5 bg-slate-900 text-white rounded-2xl font-bold text-2xl shadow-xl hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all"
        >
          <span>{currentIndex === VOCAB_WORDS.length - 1 ? 'Finish' : 'Next Word'}</span>
          <ArrowRight size={32} />
        </button>
      </div>
    </div>
  );
};