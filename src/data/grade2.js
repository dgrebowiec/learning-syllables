
export const sentenceBuilderData = [
  {
    id: 's1',
    sentence: 'Ala ma kota',
    scramble: ['kota', 'ma', 'Ala'],
    audio: 'ala_ma_kota'
  },
  {
    id: 's2',
    sentence: 'Pies szczeka głośno',
    scramble: ['głośno', 'Pies', 'szczeka'],
    audio: 'pies_szczeka'
  },
  {
    id: 's3',
    sentence: 'Lubię jeść lody',
    scramble: ['jeść', 'lody', 'Lubię'],
    audio: 'lubie_jesc_lody'
  },
  {
    id: 's4',
    sentence: 'Słońce świeci na niebie',
    scramble: ['na', 'świeci', 'niebie', 'Słońce'],
    audio: 'slonce_swieci'
  },
  {
    id: 's5',
    sentence: 'Zima jest zimna',
    scramble: ['jest', 'zimna', 'Zima'],
    audio: 'zima_jest_zimna'
  },
  {
    id: 's6',
    sentence: 'Książka leży na stole',
    scramble: ['stole', 'na', 'leży', 'Książka'],
    audio: 'ksiazka_lezy'
  },
  {
    id: 's7',
    sentence: 'Wiosną kwitną kwiaty',
    scramble: ['kwiaty', 'kwitną', 'Wiosną'],
    audio: 'wiosna_kwitna'
  },
  {
    id: 's8',
    sentence: 'Ptak lata wysoko',
    scramble: ['wysoko', 'lata', 'Ptak'],
    audio: 'ptak_lata'
  }
];

export const fillInBlankData = [
  {
    id: 'f1',
    type: 'sentence',
    question: 'Ala ma ____',
    answer: 'kota',
    options: ['kota', 'psa', 'dom'],
    image: '🐱'
  },
  {
    id: 'f2',
    type: 'word',
    question: 'K_t',
    answer: 'o',
    options: ['o', 'a', 'e'],
    fullWord: 'Kot',
    image: '🐱'
  },
  {
    id: 'f3',
    type: 'sentence',
    question: '____ leci wysoko',
    answer: 'Samolot',
    options: ['Samolot', 'Pociąg', 'Rower'],
    image: '✈️'
  },
  {
    id: 'f4',
    type: 'word',
    question: 'Rz_ka',
    answer: 'e',
    options: ['e', 'ę', 'a'],
    fullWord: 'Rzeka',
    image: '🌊'
  },
  {
    id: 'f5',
    type: 'sentence',
    question: 'Jemy ____ na obiad',
    answer: 'zupę',
    options: ['zupę', 'lody', 'piach'],
    image: '🍲'
  },
  {
    id: 'f6',
    type: 'word',
    question: 'G_ra',
    answer: 'ó',
    options: ['ó', 'u', 'o'],
    fullWord: 'Góra',
    image: '🏔️'
  },
  {
    id: 'f7',
    type: 'word',
    question: 'M_rze',
    answer: 'o',
    options: ['o', 'u', 'ó'],
    fullWord: 'Morze',
    image: '🌊'
  },
  {
    id: 'f8',
    type: 'word',
    question: 'Rz_d',
    answer: 'ą',
    options: ['ą', 'om', 'on'],
    fullWord: 'Rząd',
    image: '🏛️'
  },
  {
    id: 'f9',
    type: 'sentence',
    question: 'Krowa daje ____',
    answer: 'mleko',
    options: ['mleko', 'sok', 'wodę'],
    image: '🐮'
  }
];
