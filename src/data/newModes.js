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
    imageEmoji: '🐱',
    parts: ['K', 'O', 'T'],
    distractors: ['A', 'M', 'L']
  },
  {
    id: 'p2',
    word: 'DOM',
    imageEmoji: '🏠',
    parts: ['D', 'O', 'M'],
    distractors: ['K', 'E', 'P']
  },
  {
    id: 'p3',
    word: 'AUTO',
    imageEmoji: '🚗',
    parts: ['A', 'U', 'T', 'O'],
    distractors: ['K', 'B', 'S']
  },
  {
    id: 'p4',
    word: 'OKO',
    imageEmoji: '👁️',
    parts: ['O', 'K', 'O'],
    distractors: ['A', 'L', 'M']
  },
];
