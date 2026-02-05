import React from 'react';
import { VOCAB_WORDS } from '../constants';
import { ArrowRight, BookOpen } from 'lucide-react';

interface SummaryStageProps {
  onComplete: () => void;
}

export const SummaryStage: React.FC<SummaryStageProps> = ({ onComplete }) => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100 text-blue-600 rounded-full mb-6">
          <BookOpen size={48} />
        </div>
        <h2 className="text-5xl font-bold text-slate-800">Tổng hợp từ vựng</h2>
        <p className="text-2xl text-slate-500 mt-4">Xem lại các từ đã học trong bài hôm nay</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b-2 border-slate-200">
                <th className="p-6 font-bold text-slate-600 text-center w-24 text-2xl">STT</th>
                <th className="p-6 font-bold text-slate-600 text-2xl">Từ vựng</th>
                <th className="p-6 font-bold text-slate-600 text-2xl">Từ loại</th>
                <th className="p-6 font-bold text-slate-600 text-2xl">Phiên âm</th>
                <th className="p-6 font-bold text-slate-600 text-2xl">Nghĩa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {VOCAB_WORDS.map((word, index) => (
                <tr key={word.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-6 text-center font-bold text-slate-400 text-2xl">{index + 1}</td>
                  <td className="p-6 font-bold text-blue-700 text-3xl">{word.word}</td>
                  <td className="p-6 text-slate-500 italic text-2xl">{word.partOfSpeech}</td>
                  <td className="p-6 font-mono text-slate-500 text-2xl">{word.pronunciation}</td>
                  <td className="p-6 text-slate-800 font-medium text-3xl">{word.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={onComplete}
          className="flex items-center gap-4 px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-2xl shadow-xl hover:bg-indigo-700 hover:shadow-indigo-500/30 transition-all hover:-translate-y-1"
        >
          <span>Sang phần Hội thoại</span>
          <ArrowRight size={32} />
        </button>
      </div>
    </div>
  );
};