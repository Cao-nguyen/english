import { WarmupWord, VocabWord, ConversationLine, Question, DefinitionQuestion, GrammarQuestion, LuckyQuestion } from './types';

export const WARMUP_WORDS: WarmupWord[] = [
  { id: '1', word: 'education', hint: 'Việc học hành, giáo dục' },
  { id: '2', word: 'option', hint: 'Sự lựa chọn' },
  { id: '3', word: 'school', hint: 'Trường học' },
  { id: '4', word: 'leaver', hint: 'Người rời đi (tốt nghiệp)' },
];

export const LESSON_TITLE = "UNIT 7: EDUCATION OPTIONS FOR SCHOOL-LEAVERS";
export const LESSON_SUBTITLE = "Lesson 1: Getting started";

export const VOCAB_WORDS: VocabWord[] = [
  { 
    id: 'v1', 
    word: 'fair', 
    partOfSpeech: '(n)',
    pronunciation: '/feə(r)/', 
    meaning: 'Hội chợ (giáo dục)', 
    imageHint: 'A scale representing balance or a gathering booth',
    iconName: 'Scale',
    exampleSentence: 'Many universities will have booths at the education fair this weekend.'
  },
  { 
    id: 'v2', 
    word: 'glad', 
    partOfSpeech: '(adj)',
    pronunciation: '/ɡlæd/', 
    meaning: 'Vui mừng, sung sướng', 
    imageHint: 'A happy smiling face',
    iconName: 'Smile',
    exampleSentence: 'I am so glad that you passed the exam with high scores.'
  },
  { 
    id: 'v3', 
    word: 'university entrance exam', 
    partOfSpeech: '(n.phr)',
    pronunciation: '/ˌjuːnɪˈvɜːsəti ˈentrəns ɪɡˈzæm/', 
    meaning: 'Kỳ thi tuyển sinh đại học', 
    imageHint: 'A test paper with a graduation cap',
    iconName: 'FileText',
    exampleSentence: 'Students are studying very hard for the upcoming university entrance exam.'
  },
  { 
    id: 'v4', 
    word: 'academic', 
    partOfSpeech: '(adj)',
    pronunciation: '/ˌækəˈdemɪk/', 
    meaning: 'Mang tính học thuật', 
    imageHint: 'Books and scrolls',
    iconName: 'BookOpen',
    exampleSentence: 'She decided to pursue an academic career at a prestigious university.'
  },
  { 
    id: 'v5', 
    word: 'vocational', 
    partOfSpeech: '(adj)',
    pronunciation: '/vəʊˈkeɪʃənl/', 
    meaning: 'Thuộc về nghề nghiệp, học nghề', 
    imageHint: 'Tools for a trade',
    iconName: 'Hammer',
    exampleSentence: 'Vocational schools provide practical skills for specific jobs like mechanics or chefs.'
  },
  { 
    id: 'v6', 
    word: 'regrets', 
    partOfSpeech: '(n)',
    pronunciation: '/rɪˈɡrets/', 
    meaning: 'Những điều hối tiếc', 
    imageHint: 'A sad face looking back',
    iconName: 'Frown',
    exampleSentence: 'He has no regrets about choosing a vocational college instead of a university.'
  },
  { 
    id: 'v7', 
    word: 'mechanic', 
    partOfSpeech: '(n)',
    pronunciation: '/məˈkænɪk/', 
    meaning: 'Thợ cơ khí', 
    imageHint: 'Wrench and gears',
    iconName: 'Wrench',
    exampleSentence: 'The mechanic fixed the car engine very quickly.'
  },
  { 
    id: 'v8', 
    word: 'sensible', 
    partOfSpeech: '(adj)',
    pronunciation: '/ˈsensəbl/', 
    meaning: 'Hợp lý, khôn ngoan', 
    imageHint: 'Brain or lightbulb',
    iconName: 'Brain',
    exampleSentence: 'It was a sensible decision to check the weather before going out.'
  },
];

export const CONVERSATION_DATA: ConversationLine[] = [
  { id: 1, speaker: "Ms Hoa", text: "Good morning, class. There was an education fair last weekend. Did anyone go?" },
  { id: 2, speaker: "Nam", text: "Yes, Mai and I did. The fair was great, and we got a lot of useful information." },
  { id: 3, speaker: "Ms Hoa", text: "I'm glad to hear that. Would you like to share some of it with the class?" },
  { id: 4, speaker: "Mai", text: "Sure. After finishing school, we mainly have two education options. For example, we can get into university if we earn high grades or pass the university entrance exam." },
  { id: 5, speaker: "Nam", text: "That's true, but academic education isn’t everything. The other option is going to a vocational school where we can learn skills for particular jobs." },
  { id: 6, speaker: "Ms Hoa", text: "That sounds interesting. So what are your plans for the future?" },
  { id: 7, speaker: "Mai", text: "I'm hoping to go to university. Having won several biology competitions, I want to study biology and become a scientist." },
  { id: 8, speaker: "Ms Hoa", text: "Great! It’s really important to follow your dream, Mai." },
  { id: 9, speaker: "Mai", text: "My mum still regrets not having gone to university. So I want to make her proud of me. How about you, Nam?" },
  { id: 10, speaker: "Nam", text: "Well, I don’t think university is for me. I want to go to a vocational school because I want to become a car mechanic. My father owns a car repair shop. Having watched him work very hard for many years helped me make my decision." },
  { id: 11, speaker: "Ms Hoa", text: "That's very sensible, Nam! I hope you can help him grow his business." }
];

