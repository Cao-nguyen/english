export type AppPhase = 'transition' | 'warmup' | 'lesson' | 'summary' | 'conversation' | 'definition' | 'grammar' | 'lucky' | 'completed';

export interface WarmupWord {
  id: string;
  word: string;
  hint: string; // Vietnamese meaning for context
}

export interface VocabWord {
  id: string;
  word: string;
  partOfSpeech: string; // e.g., (n), (adj)
  pronunciation: string;
  meaning: string;
  imageHint: string; // Description for the placeholder/icon
  iconName: string; // Key for Lucide icon
  exampleSentence: string;
}

export interface ConversationLine {
  id: number;
  speaker: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  isTrue: boolean;
  evidenceLineIds: number[]; // IDs of conversation lines that prove the answer
}

export interface DefinitionQuestion {
  id: number;
  definition: string;
  targetWord: string;
}

export interface GrammarQuestion {
  id: number;
  beforeText: string;
  afterText: string;
  correctAnswer: string;
  evidenceLineId: number;
}

export interface LuckyQuestion {
  id: number;
  type: 'multiple-choice' | 'lucky';
  question?: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
}