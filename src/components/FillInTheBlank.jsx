import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ArrowLeft, Check, Trophy, Star } from 'lucide-react';

const FillInTheBlank = ({ data, onBack }) => {
  const { addPoints, unlockBadge } = useGame();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (currentIdx < data.length) {
      resetLevel();
    }
  }, [currentIdx, data]);

  const resetLevel = () => {
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleOptionClick = (option) => {
    if (isCorrect === true) return; // Prevent clicking after success
    setSelectedOption(option);

    // Immediate check or wait for "Check" button?
    // Let's do immediate check for better flow in this simple game,
    // or keep "Check" button for consistency with SentenceBuilder.
    // Let's stick to "Check" button pattern or immediate feedback pattern.
    // Immediate feedback is often better for this type. Let's try "Select then Check".
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    if (!selectedOption) return;

    const currentItem = data[currentIdx];
    if (selectedOption === currentItem.answer) {
      setIsCorrect(true);
      addPoints(10);
      const audio = new Audio('/sounds/correct.mp3');
      audio.play().catch(e => console.log('Audio error', e));

      setTimeout(() => {
        if (currentIdx + 1 < data.length) {
          setCurrentIdx(prev => prev + 1);
        } else {
          setCompleted(true);
        }
      }, 1500);
    } else {
      setIsCorrect(false);
      const audio = new Audio('/sounds/wrong.mp3');
      audio.play().catch(e => console.log('Audio error', e));
    }
  };

  useEffect(() => {
    if (completed) {
      unlockBadge('spelling_master');
    }
  }, [completed, unlockBadge]);

  if (completed) {
    return (
      <div className="game-container" style={{ textAlign: 'center', padding: '2rem' }}>
        <Trophy size={80} color="#FFD700" />
        <h2>Gratulacje!</h2>
        <p>Ukończyłeś wszystkie zadania!</p>
        <div style={{ margin: '20px 0', color: '#7209B7', fontWeight: 'bold' }}>
            Zdobyto odznakę: Mistrz Ortografii! 📝
        </div>
        <button className="nav-btn" onClick={onBack}>
          <ArrowLeft size={24} /> Wróć do menu
        </button>
      </div>
    );
  }

  const currentItem = data[currentIdx];
  const parts = currentItem.question.split('____');

  return (
    <div className="game-container">
      <div className="game-header">
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft />
        </button>
        <h2>Uzupełnianka ({currentIdx + 1}/{data.length})</h2>
      </div>

      <div className="question-card">
        <div className="image-display" style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          {currentItem.image}
        </div>

        <div className="sentence-display">
            {currentItem.type === 'sentence' ? (
                // Sentence with gap
                <h2>
                    {parts[0]}
                    <span className="gap">
                        {isCorrect === true ? currentItem.answer : (selectedOption || '___')}
                    </span>
                    {parts[1]}
                </h2>
            ) : (
                // Word with missing letter (e.g., K_t)
                <h2>
                   {currentItem.question.replace('_', isCorrect === true ? currentItem.answer : (selectedOption || '_'))}
                </h2>
            )}
        </div>
      </div>

      <div className="options-grid">
        {currentItem.options.map((opt, idx) => (
          <button
            key={idx}
            className={`option-btn ${selectedOption === opt ? 'selected' : ''}`}
            onClick={() => handleOptionClick(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="controls">
        <button
          className="action-btn check-btn"
          onClick={checkAnswer}
          disabled={!selectedOption || isCorrect === true}
        >
          <Check size={24} /> Sprawdź
        </button>
      </div>

      {isCorrect === true && (
        <div className="feedback correct">
          <Star size={32} fill="gold" /> Brawo!
        </div>
      )}

      {isCorrect === false && (
        <div className="feedback wrong">
          Ups, pomyłka!
        </div>
      )}

      <style>{`
        .question-card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          margin: 20px auto;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          text-align: center;
          max-width: 600px;
        }
        .gap {
          display: inline-block;
          border-bottom: 3px solid #3A0CA3;
          min-width: 80px;
          text-align: center;
          color: #F72585;
          margin: 0 5px;
        }
        .options-grid {
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }
        .option-btn {
          padding: 15px 30px;
          font-size: 1.5rem;
          background: white;
          border: 3px solid #FB8500;
          border-radius: 15px;
          cursor: pointer;
          font-family: 'Comic Sans MS', cursive;
          transition: all 0.2s;
          box-shadow: 0 5px 0 #e07a00;
        }
        .option-btn:active {
          transform: translateY(5px);
          box-shadow: none;
        }
        .option-btn.selected {
          background: #FB8500;
          color: white;
          transform: translateY(2px);
          box-shadow: 0 3px 0 #e07a00;
        }
        .feedback {
          text-align: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 10px;
        }
        .feedback.correct { color: #4CC9F0; }
        .feedback.wrong { color: #F72585; }
      `}</style>
    </div>
  );
};

export default FillInTheBlank;
