import React, { useState, useEffect, useRef } from 'react';
import { CONVERSATION_DATA, DEFINITION_QUESTIONS } from '../constants';
import { Lightbulb, CheckCircle2, ArrowRight, Eye, RefreshCw } from 'lucide-react';

interface DefinitionStageProps {
  onComplete: () => void;
}

export const DefinitionStage: React.FC<DefinitionStageProps> = ({ onComplete }) => {
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  
  const conversationRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (id: number, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const toggleHighlight = (word: string) => {
    if (activeHighlight === word) {
      setActiveHighlight(null);
    } else {
      setActiveHighlight(word);
    }
  };

  const toggleReveal = (id: number) => {
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
    if (!revealed[id]) {
        // Auto fill when revealing
        const question = DEFINITION_QUESTIONS.find(q => q.id === id);
        if (question) {
            handleInputChange(id, question.targetWord);
            setActiveHighlight(question.targetWord);
        }
    } else {
        setActiveHighlight(null);
    }
  };

  // Scroll to highlight effect
  useEffect(() => {
    if (activeHighlight && conversationRef.current) {
        // Small delay to allow the span to render with the new class
        setTimeout(() => {
            const element = conversationRef.current?.querySelector('.highlight-target');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }
  }, [activeHighlight]);

  // Helper to highlight text within the conversation line
  const renderTextWithHighlight = (text: string) => {
    if (!activeHighlight) return text;

    // Create a safe regex escaping special characters if necessary
    const parts = text.split(new RegExp(`(${activeHighlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === activeHighlight.toLowerCase() ? (
        <span key={i} className="highlight-target bg-yellow-400 text-black px-1 rounded shadow-sm font-bold animate-pulse ring-4 ring-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const allCompleted = DEFINITION_QUESTIONS.every(q => 
    answers[q.id]?.toLowerCase().trim() === q.targetWord.toLowerCase()
  );

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex justify-between items-center mb-4 shrink-0">
         <h2 className="text-3xl font-bold text-slate-800">Find words with the same meaning</h2>
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
              return (
                <div key={line.id} className="leading-relaxed">
                  <span className={`font-bold mr-3 text-3xl block mb-2 ${isMsHoa ? 'text-purple-700' : line.speaker === 'Nam' ? 'text-blue-700' : 'text-pink-700'}`}>
                    {line.speaker}:
                  </span>
                  <span className="text-slate-800 text-3xl font-medium">
                    {renderTextWithHighlight(line.text)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Definitions (Scrollable) */}
        <div className="flex-1 lg:max-w-2xl bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden flex flex-col">
          <div className="p-4 bg-indigo-100 border-b-2 border-indigo-200 font-bold text-indigo-900 text-2xl">
            Definitions
          </div>
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {DEFINITION_QUESTIONS.map((q) => {
              const userAnswer = answers[q.id] || '';
              const isCorrect = userAnswer.toLowerCase().trim() === q.targetWord.toLowerCase();
              const isRevealed = revealed[q.id];

              return (
                <div key={q.id} className="pb-8 border-b-2 border-slate-100 last:border-0">
                  <div className="flex gap-4 items-start mb-4">
                     <span className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                        {q.id}
                     </span>
                     <p className="text-slate-800 font-medium text-3xl leading-snug">
                        {q.definition}
                     </p>
                  </div>

                  <div className="flex items-center gap-4 pl-14">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                            placeholder="Type the word..."
                            className={`w-full p-4 text-2xl border-2 rounded-xl focus:outline-none focus:ring-4 transition-all
                                ${isCorrect 
                                    ? 'border-green-500 bg-green-50 text-green-800' 
                                    : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                                }`}
                        />
                        {isCorrect && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600">
                                <CheckCircle2 size={32} />
                            </div>
                        )}
                    </div>
                    
                    <button
                      onClick={() => toggleHighlight(q.targetWord)}
                      className={`shrink-0 p-4 rounded-xl transition-all shadow-md active:scale-95
                        ${activeHighlight === q.targetWord 
                            ? 'bg-yellow-400 text-black ring-4 ring-yellow-200 scale-105' 
                            : 'bg-white border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50'
                        }`}
                      title="Locate in text"
                    >
                      <Lightbulb size={32} />
                    </button>

                    <button
                       onClick={() => toggleReveal(q.id)}
                       className="shrink-0 p-4 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-colors"
                       title="Reveal Answer"
                    >
                        {isRevealed ? <RefreshCw size={32}/> : <Eye size={32} />}
                    </button>
                  </div>
                </div>
              );
            })}

            {allCompleted && (
               <button 
               onClick={onComplete}
               className="w-full mt-4 flex items-center justify-center gap-3 px-8 py-6 bg-slate-900 text-white rounded-2xl font-bold text-3xl shadow-xl hover:bg-slate-800 transition-all animate-bounce"
             >
               <span>Finish Lesson</span>
               <ArrowRight size={32} />
             </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};