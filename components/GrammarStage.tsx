import React, { useState, useEffect, useRef } from 'react';
import { CONVERSATION_DATA, GRAMMAR_QUESTIONS } from '../constants';
import { Lightbulb, CheckCircle2, ArrowRight, Eye, RefreshCw } from 'lucide-react';

interface GrammarStageProps {
  onComplete: () => void;
}

export const GrammarStage: React.FC<GrammarStageProps> = ({ onComplete }) => {
  const [activeHighlightId, setActiveHighlightId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const conversationRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (id: number, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const toggleHighlight = (lineId: number) => {
    setActiveHighlightId(prev => (prev === lineId ? null : lineId));
  };

  const toggleReveal = (id: number) => {
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
    if (!revealed[id]) {
        // Auto fill when revealing
        const question = GRAMMAR_QUESTIONS.find(q => q.id === id);
        if (question) {
            handleInputChange(id, question.correctAnswer);
            setActiveHighlightId(question.evidenceLineId);
        }
    } else {
        setActiveHighlightId(null);
    }
  };

  // Scroll effect
  useEffect(() => {
    if (activeHighlightId !== null && conversationRef.current) {
        const element = conversationRef.current.querySelector(`[data-line-id="${activeHighlightId}"]`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
  }, [activeHighlightId]);

  const allCompleted = GRAMMAR_QUESTIONS.every(q => 
    answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase()
  );

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex justify-between items-center mb-4 shrink-0">
         <h2 className="text-3xl font-bold text-slate-800">Complete the sentences</h2>
         <span className="text-xl text-slate-500 font-medium">Use Perfect Gerunds/Participles</span>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
        
        {/* Left: Conversation (Scrollable) */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden flex flex-col">
          <div className="p-4 bg-blue-100 border-b-2 border-blue-200 font-bold text-blue-900 text-2xl">
            Conversation
          </div>
          <div ref={conversationRef} className="flex-1 overflow-y-auto p-8 space-y-6">
            {CONVERSATION_DATA.map((line) => {
              const isMsHoa = line.speaker === "Ms Hoa";
              const isHighlighted = activeHighlightId === line.id;
              
              return (
                <div key={line.id} data-line-id={line.id} className={`leading-relaxed transition-all duration-300 ${isHighlighted ? 'bg-yellow-100 p-2 -mx-2 rounded-lg ring-2 ring-yellow-300' : ''}`}>
                  <span className={`font-bold mr-3 text-3xl block mb-2 ${isMsHoa ? 'text-purple-700' : line.speaker === 'Nam' ? 'text-blue-700' : 'text-pink-700'}`}>
                    {line.speaker}:
                  </span>
                  <span className="text-slate-800 text-3xl font-medium">
                    {line.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Grammar Questions (Scrollable) */}
        <div className="flex-1 lg:max-w-2xl bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden flex flex-col">
          <div className="p-4 bg-indigo-100 border-b-2 border-indigo-200 font-bold text-indigo-900 text-2xl">
            Fill in the blanks
          </div>
          <div className="flex-1 overflow-y-auto p-8 space-y-12">
            {GRAMMAR_QUESTIONS.map((q) => {
              const userAnswer = answers[q.id] || '';
              const isCorrect = userAnswer.toLowerCase().trim() === q.correctAnswer.toLowerCase();
              const isRevealed = revealed[q.id];

              return (
                <div key={q.id} className="pb-8 border-b-2 border-slate-100 last:border-0">
                   <div className="flex flex-col gap-6">
                      <div className="text-3xl leading-relaxed text-slate-800 font-medium">
                          <span className="font-bold text-indigo-600 mr-2">{q.id}.</span>
                          {q.beforeText}
                          <span className="inline-block min-w-[200px] border-b-4 border-slate-300 mx-2 align-baseline relative">
                             <input 
                                type="text"
                                value={userAnswer}
                                onChange={(e) => handleInputChange(q.id, e.target.value)}
                                className={`w-full bg-transparent text-center focus:outline-none focus:border-blue-600 transition-colors
                                    ${isCorrect ? 'text-green-600 border-green-500' : 'text-slate-800'}`}
                             />
                             {isCorrect && (
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-green-500">
                                   <CheckCircle2 size={32} />
                                </span>
                             )}
                          </span>
                          {q.afterText}
                      </div>

                      <div className="flex items-center gap-4 justify-end">
                        <button
                          onClick={() => toggleHighlight(q.evidenceLineId)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all shadow-sm
                            ${activeHighlightId === q.evidenceLineId 
                                ? 'bg-yellow-400 text-black ring-4 ring-yellow-200' 
                                : 'bg-white border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50'
                            }`}
                          title="Show evidence"
                        >
                          <Lightbulb size={24} />
                          <span className="font-bold text-lg">Hint</span>
                        </button>

                        <button
                          onClick={() => toggleReveal(q.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
                          title="Reveal Answer"
                        >
                            {isRevealed ? <RefreshCw size={24}/> : <Eye size={24} />}
                            <span className="font-bold text-lg">{isRevealed ? 'Reset' : 'Reveal'}</span>
                        </button>
                      </div>
                   </div>
                </div>
              );
            })}

            {allCompleted && (
               <button 
               onClick={onComplete}
               className="w-full mt-4 flex items-center justify-center gap-3 px-8 py-6 bg-slate-900 text-white rounded-2xl font-bold text-3xl shadow-xl hover:bg-slate-800 transition-all animate-bounce"
             >
               <span>Finish All Exercises</span>
               <ArrowRight size={32} />
             </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};