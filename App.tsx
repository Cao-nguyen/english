import React, { useState } from 'react';
import { AppPhase } from './types';
import { TransitionStage } from './components/TransitionStage';
import { WarmupStage } from './components/WarmupStage';
import { LessonStage } from './components/LessonStage';
import { SummaryStage } from './components/SummaryStage';
import { ConversationStage } from './components/ConversationStage';
import { DefinitionStage } from './components/DefinitionStage';
import { GrammarStage } from './components/GrammarStage';
import { LuckyGameStage } from './components/LuckyGameStage';
import { Trophy, RotateCcw } from 'lucide-react';

export default function App() {
  // Start with 'warmup' instead of 'transition'
  const [phase, setPhase] = useState<AppPhase>('warmup');

  // Flow: Warmup -> Transition -> Lesson -> Summary -> Conversation -> Definition -> Grammar -> Lucky -> Completed
  const handleWarmupComplete = () => setPhase('transition');
  const handleTransitionComplete = () => setPhase('lesson');
  const handleLessonComplete = () => setPhase('summary');
  const handleSummaryComplete = () => setPhase('conversation');
  const handleConversationComplete = () => setPhase('definition');
  const handleDefinitionComplete = () => setPhase('grammar');
  const handleGrammarComplete = () => setPhase('lucky');
  const handleLuckyComplete = () => setPhase('completed');

  const handleRestart = () => {
    setPhase('warmup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col font-sans">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-xl">
              <Trophy size={28} />
            </div>
            <span className="font-bold text-slate-800 text-2xl hidden sm:block">English Master: Unit 7</span>
          </div>
          
          {/* Progress Steps */}
          <div className="flex gap-2 overflow-x-auto">
             {[
               { id: 'warmup', label: 'Warmup' }, 
               { id: 'transition', label: 'Intro' },
               { id: 'lesson', label: 'Vocab' }, 
               { id: 'summary', label: 'List' }, 
               { id: 'conversation', label: 'Read' },
               { id: 'definition', label: 'Match' },
               { id: 'grammar', label: 'Fill' },
               { id: 'lucky', label: 'Game' },
               { id: 'completed', label: 'End' }
              ].map((step, idx) => {
                const stepOrder = ['warmup', 'transition', 'lesson', 'summary', 'conversation', 'definition', 'grammar', 'lucky', 'completed'];
                const currentIdx = stepOrder.indexOf(phase);
                const isActive = idx <= currentIdx;
                
                return (
                  <div key={step.id} className="flex flex-col items-center min-w-[30px]">
                    <div className={`h-2 w-8 sm:w-12 rounded-full transition-colors duration-500 ${isActive ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                  </div>
                )
             })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        
        {phase === 'warmup' && (
          <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-500">
            <WarmupStage onComplete={handleWarmupComplete} />
          </div>
        )}

        {phase === 'transition' && (
          <TransitionStage onComplete={handleTransitionComplete} />
        )}

        {phase === 'lesson' && (
           <div className="w-full animate-in fade-in slide-in-from-right-8 duration-500">
             <LessonStage onComplete={handleLessonComplete} />
           </div>
        )}

        {phase === 'summary' && (
          <SummaryStage onComplete={handleSummaryComplete} />
        )}

        {phase === 'conversation' && (
          <div className="w-full animate-in fade-in zoom-in duration-500">
            <ConversationStage onComplete={handleConversationComplete} />
          </div>
        )}

        {phase === 'definition' && (
          <div className="w-full animate-in fade-in zoom-in duration-500">
            <DefinitionStage onComplete={handleDefinitionComplete} />
          </div>
        )}

        {phase === 'grammar' && (
          <div className="w-full animate-in fade-in zoom-in duration-500">
            <GrammarStage onComplete={handleGrammarComplete} />
          </div>
        )}

        {phase === 'lucky' && (
          <div className="w-full animate-in fade-in zoom-in duration-500">
            <LuckyGameStage onComplete={handleLuckyComplete} />
          </div>
        )}

        {phase === 'completed' && (
          <div className="text-center animate-in zoom-in duration-500 max-w-2xl mx-auto bg-white p-16 rounded-[3rem] shadow-2xl">
            <div className="inline-block p-10 rounded-full bg-yellow-100 text-yellow-500 mb-8 animate-bounce">
              <Trophy size={96} />
            </div>
            <h2 className="text-6xl font-extrabold text-slate-800 mb-6">Xuất sắc!</h2>
            <p className="text-slate-600 text-3xl mb-12">
              Bạn đã hoàn thành tất cả các phần của Unit 7: Education Options.
            </p>
            <button 
              onClick={handleRestart}
              className="px-12 py-6 bg-blue-600 text-white rounded-2xl font-bold text-3xl shadow-xl hover:bg-blue-700 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-4 mx-auto"
            >
              <RotateCcw size={32} />
              <span>Học lại từ đầu</span>
            </button>
          </div>
        )}
      </main>

      <footer className="py-6 text-center text-slate-400 text-lg">
        <p>© 2024 English Learning App. Grade 12.</p>
      </footer>
    </div>
  );
}