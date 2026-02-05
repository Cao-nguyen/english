import React, { useState, useRef, useEffect } from 'react';
import { LUCKY_QUESTIONS } from '../constants';
import { Gift, HelpCircle, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { LuckyQuestion } from '../types';

interface LuckyGameStageProps {
  onComplete: () => void;
}

export const LuckyGameStage: React.FC<LuckyGameStageProps> = ({ onComplete }) => {
  const [revealedItems, setRevealedItems] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<LuckyQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showLuckyPopup, setShowLuckyPopup] = useState(false);
  const [fishingState, setFishingState] = useState<{ active: boolean, targetId: number | null, hookCoords: {x: number, y: number} | null }>({ active: false, targetId: null, hookCoords: null });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const rodTipRef = useRef<HTMLDivElement>(null);

  // Calculate rod tip position
  const getRodTipPosition = () => {
      if (rodTipRef.current && containerRef.current) {
          const rodRect = rodTipRef.current.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          return {
              x: rodRect.left - containerRect.left + rodRect.width/2,
              y: rodRect.top - containerRect.top + rodRect.height
          };
      }
      return { x: 500, y: 0 }; // Default fallback
  };

  const handleNuggetClick = (e: React.MouseEvent, question: LuckyQuestion) => {
    if (revealedItems.includes(question.id) || fishingState.active) return;

    // Calculate click target position relative to container
    if (containerRef.current) {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const targetX = rect.left - containerRect.left + rect.width / 2;
        const targetY = rect.top - containerRect.top + rect.height / 2;

        setFishingState({
            active: true,
            targetId: question.id,
            hookCoords: { x: targetX, y: targetY }
        });

        // Delay for fishing animation before showing content
        setTimeout(() => {
            if (question.type === 'lucky') {
                setShowLuckyPopup(true);
                setTimeout(() => {
                    setRevealedItems(prev => [...prev, question.id]);
                    setShowLuckyPopup(false);
                    setFishingState({ active: false, targetId: null, hookCoords: null });
                }, 2500);
            } else {
                setCurrentQuestion(question);
                setSelectedOption(null);
                setFeedback(null);
            }
        }, 800);
    }
  };

  const handleAnswerSubmit = (option: string) => {
    if (!currentQuestion || feedback) return;

    setSelectedOption(option);
    if (option === currentQuestion.correctAnswer) {
      setFeedback('correct');
      setTimeout(() => {
        setRevealedItems(prev => [...prev, currentQuestion.id]);
        setCurrentQuestion(null);
        setFishingState({ active: false, targetId: null, hookCoords: null });
      }, 2000);
    } else {
      setFeedback('incorrect');
    }
  };

  const closeQuestionModal = () => {
    // If closed without answering, reset fishing line
    setCurrentQuestion(null);
    setFishingState({ active: false, targetId: null, hookCoords: null });
  };

  const allRevealed = revealedItems.length === LUCKY_QUESTIONS.length;
  const rodPos = getRodTipPosition();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 flex flex-col items-center min-h-[calc(100vh-80px)]">
      <div className="mb-4 text-center shrink-0">
        <h2 className="text-5xl font-extrabold text-amber-500 drop-shadow-md mb-2 uppercase">
          Gold Mining Challenge
        </h2>
        <p className="text-3xl text-slate-600 font-medium">Catch the gold to answer questions!</p>
      </div>

      {/* Game Area */}
      <div ref={containerRef} className="relative w-full max-w-6xl flex-1 bg-gradient-to-b from-sky-300 to-blue-500 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-amber-200">
        
        {/* Fisherman SVG/Icon at top center */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
            {/* Simple boat/person representation */}
             <div className="relative">
                 <div className="text-8xl">🚣‍♂️</div>
                 {/* Invisible div to mark rod tip */}
                 <div ref={rodTipRef} className="absolute top-1/2 right-0 w-2 h-2"></div>
             </div>
        </div>

        {/* Fishing Line SVG Layer */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
            {fishingState.active && fishingState.hookCoords && (
                <line 
                    x1={rodPos.x} 
                    y1={rodPos.y} 
                    x2={fishingState.hookCoords.x} 
                    y2={fishingState.hookCoords.y} 
                    stroke="white" 
                    strokeWidth="4" 
                    strokeDasharray="5,5"
                    className="animate-pulse"
                />
            )}
            {fishingState.active && fishingState.hookCoords && (
                <circle cx={fishingState.hookCoords.x} cy={fishingState.hookCoords.y} r="8" fill="white" />
            )}
        </svg>

        {/* Water Area & Nuggets */}
        <div className="absolute bottom-0 w-full p-8 md:p-16">
            <div className="flex flex-wrap justify-center gap-12 md:gap-16 items-end">
                {LUCKY_QUESTIONS.map((q, idx) => {
                    const isRevealed = revealedItems.includes(q.id);
                    const isTarget = fishingState.targetId === q.id;
                    
                    // Simple random offset for visual variety
                    const bounceDelay = `${idx * 0.1}s`;

                    return (
                        <button
                            key={q.id}
                            onClick={(e) => handleNuggetClick(e, q)}
                            disabled={isRevealed || (fishingState.active && !isTarget)}
                            style={{ animationDelay: bounceDelay }}
                            className={`
                                relative group transition-all duration-500 transform
                                ${isRevealed ? 'opacity-0 scale-0' : 'animate-bounce-slow hover:scale-110 cursor-pointer'}
                                ${isTarget ? 'scale-110 z-20' : ''}
                            `}
                        >
                            {/* Gold Nugget Shape */}
                            <div className="w-32 h-24 md:w-40 md:h-32 bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-600 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] shadow-lg border-b-8 border-amber-700 flex items-center justify-center relative overflow-hidden">
                                {/* Shine effect */}
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="text-4xl font-black text-amber-900/50 drop-shadow-sm">{q.id}</span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Sea floor decoration */}
        <div className="absolute bottom-0 w-full h-12 bg-blue-900/30 blur-xl"></div>
        
        {/* Completion Overlay */}
        {allRevealed && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center backdrop-blur-sm animate-in fade-in duration-1000 z-50">
             <div className="bg-white p-12 rounded-[3rem] shadow-2xl text-center transform scale-110 border-8 border-yellow-400">
                <h3 className="text-6xl font-black text-amber-500 mb-6 drop-shadow-sm">GOLD RUSH!</h3>
                <p className="text-4xl text-slate-700 mb-10 font-bold">You collected all the gold!</p>
                <button 
                  onClick={onComplete}
                  className="px-16 py-8 bg-blue-600 text-white text-4xl font-bold rounded-full shadow-xl hover:bg-blue-700 transition-all flex items-center gap-6 mx-auto animate-bounce"
                >
                  <span>Finish Lesson</span>
                  <Trophy size={48} />
                </button>
             </div>
          </div>
        )}
      </div>

      {/* Lucky Popup */}
      {showLuckyPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-yellow-300 to-amber-500 p-16 rounded-[3rem] text-center shadow-2xl animate-bounce-slow border-8 border-white max-w-3xl">
            <Gift size={140} className="mx-auto text-white mb-8 drop-shadow-md" />
            <h3 className="text-7xl font-black text-white drop-shadow-xl mb-6">RARE GOLD!</h3>
            <p className="text-5xl text-amber-900 font-bold">Free points! No question!</p>
          </div>
        </div>
      )}

      {/* Question Modal */}
      {currentQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 border-8 border-amber-400">
            {/* Header */}
            <div className="bg-amber-500 p-8 flex justify-between items-center">
               <h3 className="text-4xl font-bold text-white flex items-center gap-4">
                 <HelpCircle size={48} />
                 Gold Nugget #{currentQuestion.id}
               </h3>
               <button 
                 onClick={closeQuestionModal} 
                 className="text-white/80 hover:text-white text-6xl leading-none font-bold"
               >
                 &times;
               </button>
            </div>

            {/* Body */}
            <div className="p-12 bg-amber-50">
               <p className="text-4xl md:text-5xl font-bold text-slate-800 mb-12 leading-tight">
                 {currentQuestion.question}
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {currentQuestion.options?.map((opt, idx) => {
                   const isSelected = selectedOption === opt;
                   const isCorrect = opt === currentQuestion.correctAnswer;
                   
                   let btnClass = "bg-white hover:bg-amber-100 border-amber-200 text-slate-700 shadow-md";
                   
                   if (isSelected) {
                      if (feedback === 'correct') btnClass = "bg-green-100 border-green-500 text-green-800 shadow-green-200";
                      if (feedback === 'incorrect') btnClass = "bg-red-100 border-red-500 text-red-800 shadow-red-200";
                   }

                   // Show correct answer if incorrect was selected
                   if (feedback === 'incorrect' && isCorrect) {
                       btnClass = "bg-green-100 border-green-500 text-green-800 ring-4 ring-green-200";
                   }

                   return (
                     <button
                        key={idx}
                        onClick={() => handleAnswerSubmit(opt)}
                        disabled={feedback !== null}
                        className={`p-8 text-3xl font-bold rounded-3xl border-4 text-left transition-all transform active:scale-95 ${btnClass}`}
                     >
                       <span className="inline-block w-12 h-12 rounded-full bg-slate-200 text-slate-600 text-center leading-[3rem] mr-4 text-2xl">
                         {String.fromCharCode(65 + idx)}
                       </span>
                       {opt}
                     </button>
                   );
                 })}
               </div>

               {/* Feedback Footer */}
               {feedback && (
                 <div className={`mt-10 p-8 rounded-3xl flex items-center gap-8 animate-in slide-in-from-bottom border-4 ${feedback === 'correct' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                    {feedback === 'correct' ? <CheckCircle size={64} className="shrink-0" /> : <XCircle size={64} className="shrink-0" />}
                    <div>
                      <p className="text-5xl font-black mb-2">{feedback === 'correct' ? 'Correct!' : 'Incorrect!'}</p>
                      <p className="text-3xl font-medium opacity-90">{currentQuestion.explanation}</p>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};