export const EXERCISE_QUESTIONS: Question[] = [
  { 
    id: 1, 
    text: "School-leavers only have the option of academic education.", 
    isTrue: false, 
    evidenceLineIds: [4, 5] 
  },
  { 
    id: 2, 
    text: "Good grades at school can help students get into university.", 
    isTrue: true, 
    evidenceLineIds: [4] 
  },
  { 
    id: 3, 
    text: "Vocational schools are for those who want to develop job skills.", 
    isTrue: true, 
    evidenceLineIds: [5] 
  },
  { 
    id: 4, 
    text: "Nam wants to work at his father’s car repair shop after leaving school.", 
    isTrue: false, 
    evidenceLineIds: [10, 11] 
  }
];

export const DEFINITION_QUESTIONS: DefinitionQuestion[] = [
  { 
    id: 1, 
    definition: "an event at which students can talk to representatives of universities or vocational schools about their study options.", 
    targetWord: "education fair" 
  },
  { 
    id: 2, 
    definition: "an exam that someone takes to be accepted into a school or university", 
    targetWord: "university entrance exam" 
  },
  { 
    id: 3, 
    definition: "Studying at school or university to gain knowledge and develop thinking skills.", 
    targetWord: "academic education" 
  },
  { 
    id: 4, 
    definition: "a place that teaches skills needed for particular jobs.", 
    targetWord: "vocational school" 
  }
];

export const GRAMMAR_QUESTIONS: GrammarQuestion[] = [
  {
    id: 1,
    beforeText: "",
    afterText: " several biology competitions, Mai wants to study biology and become a scientist.",
    correctAnswer: "Having won",
    evidenceLineId: 7
  },
  {
    id: 2,
    beforeText: "Mai’s mum still regrets not ",
    afterText: " to university.",
    correctAnswer: "having gone",
    evidenceLineId: 9
  },
  {
    id: 3,
    beforeText: "",
    afterText: " father work very hard for many years helped Nam make his decision.",
    correctAnswer: "Having watched his",
    evidenceLineId: 10
  }
];

export const LUCKY_QUESTIONS: LuckyQuestion[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: "What do many students do after finishing high school in Vietnam?",
    options: ["Go to university", "Go to kindergarten", "Retire from work", "Buy a house"],
    correctAnswer: "Go to university",
    explanation: "University (Đại học) is a common path."
  },
  {
    id: 2,
    type: 'multiple-choice',
    question: "If you want to learn practical skills like cooking or fixing cars, you should go to a ______ school.",
    options: ["primary", "vocational", "poetry", "magic"],
    correctAnswer: "vocational",
    explanation: "Vocational school (Trường nghề) teaches practical skills."
  },
  {
    id: 3,
    type: 'lucky',
  },
  {
    id: 4,
    type: 'multiple-choice',
    question: "Many students choose to ______ abroad to experience a new culture.",
    options: ["sleep", "hide", "study", "forget"],
    correctAnswer: "study",
    explanation: "Study abroad (Du học)."
  },
  {
    id: 5,
    type: 'multiple-choice',
    question: "When you enter university, you must choose a ______ to study for four years.",
    options: ["major", "hobby", "movie", "snack"],
    correctAnswer: "major",
    explanation: "Major (Chuyên ngành)."
  },
  {
    id: 6,
    type: 'multiple-choice',
    question: "To enter a top university in Vietnam, students must take an ______ exam.",
    options: ["exit", "eye", "easy", "entrance"],
    correctAnswer: "entrance",
    explanation: "Entrance exam (Kỳ thi tuyển sinh/đầu vào)."
  },
  {
    id: 7,
    type: 'multiple-choice',
    question: "What do you receive after graduating from a university?",
    options: ["A toy", "A degree", "A ticket", "A letter"],
    correctAnswer: "A degree",
    explanation: "Degree (Bằng cấp)."
  },
  {
    id: 8,
    type: 'lucky',
  },
  {
    id: 9,
    type: 'multiple-choice',
    question: "Students who work while studying are doing a ______ job.",
    options: ["part-time", "full-time", "no-time", "late-time"],
    correctAnswer: "part-time",
    explanation: "Part-time job (Việc làm thêm/bán thời gian)."
  },
  {
    id: 10,
    type: 'multiple-choice',
    question: "An ______ is a period of work experience to help students learn about a job.",
    options: ["internet", "interest", "internship", "interview"],
    correctAnswer: "internship",
    explanation: "Internship (Thực tập)."
  }
];