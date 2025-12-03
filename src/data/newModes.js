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
  { id: 'woda', word: 'woda', emoji: '💧' },
  { id: 'sok', word: 'sok', emoji: '🧃' },
  { id: 'kura', word: 'kura', emoji: '🐔' },
  { id: 'jajko', word: 'jajko', emoji: '🥚' },
  { id: 'miś', word: 'miś', emoji: '🧸' },
  { id: 'balon', word: 'balon', emoji: '🎈' },
  { id: 'lody', word: 'lody', emoji: '🍦' },
  { id: 'ryba', word: 'ryba', emoji: '🐟' },
  { id: 'ser', word: 'ser', emoji: '🧀' },
  { id: 'bułka', word: 'bułka', emoji: '🥖' },
  { id: 'krowa', word: 'krowa', emoji: '🐮' },
  { id: 'koń', word: 'koń', emoji: '🐴' },
  { id: 'owca', word: 'owca', emoji: '🐑' },
  { id: 'koza', word: 'koza', emoji: '🐐' },
  { id: 'szkoła', word: 'szkoła', emoji: '🏫' },
  { id: 'kreda', word: 'kreda', emoji: '🖍️' },
  { id: 'okno', word: 'okno', emoji: '🪟' },
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
  },
  {
    id: 'p7',
    word: 'KWIAT',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-58cb75069ed6?q=80&w=600&auto=format&fit=crop',
    imageEmoji: '🌸',
    parts: ['K', 'W', 'I', 'A', 'T'],
    distractors: ['O', 'S', 'Z'],
    gridSize: { rows: 2, cols: 3 }
  },
  {
    id: 'p8',
    word: 'SŁOŃ',
    imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=600&auto=format&fit=crop',
    imageEmoji: '🐘',
    parts: ['S', 'Ł', 'O', 'Ń'],
    distractors: ['A', 'K', 'M'],
    gridSize: { rows: 2, cols: 2 }
  },
  {
    id: 'p9',
    word: 'LODY',
    imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=600&auto=format&fit=crop',
    imageEmoji: '🍦',
    parts: ['L', 'O', 'D', 'Y'],
    distractors: ['K', 'A', 'S'],
    gridSize: { rows: 2, cols: 2 }
  },
  {
    id: 'p10',
    word: 'ZEGAR',
    imageUrl: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=600&auto=format&fit=crop',
    imageEmoji: '⏰',
    parts: ['Z', 'E', 'G', 'A', 'R'],
    distractors: ['O', 'T', 'L'],
    gridSize: { rows: 2, cols: 3 }
  },
  {
    id: 'p11',
    word: 'MIŚ',
    imageUrl: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=600&auto=format&fit=crop',
    imageEmoji: '🧸',
    parts: ['M', 'I', 'Ś'],
    distractors: ['A', 'K', 'O'],
    gridSize: { rows: 1, cols: 3 }
  },
  {
    id: 'p12',
    word: 'PIŁKA',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop',
    imageEmoji: '⚽',
    parts: ['P', 'I', 'Ł', 'K', 'A'],
    distractors: ['O', 'S', 'M'],
    gridSize: { rows: 2, cols: 3 }
  }
];
