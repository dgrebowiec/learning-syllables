import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { CaseSensitive } from 'lucide-react';

const Quiz = ({ data, title }) => {
  const { addPoints, speak, unlockBadge } = useGame();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [useUpperCase, setUseUpperCase] = useState(false);

  useEffect(() => {
    startNewQuestion();
  }, [data]); // Reset if data changes

  // Re-generate options if case changes, keeping the same question target
  useEffect(() => {
      if (currentQuestion) {
          // We need to re-render the options with new case
          // Logic is simple: just re-render.
          // But `options` state contains objects.
      }
  }, [useUpperCase]);

  const startNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const correct = data[randomIndex];

    // Generate 2 distractors
    let distractors = [];
    while (distractors.length < 2) {
      const r = Math.floor(Math.random() * data.length);
      if (r !== randomIndex && !distractors.includes(data[r])) {
        distractors.push(data[r]);
      }
    }

    const allOptions = [correct, ...distractors].sort(() => Math.random() - 0.5);
    setCurrentQuestion(correct);
    setOptions(allOptions);
    setMessage('');

    // Auto-play sound
    setTimeout(() => {
        speak(`Znajdź: ${correct.sound || correct.char}`);
    }, 500);
  };

  const handleOptionClick = (option) => {
    if (option.id === currentQuestion.id) {
      setMessage('Super! 🎉');
      addPoints(1);
      setScore(s => {
          const newScore = s + 1;
          if (newScore >= 100) unlockBadge('quiz_wiz');
          return newScore;
      });
      speak('Dobrze!');
      setTimeout(startNewQuestion, 1500);
    } else {
      setMessage('Spróbuj jeszcze raz... 🤔');
      speak('Nie, to nie to.');
    }
  };

  const getDisplayChar = (item) => {
      return useUpperCase ? item.char.toUpperCase() : item.char;
  };

  if (!currentQuestion) return <div>Ładowanie...</div>;

  return (
    <div className="quiz-container">
      <h2>{title}</h2>

       <button
        onClick={() => setUseUpperCase(!useUpperCase)}
        className="nav-btn"
        style={{ marginBottom: '1rem', fontSize: '0.8rem', padding: '0.5rem' }}
      >
        <CaseSensitive size={16} /> {useUpperCase ? 'Zmień na małe' : 'Zmień na duże'}
      </button>

      <div className="score-board">Punkty: {score}</div>

      <div style={{ margin: '1rem', fontSize: '1.2rem' }}>
        Gdzie jest: <strong>{currentQuestion.sound || currentQuestion.char}</strong>?
      </div>

      <button className="action-btn" onClick={() => speak(currentQuestion.sound || currentQuestion.char)}>
         🔊 Powtórz
      </button>

      <div className="options-grid">
        {options.map((opt) => (
          <button
            key={opt.id}
            className="option-card"
            onClick={() => handleOptionClick(opt)}
          >
            {getDisplayChar(opt)}
          </button>
        ))}
      </div>

      {message && <div className="feedback-msg">{message}</div>}
    </div>
  );
};

export default Quiz;
