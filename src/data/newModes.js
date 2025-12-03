import { Star, Heart, Smile, Sun, Cloud, Zap } from 'lucide-react';

export const voiceWords = [
  { id: 'mama', word: 'mama', emoji: '👩' },
  { id: 'tata', word: 'tata', emoji: '👨' },
  { id: 'dom', word: 'dom', emoji: '🏠' },
  { id: 'kot', word: 'kot', emoji: '🐱' },
  { id: 'pies', word: 'pies', emoji: '🐶' },
  { id: 'auto', word: 'auto', emoji: '🚗' },
  { id: 'lala', word: 'lala', emoji: 'u+1F38E' }, // doll
  { id: 'oko', word: 'oko', emoji: '👁️' },
  { id: 'nos', word: 'nos', emoji: '👃' },
  { id: 'ucho', word: 'ucho', emoji: '👂' },
  { id: 'ręka', word: 'ręka', emoji: '🤚' },
  { id: 'noga', word: 'noga', emoji: '🦶' },
  { id: 'zupa', word: 'zupa', emoji: '🍲' },
];

export const logotherapyExercises = [
  {
    id: 1,
    title: 'Balonik',
    instruction: 'Nabierz dużo powietrza w policzki jak balonik, a potem powoli wypuszczaj.',
    emoji: '🎈'
  },
  {
    id: 2,
    title: 'Całuski',
    instruction: 'Zrób "dziubek" z ust i ślij całuski na lewo i prawo.',
    emoji: '💋'
  },
  {
    id: 3,
    title: 'Języczek Wędrowniczek',
    instruction: 'Dotknij czubkiem języka nosa, a potem brody.',
    emoji: '👅'
  },
  {
    id: 4,
    title: 'Konik',
    instruction: 'Kląskaj językiem jak konik stukający kopytami.',
    emoji: '🐴'
  },
  {
    id: 5,
    title: 'Czyste Zęby',
    instruction: 'Przejedź językiem po wszystkich zębach dookoła.',
    emoji: '🦷'
  },
];

export const puzzleData = [
  {
    id: 'p1',
    word: 'KOT',
    // Kot
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop',
    imageEmoji: '🐱',
    parts: ['K', 'O', 'T'],
    distractors: ['A', 'M', 'L'],
    gridSize: { rows: 2, cols: 2 } // 4 elements
  },
  {
    id: 'p2',
    word: 'DOM',
    // Dom
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=600&auto=format&fit=crop',
    imageEmoji: '🏠',
    parts: ['D', 'O', 'M'],
    distractors: ['K', 'E', 'P'],
    gridSize: { rows: 2, cols: 2 } // 4 elements
  },
  {
    id: 'p3',
    word: 'AUTO',
    // Auto
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop',
    imageEmoji: '🚗',
    parts: ['A', 'U', 'T', 'O'],
    distractors: ['K', 'B', 'S'],
    gridSize: { rows: 2, cols: 3 } // 6 elements
  },
  {
    id: 'p4',
    word: 'OKO',
    // Oko
    imageUrl: 'https://images.unsplash.com/photo-1589995635011-078e0bb91d11?q=80&w=600&auto=format&fit=crop',
    imageEmoji: '👁️',
    parts: ['O', 'K', 'O'],
    distractors: ['A', 'L', 'M'],
    gridSize: { rows: 1, cols: 3 } // 3 elements
  },
  {
    id: 'p5',
    word: 'PIES',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop',
    imageEmoji: '🐶',
    parts: ['P', 'I', 'E', 'S'],
    distractors: ['L', 'O', 'K'],
    gridSize: { rows: 2, cols: 2 }
  },
  {
    id: 'p6',
    word: 'LAS',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-dfd8f3793300?q=80&w=600&auto=format&fit=crop',
    imageEmoji: '🌲',
    parts: ['L', 'A', 'S'],
    distractors: ['K', 'O', 'T'],
    gridSize: { rows: 1, cols: 3 }
  }
];
