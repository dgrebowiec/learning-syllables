import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { CaseSensitive } from 'lucide-react';

const ConnectSoundQuiz = ({ data, title }) => {
  const { addPoints, speak } = useGame();
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [matched, setMatched] = useState([]);
  const [useUpperCase, setUseUpperCase] = useState(false);

  useEffect(() => {
    startNewGame();
  }, [data]);

  const startNewGame = () => {
    // Pick 4 random items
    const shuffled = [...data].sort(() => 0.5 - Math.random()).slice(0, 4);
    setItems(shuffled);
    setMatched([]);
    setSelected(null);
  };

  const handlePlaySound = (item) => {
    speak(item.sound || item.char);
    setSelected(item);
  };

  const handleMatch = (item) => {
    if (!selected) {
      speak('Najpierw posłuchaj dźwięku!');
      return;
    }

    if (item.id === selected.id) {
      setMatched([...matched, item.id]);
      addPoints(2);
      speak('Brawo!');
      setSelected(null);
    } else {
      speak('To nie pasuje.');
    }
  };

  const getDisplayChar = (item) => {
      return useUpperCase ? item.char.toUpperCase() : item.char;
  };

  if (items.length === 0) return <div>Ładowanie...</div>;
  if (matched.length === items.length) {
      return (
          <div className="quiz-container">
              <h2>Brawo! Wszystko połączone! 🎉</h2>
              <button className="action-btn" onClick={startNewGame}>Jeszcze raz</button>
          </div>
      )
  }

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

      <p>Posłuchaj i dopasuj!</p>

      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', flexWrap: 'wrap' }}>

        {/* Sound Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             {items.map(item => (
                 <button
                    key={`sound-${item.id}`}
                    className="action-btn"
                    style={{
                        backgroundColor: matched.includes(item.id)
                            ? '#ADB5BD' // Grey for matched
                            : (selected?.id === item.id ? '#FFD60A' : '#4361EE'), // Yellow for selected, Blue for default
                        borderColor: selected?.id === item.id ? '#000' : 'transparent',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        transform: selected?.id === item.id ? 'scale(1.05)' : 'scale(1)',
                        transition: 'all 0.2s'
                    }}
                    onClick={() => !matched.includes(item.id) && handlePlaySound(item)}
                    disabled={matched.includes(item.id)}
                 >
                     {matched.includes(item.id) ? '✅' : '🔊 ???'}
                 </button>
             ))}
        </div>

        {/* Text/Char Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {items.sort((a,b) => a.id.localeCompare(b.id)).map(item => (
                <button
                    key={`char-${item.id}`}
                    className="option-card"
                    style={{
                        opacity: matched.includes(item.id) ? 0.6 : 1,
                        backgroundColor: matched.includes(item.id)
                            ? '#ADB5BD'
                            : '#7209B7', // Purple for options
                        color: 'white',
                        border: matched.includes(item.id) ? '2px solid #52B788' : 'none',
                    }}
                    onClick={() => !matched.includes(item.id) && handleMatch(item)}
                >
                    {getDisplayChar(item)}
                </button>
            ))}
        </div>

      </div>
    </div>
  );
};

export default ConnectSoundQuiz;
