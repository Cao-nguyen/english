import React, { useState, useEffect, useCallback } from 'react';
import { WARMUP_WORDS } from '../constants';
import { ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

interface WarmupStageProps {
  onComplete: () => void;
}

export const WarmupStage: React.FC<WarmupStageProps> = ({ onComplete }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableIndices, setAvailableIndices] = useState<number[]>([]); // Indices of scrambledLetters that are available
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentWordData = WARMUP_WORDS[currentWordIndex];

  // Helper to shuffle letters but ensure we can track them
  const prepareWord = useCallback((word: string) => {
    const firstLetter = word[0];
    const remainingLetters = word.slice(1).split('');
    
    // Shuffle remaining letters
    for (let i = remainingLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remainingLetters[i], remainingLetters[j]] = [remainingLetters[j], remainingLetters[i]];
    }
    
    return {
      first: firstLetter,
      scrambled: remainingLetters
    };
  }, []);

  // Initialize word
  useEffect(() => {
    if (currentWordData) {
      const { first, scrambled } = prepareWord(currentWordData.word);
      setScrambledLetters(scrambled);
      setAvailableIndices(scrambled.map((_, i) => i));
      setSelectedLetters([first]); // Pre-fill first letter
      setIsCorrect(null);
    }
  }, [currentWordIndex, currentWordData, prepareWord]);

  // Handle Logic
  const addLetter = useCallback((index: number) => {
    if (isCorrect !== null) return;
    
    const letter = scrambledLetters[index];
    setSelectedLetters(prev => [...prev, letter]);
    setAvailableIndices(prev => prev.filter(i => i !== index));
  }, [scrambledLetters, isCorrect]);

  const resetCurrent = () => {
    setAvailableIndices(scrambledLetters.map((_, i) => i));
    setSelectedLetters([currentWordData.word[0]]); // Reset to just first letter
    setIsCorrect(null);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCorrect !== null || selectedLetters.length === 0) return;

      const key = e.key.toLowerCase();
      
      // Handle backspace (undo)
      if (e.key === 'Backspace') {
         if (selectedLetters.length > 1) {
            const lastChar = selectedLetters[selectedLetters.length - 1];
            const allIndicesForChar: number[] = [];
            scrambledLetters.forEach((c, i) => {
                if (c.toLowerCase() === lastChar.toLowerCase()) allIndicesForChar.push(i);
            });
            const indexToRestore = allIndicesForChar.find(idx => !availableIndices.includes(idx));
            if (indexToRestore !== undefined) {
                 setSelectedLetters(prev => prev.slice(0, -1));
                 setAvailableIndices(prev => [...prev, indexToRestore].sort((a, b) => a - b));
            }
         }
         return;
      }

      const availableIndex = availableIndices.find(idx => scrambledLetters[idx].toLowerCase() === key);
      if (availableIndex !== undefined) {
        addLetter(availableIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [availableIndices, scrambledLetters, addLetter, isCorrect, selectedLetters]);

  // Check Answer
  useEffect(() => {
    if (!currentWordData) return;
    if (selectedLetters.length === currentWordData.word.length) {
      const attempt = selectedLetters.join('');
      if (attempt.toLowerCase() === currentWordData.word.toLowerCase()) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    }
  }, [selectedLetters, currentWordData]);

  const handleNext = () => {
    if (currentWordIndex < WARMUP_WORDS.length - 1) {
      setScrambledLetters([]);
      setSelectedLetters([]);
      setIsCorrect(null);
      setAvailableIndices([]);
      setCurrentWordIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  if (!currentWordData || selectedLetters.length === 0) {
      return (
          <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
      );
  }

  const remainingPlaceholders = Math.max(0, currentWordData.word.length - selectedLetters.length);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto p-6">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">Warm-up Activity</h2>
        <p className="text-2xl md:text-3xl text-slate-600 mb-4">Sắp xếp các chữ cái để tạo thành từ đúng.</p>
        <div className="mt-4 text-xl font-semibold text-slate-500 bg-slate-100 px-6 py-2 rounded-full inline-block">
          Word {currentWordIndex + 1} of {WARMUP_WORDS.length}
        </div>
      </div>

      {/* Answer Box */}
      <div className={`
        flex items-center justify-center gap-4 h-32 w-full mb-12 rounded-2xl border-4 transition-colors duration-300 px-8
        ${isCorrect === true ? 'border-green-500 bg-green-50' : 
          isCorrect === false ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'}
      `}>
        {selectedLetters.map((char, idx) => (
          <span 
            key={idx} 
            className={`
              w-16 h-20 md:w-20 md:h-24 flex items-center justify-center text-5xl md:text-6xl font-bold uppercase rounded-lg
              ${idx === 0 ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' : 'text-slate-800 border-b-4 border-slate-300'}
            `}
          >
            {char}
          </span>
        ))}
        {Array.from({ length: remainingPlaceholders }).map((_, i) => (
           <span key={`placeholder-${i}`} className="w-16 h-20 md:w-20 md:h-24 border-b-4 border-slate-200"></span>
        ))}
      </div>

      {/* Scrambled Letters Pool */}
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {scrambledLetters.map((char, idx) => {
          const isUsed = !availableIndices.includes(idx);
          return (
            <button
              key={idx}
              disabled={isUsed || isCorrect === true}
              onClick={() => addLetter(idx)}
              className={`
                w-20 h-20 md:w-24 md:h-24 rounded-2xl text-4xl md:text-5xl font-bold uppercase shadow-md transition-all duration-100
                ${isUsed 
                  ? 'bg-slate-100 text-slate-300 scale-90 cursor-default opacity-50' 
                  : 'bg-white text-blue-600 border-4 border-blue-100 hover:border-blue-400 hover:bg-blue-50 hover:-translate-y-2 active:scale-95'}
              `}
            >
              {char}
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8">
        <button 
          onClick={resetCurrent}
          disabled={selectedLetters.length <= 1 || isCorrect === true}
          className="flex items-center gap-3 px-8 py-4 text-2xl text-slate-600 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-50 font-medium border-2 border-slate-200"
        >
          <RefreshCw size={28} />
          <span>Làm lại</span>
        </button>

        {isCorrect && (
          <button 
            onClick={handleNext}
            className="flex items-center gap-3 px-10 py-5 bg-green-600 text-white rounded-full shadow-xl hover:bg-green-700 hover:shadow-green-500/30 transition-all animate-bounce"
          >
            <span className="text-2xl font-bold">{currentWordIndex === WARMUP_WORDS.length - 1 ? 'Hoàn thành' : 'Câu tiếp theo'}</span>
            <ArrowRight size={28} />
          </button>
        )}
      </div>

      {/* Result Message */}
      {isCorrect === true && (
        <div className="mt-8 text-green-600 font-bold text-3xl flex items-center gap-4 animate-in slide-in-from-bottom-2">
          <CheckCircle2 size={40} />
          <span>Nghĩa là: {currentWordData.hint}</span>
        </div>
      )}
      {isCorrect === false && (
         <div className="mt-8 text-red-500 font-bold text-3xl animate-pulse">
         Sai rồi, hãy thử lại!
       </div>
      )}
    </div>
  );
};