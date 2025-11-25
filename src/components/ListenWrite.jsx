import React, { useState, useMemo, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Volume2, ArrowRight } from 'lucide-react';

const ListenWrite = ({ data, level, onComplete }) => {
  const { addPoints, speak, unlockStickerByCategory } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [writtenWord, setWrittenWord] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  const exerciseData = data[`level${level}`];
  const currentExercise = exerciseData[currentIndex];

  useEffect(() => {
    setWrittenWord('');
    setFeedback('');
    setIsFinished(false);
  }, [currentIndex, currentExercise]);

  const availableLetters = useMemo(() => {
    if (level < 3) {
      const letters = [...currentExercise.letters, ...currentExercise.distractors];
      return letters.sort(() => Math.random() - 0.5);
    }
    return 'aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż'.split('');
  }, [currentExercise, level]);

  const handleLetterClick = (letter) => {
    if (writtenWord.length < currentExercise.word.length && !isFinished) {
      setWrittenWord(writtenWord + letter);
    }
  };

  const handleBackspace = () => {
    if (!isFinished) {
      setWrittenWord(writtenWord.slice(0, -1));
    }
  };

  const checkAnswer = () => {
    if (writtenWord.toLowerCase() === currentExercise.word.toLowerCase()) {
      setFeedback('Super! +20 punktów');
      addPoints(20);
      speak('Świetnie');
      setIsFinished(true);
    } else {
      setFeedback('Niestety, spróbuj jeszcze raz.');
    }
  };

  const nextWord = () => {
    if (currentIndex < exerciseData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      unlockStickerByCategory(`level${level}`);
      onComplete();
    }
  };

  return (
    <div className="dnd-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <h2>Napisz ze słuchu</h2>
        <button onClick={() => speak(currentExercise.word)} className="control-btn">
          <Volume2 />
        </button>
      </div>

      <div className="word-display-write">
        {writtenWord.split('').map((char, i) => (
          <div key={i} className={`letter-tile ${isFinished ? 'correct' : ''}`}>{char}</div>
        ))}
        {Array(currentExercise.word.length - writtenWord.length).fill().map((_, i) => (
          <div key={i} className="letter-tile placeholder"></div>
        ))}
      </div>

      {!isFinished && (
        <div className="letter-bank-write">
          {availableLetters.map((letter, i) => (
            <button key={i} className="letter-tile-btn" onClick={() => handleLetterClick(letter)}>
              {letter}
            </button>
          ))}
          <button className="letter-tile-btn" onClick={handleBackspace}>⌫</button>
        </div>
      )}

      <div className="feedback-msg">{feedback}</div>

      {!isFinished ? (
        <button
          className="control-btn"
          onClick={checkAnswer}
          disabled={writtenWord.length !== currentExercise.word.length}
        >
          Sprawdź
        </button>
      ) : (
        <button className="control-btn" onClick={nextWord}>
          {currentIndex < exerciseData.length - 1 ? 'Dalej' : 'Zakończ'} <ArrowRight />
        </button>
      )}
    </div>
  );
};

export default ListenWrite;
