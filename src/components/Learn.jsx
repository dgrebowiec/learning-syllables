import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Volume2, ArrowRight, ArrowLeft } from 'lucide-react';

const Learn = ({ data, title }) => {
  const { speak } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = data[currentIndex];

  useEffect(() => {
    // Play sound automatically when card changes?
    // Maybe better to let kid click to avoid noise spam.
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const playSound = () => {
    // If it has a specific sound property use it, else read the char
    const textToRead = currentItem.sound || currentItem.char;
    speak(textToRead);
  };

  return (
    <div className="learn-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>{title}</h2>
      <div className="flashcard" onClick={playSound}>
        {currentItem.char}
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
          disabled={currentIndex === data.length - 1}
          style={{ opacity: currentIndex === data.length - 1 ? 0.5 : 1 }}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Learn;
