import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Volume2, ArrowRight, ArrowLeft, CaseSensitive, Star } from 'lucide-react';

const Learn = ({ data, title, type }) => {
  const { speak, addPoints, unlockBadge } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [useUpperCase, setUseUpperCase] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Determine current item based on toggle
  const baseItem = data[currentIndex];
  const displayChar = useUpperCase ? baseItem.char.toUpperCase() : baseItem.char;

  const playSound = () => {
    // If it has a specific sound property use it, else read the char
    const textToRead = baseItem.sound || displayChar;
    speak(textToRead);
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
        // Finished
        if (!completed) {
            setCompleted(true);
            addPoints(10);
            if (type === 'letters') unlockBadge('master_small');
            if (type === 'letters_big') unlockBadge('master_big');
            if (type === 'syllables') unlockBadge('master_syllables');

            // Audio feedback for finish
            speak("Gratulacje! Koniec lekcji.");
        }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="learn-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>{title}</h2>

      {/* Case Toggle */}
      <button
        onClick={() => setUseUpperCase(!useUpperCase)}
        className="nav-btn"
        style={{ marginBottom: '1rem', fontSize: '1rem', padding: '0.5rem 1rem' }}
      >
        <CaseSensitive size={24} /> {useUpperCase ? 'Zmień na małe' : 'Zmień na duże'}
      </button>

      {completed ? (
          <div style={{ textAlign: 'center', animation: 'fadeIn 1s' }}>
              <div style={{ fontSize: '5rem' }}>🏆</div>
              <h3>Wspaniale!</h3>
              <p>Zdobywasz 10 gwiazdek!</p>
              <button className="action-btn" onClick={() => { setCompleted(false); setCurrentIndex(0); }}>Jeszcze raz</button>
          </div>
      ) : (
          <>
            <div className="flashcard" onClick={playSound}>
                {displayChar}
            </div>

            <button onClick={playSound} className="control-btn" style={{ marginBottom: '1rem', background: '#8ECAE6', boxShadow: '0 4px 0 #219EBC' }}>
                <Volume2 size={32} />
            </button>

            <div className="controls">
                <button
                className="control-btn"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
                >
                <ArrowLeft />
                </button>
                <div style={{ fontSize: '1.5rem', alignSelf: 'center' }}>
                {currentIndex + 1} / {data.length}
                </div>
                <button
                className="control-btn"
                onClick={handleNext}
                >
                {currentIndex === data.length - 1 ? <Star fill="gold" /> : <ArrowRight />}
                </button>
            </div>
          </>
      )}
    </div>
  );
};

export default Learn;
