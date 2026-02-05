import React, { useState, useEffect, useRef } from 'react';
import { CONVERSATION_DATA, EXERCISE_QUESTIONS } from '../constants';
import { Lightbulb, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface ConversationStageProps {
  onComplete: () => void;
}

export const ConversationStage: React.FC<ConversationStageProps> = ({ onComplete }) => {
  const [highlightedLineIds, setHighlightedLineIds] = useState<number[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, boolean | null>>({});
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});
  
  const conversationRef = useRef<HTMLDivElement>(null);

  const handleAnswer = (questionId: number, answer: boolean) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
    setShowFeedback(prev => ({ ...prev, [questionId]: true }));
  };

  const toggleEvidence = (lineIds: number[]) => {
    const isSame = lineIds.length === highlightedLineIds.length && lineIds.every((val, index) => val === highlightedLineIds[index]);
    if (isSame) {
      setHighlightedLineIds([]);
    } else {
      setHighlightedLineIds(lineIds);
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    if (highlightedLineIds.length > 0 && conversationRef.current) {
      // Find the first highlighted element by its data-id
      const firstId = highlightedLineIds[0];
      const element = conversationRef.current.querySelector(`[data-line-id="${firstId}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [highlightedLineIds]);

  const allAnswered = EXERCISE_QUESTIONS.every(q => userAnswers[q.id] !== undefined);

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 h-[calc(100vh-80px)] flex flex-col">
      <h2 className="text-4xl font-bold text-slate-800 mb-6 shrink-0">Read and Answer</h2>
      
      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
        
        {/* Left: Conversation (Scrollable) */}
        <div className="flex-1 bg-white rounded-3xl shadow-md border-2 border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 bg-blue-50 border-b-2 border-blue-100 font-bold text-blue-800 text-3xl">
            Conversation
          </div>
          <div ref={conversationRef} className="flex-1 overflow-y-auto p-8 space-y-6">
            {CONVERSATION_DATA.map((line) => {
              const isHighlighted = highlightedLineIds.includes(line.id);
              const isMsHoa = line.speaker === "Ms Hoa";
              return (
                <div 
                  key={line.id} 
                  data-line-id={line.id}
                  className={`transition-all duration-300 rounded-xl p-3 ${isHighlighted ? 'bg-yellow-100 shadow-md scale-[1.01] ring-2 ring-yellow-300' : ''}`}
                >
                  <span className={`font-bold mr-3 text-3xl block mb-2 ${isMsHoa ? 'text-purple-600' : line.speaker === 'Nam' ? 'text-blue-600' : 'text-pink-600'}`}>
                    {line.speaker}:
                  </span>
                  <span className="text-slate-800 leading-relaxed text-3xl font-medium">
                    {line.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Questions (Scrollable) */}
        <div className="flex-1 lg:max-w-3xl bg-white rounded-3xl shadow-md border-2 border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 bg-indigo-50 border-b-2 border-indigo-100 font-bold text-indigo-800 text-3xl">
            True or False?
          </div>
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {EXERCISE_QUESTIONS.map((q) => {
              const userAnswer = userAnswers[q.id];
              const feedback = showFeedback[q.id];
              const isCorrect = userAnswer === q.isTrue;

              return (
                <div key={q.id} className="pb-8 border-b-2 border-slate-100 last:border-0">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <p className="text-slate-800 font-medium text-3xl leading-snug">{q.id}. {q.text}</p>
                    <button
                      onClick={() => toggleEvidence(q.evidenceLineIds)}
                      className={`shrink-0 p-4 rounded-full transition-colors ${highlightedLineIds.some(id => q.evidenceLineIds.includes(id)) ? 'bg-yellow-200 text-yellow-700' : 'bg-slate-100 text-slate-400 hover:bg-yellow-100 hover:text-yellow-600'}`}
                      title="Show evidence in text"
                    >
                      <Lightbulb size={32} />
                    </button>
                  </div>

                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleAnswer(q.id, true)}
                      className={`flex-1 py-4 px-6 rounded-xl font-bold text-2xl border-2 transition-all
                        ${userAnswer === true 
                          ? (isCorrect ? 'bg-green-600 text-white border-green-600' : 'bg-red-500 text-white border-red-500') 
                          : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                        }`}
                    >
                      True
                    </button>
                    <button
                      onClick={() => handleAnswer(q.id, false)}
                      className={`flex-1 py-4 px-6 rounded-xl font-bold text-2xl border-2 transition-all
                        ${userAnswer === false 
                          ? (isCorrect ? 'bg-green-600 text-white border-green-600' : 'bg-red-500 text-white border-red-500') 
                          : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                        }`}
                    >
                      False
                    </button>
                  </div>

                  {feedback && (
                    <div className={`mt-4 text-xl flex items-center gap-3 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                      {isCorrect ? <CheckCircle size={24} /> : <XCircle size={24} />}
                      <span className="font-bold">{isCorrect ? 'Correct!' : 'Incorrect. Click the lightbulb to see why.'}</span>
                    </div>
                  )}
                </div>
              );
            })}

            {allAnswered && (
               <button 
               onClick={onComplete}
               className="w-full mt-6 flex items-center justify-center gap-3 px-10 py-6 bg-slate-900 text-white rounded-2xl font-bold text-3xl shadow-xl hover:bg-slate-800 transition-all animate-bounce"
             >
               <span>Tiếp tục: Ghép nối</span>
               <ArrowRight size={32} />
             </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};