export const firstGradeData = {
  missingLetter: {
    nouns: {
      fruits: [
        { id: 'f1', word: 'banan', missing: ['a'], level: 1, fullWord: 'banan' },
        { id: 'f2', word: 'cytryna', missing: ['y'], level: 2, fullWord: 'cytryna' },
        { id: 'f3', word: 'truskawka', missing: ['u', 'a'], level: 3, fullWord: 'truskawka' },
      ],
      vegetables: [
        { id: 'v1', word: 'marchew', missing: ['a', 'e'], level: 2, fullWord: 'marchew' },
        { id: 'v2', word: 'pomidor', missing: ['o', 'i'], level: 3, fullWord: 'pomidor' },
      ],
      toys: [
        { id: 't1', word: 'lalka', missing: ['a'], level: 1, fullWord: 'lalka' },
        { id: 't2', word: 'miś', missing: ['i'], level: 1, fullWord: 'miś' },
        { id: 't3', word: 'auto', missing: ['u'], level: 1, fullWord: 'auto' },
      ],
    },
    verbs: {
      //
    },
  },
  sentenceBuilder: {
    general: [
      { id: 's1', sentence: 'Ala ma kota.', words: ['Ala', 'ma', 'kota.'], level: 1 },
      { id: 's2', sentence: 'To jest dom.', words: ['To', 'jest', 'dom.'], level: 1 },
      { id: 's3', sentence: 'Lubię lody.', words: ['Lubię', 'lody.'], level: 1 },
      { id: 's4', sentence: 'Słońce świeci na niebie.', words: ['Słońce', 'świeci', 'na', 'niebie.'], level: 2 },
      { id: 's5', sentence: 'Piesek bawi się piłką.', words: ['Piesek', 'bawi', 'się', 'piłką.'], level: 2 },
    ],
  },
  listenWrite: {
    level1: [
      { id: 'lw1', word: 'dom', letters: ['d', 'o', 'm'], distractors: [] },
      { id: 'lw2', word: 'kot', letters: ['k', 'o', 't'], distractors: [] },
    ],
    level2: [
      { id: 'lw3', word: 'oko', letters: ['o', 'k', 'o'], distractors: ['a', 'l'] },
      { id: 'lw4', word: 'nos', letters: ['n', 'o', 's'], distractors: ['b', 'c'] },
    ],
    level3: [
      // For level 3, we can provide the full alphabet in the component itself
      { id: 'lw5', word: 'auto', letters: [], distractors: [] },
      { id: 'lw6', word: 'lalka', letters: [], distractors: [] },
    ],
  },
};
