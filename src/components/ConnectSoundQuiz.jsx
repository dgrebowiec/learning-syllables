import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Volume2, Check, X } from 'lucide-react';
import '../styles/App.css';

const ConnectSoundQuiz = ({ data, title }) => {
  const { addPoints, speak } = useGame();
  const [pairs, setPairs] = useState([]);
  const [shuffledSounds, setShuffledSounds] = useState([]);
  const [shuffledChars, setShuffledChars] = useState([]);
  const [selectedSound, setSelectedSound] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]); // Array of IDs that are matched
  const [feedback, setFeedback] = useState('Połącz głośnik z pasującym napisem!');

  // Number of pairs to show
  const NUM_PAIRS = 4;

  const initGame = () => {
    // Pick random items
    const shuffledData = [...data].sort(() => Math.random() - 0.5);
    const selectedItems = shuffledData.slice(0, NUM_PAIRS);

    // Prepare columns
    // Left column: sounds (keep order or shuffle? better shuffle to decouple visual row alignment)
    const sounds = [...selectedItems].sort(() => Math.random() - 0.5);
    const chars = [...selectedItems].sort(() => Math.random() - 0.5);

    setPairs(selectedItems);
    setShuffledSounds(sounds);
    setShuffledChars(chars);
    setMatchedPairs([]);
    setSelectedSound(null);
    setFeedback('Połącz głośnik z pasującym napisem!');
  };

  useEffect(() => {
    initGame();
  }, [data]);

  const handleSoundClick = (item) => {
    if (matchedPairs.includes(item.id)) return;

    // Play sound
    speak(item.sound || item.char);
    setSelectedSound(item);
  };

  const handleCharClick = (item) => {
    if (matchedPairs.includes(item.id)) return;

    if (!selectedSound) {
      setFeedback('Najpierw kliknij głośnik!');
      return;
    }

    if (item.id === selectedSound.id) {
      // Match!
      setMatchedPairs([...matchedPairs, item.id]);
      setSelectedSound(null);
      addPoints(1);
      setFeedback('Brawo! Dobra para!');
      speak('Brawo!');

      // Check if all matched
      if (matchedPairs.length + 1 === NUM_PAIRS) {
         setTimeout(() => {
             setFeedback('Wszystko rozwiązane! Nowa runda...');
             setTimeout(initGame, 2000);
         }, 1000);
      }

    } else {
      // Wrong match
      setFeedback('To nie pasuje. Spróbuj inaczej.');
      speak('To nie pasuje.');
      setSelectedSound(null);
    }
  };

  return (
    <div className="quiz-container" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>{title}</h2>

      <div className="feedback-msg" style={{fontSize: '1.2rem'}}>{feedback}</div>

      <div className="match-game-container">
        {/* Sounds Column */}
        <div className="match-column">
          {shuffledSounds.map((item) => {
            const isMatched = matchedPairs.includes(item.id);
            const isSelected = selectedSound && selectedSound.id === item.id;

            return (
              <button
                key={`sound-${item.id}`}
                className={`match-btn sound-btn ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSoundClick(item)}
                disabled={isMatched}
              >
                <Volume2 size={32} />
                {isMatched && <Check className="match-check" size={24} />}
              </button>
            );
          })}
        </div>

        {/* Chars Column */}
        <div className="match-column">
          {shuffledChars.map((item) => {
            const isMatched = matchedPairs.includes(item.id);

            return (
              <button
                key={`char-${item.id}`}
                className={`match-btn char-btn ${isMatched ? 'matched' : ''}`}
                onClick={() => handleCharClick(item)}
                disabled={isMatched}
              >
                {item.char}
                {isMatched && <Check className="match-check" size={24} />}
              </button>
            );
          })}
        </div>
      </div>

      <button onClick={initGame} className="control-btn" style={{ marginTop: '2rem', padding: '0.5rem 1.5rem', fontSize: '1rem' }}>
        Od nowa
      </button>
    </div>
  );
};

export default ConnectSoundQuiz;
