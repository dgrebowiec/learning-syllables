import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ArrowLeft, Check, RefreshCw, Trophy, Star } from 'lucide-react';

const SentenceBuilder = ({ data, onBack }) => {
  const { addPoints } = useGame();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userOrder, setUserOrder] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null); // null, true, false
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (currentIdx < data.length) {
      resetLevel();
    }
  }, [currentIdx, data]);

  const resetLevel = () => {
    setUserOrder([]);
    // Ensure we start with a copy of scrambled words
    setAvailableWords([...data[currentIdx].scramble]);
    setIsCorrect(null);
  };

  const handleWordClick = (word, index) => {
    // Move from available to userOrder
    const newAvailable = [...availableWords];
    newAvailable.splice(index, 1);
    setAvailableWords(newAvailable);
    setUserOrder([...userOrder, word]);
    setIsCorrect(null);
  };

  const handleRemoveWord = (word, index) => {
    // Move from userOrder back to available
    const newUserOrder = [...userOrder];
    newUserOrder.splice(index, 1);
    setUserOrder(newUserOrder);
    setAvailableWords([...availableWords, word]);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const currentSentence = data[currentIdx].sentence;
    const constructedSentence = userOrder.join(' ');

    if (constructedSentence === currentSentence) {
      setIsCorrect(true);
      addPoints(10);
      const audio = new Audio('/sounds/correct.mp3'); // Assuming sound exists, otherwise silent
      audio.play().catch(e => console.log('Audio play failed', e));

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
      audio.play().catch(e => console.log('Audio play failed', e));
    }
  };

  if (completed) {
    return (
      <div className="game-container" style={{ textAlign: 'center', padding: '2rem' }}>
        <Trophy size={80} color="#FFD700" />
        <h2>Gratulacje!</h2>
        <p>Ukończyłeś wszystkie zdania!</p>
        <button className="nav-btn" onClick={onBack}>
          <ArrowLeft size={24} /> Wróć do menu
        </button>
      </div>
    );
  }

  const currentItem = data[currentIdx];

  return (
    <div className="game-container">
      <div className="game-header">
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft />
        </button>
        <h2>Ułóż zdanie ({currentIdx + 1}/{data.length})</h2>
      </div>

      <div className="sentence-area">
        <div className="drop-zone">
          {userOrder.length === 0 && <span className="placeholder">Klikaj w słowa, aby ułożyć zdanie...</span>}
          {userOrder.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              className="word-chip selected"
              onClick={() => handleRemoveWord(word, idx)}
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <div className="words-pool">
        {availableWords.map((word, idx) => (
          <button
            key={`${word}-${idx}`}
            className="word-chip"
            onClick={() => handleWordClick(word, idx)}
          >
            {word}
          </button>
        ))}
      </div>

      <div className="controls">
        <button
          className="action-btn check-btn"
          onClick={checkAnswer}
          disabled={availableWords.length > 0 || isCorrect === true}
        >
          <Check size={24} /> Sprawdź
        </button>
        <button className="action-btn reset-btn" onClick={resetLevel}>
          <RefreshCw size={24} />
        </button>
      </div>

      {isCorrect === true && (
        <div className="feedback correct">
          <Star size={32} fill="gold" /> Super!
        </div>
      )}

      {isCorrect === false && (
        <div className="feedback wrong">
          Spróbuj jeszcze raz!
        </div>
      )}

      <style>{`
        .sentence-area {
          background: #f0f0f0;
          border-radius: 12px;
          padding: 20px;
          min-height: 80px;
          margin: 20px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed #ccc;
        }
        .drop-zone {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
        .placeholder {
          color: #999;
          font-style: italic;
        }
        .words-pool {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 30px;
          min-height: 60px;
        }
        .word-chip {
          padding: 10px 20px;
          font-size: 1.2rem;
          background: white;
          border: 2px solid #4CC9F0;
          border-radius: 20px;
          cursor: pointer;
          font-family: 'Comic Sans MS', cursive, sans-serif;
          transition: transform 0.2s;
          box-shadow: 0 4px 0 #4CC9F0;
        }
        .word-chip:active {
          transform: translateY(4px);
          box-shadow: none;
        }
        .word-chip.selected {
          background: #4CC9F0;
          color: white;
          border-color: #3A0CA3;
          box-shadow: 0 4px 0 #3A0CA3;
        }
        .feedback {
          text-align: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 20px;
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .feedback.correct { color: #4CC9F0; }
        .feedback.wrong { color: #F72585; }

        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SentenceBuilder;
