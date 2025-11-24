import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { puzzleData } from '../data/newModes';
import { calculateSimilarity } from '../utils/textUtils';
import { Mic, Volume2, ArrowRight, Heart, Check, Keyboard } from 'lucide-react';
import '../styles/App.css';

const PuzzleGame = () => {
  const { addPoints, unlockBadge } = useGame();
  const [levelIndex, setLevelIndex] = useState(0);
  const [stage, setStage] = useState('match'); // 'match', 'speak', 'write', 'rewrite', 'reward'
  const [selectedWord, setSelectedWord] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [writtenLetters, setWrittenLetters] = useState([]);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [rewriteInput, setRewriteInput] = useState('');
  const [solvedCount, setSolvedCount] = useState(0);

  const currentLevel = puzzleData[levelIndex];

  // Initialize available letters when entering write stage
  const startWriteStage = () => {
    const letters = [...currentLevel.parts, ...currentLevel.distractors];
    // Shuffle
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    setAvailableLetters(letters.map((l, i) => ({ id: i, char: l })));
    setWrittenLetters([]);
    setStage('write');
  };

  const startRewriteStage = () => {
      setStage('rewrite');
      setRewriteInput('');
  };

  const handleMatch = (item) => {
    setSelectedWord(item);
    setStage('speak');
  };

  const startListening = () => {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Twoja przeglądarka nie obsługuje rozpoznawania mowy.');
        startWriteStage();
        return;
      }

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'pl-PL';
      recognition.continuous = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        const similarity = calculateSimilarity(text, currentLevel.word);
        if (similarity >= 0.6) {
             startWriteStage();
        } else {
            alert(`Słyszałem "${text}". Spróbuj jeszcze raz!`);
        }
      };
      recognition.start();
  };

  const addLetter = (letterObj) => {
    setWrittenLetters([...writtenLetters, letterObj]);
    setAvailableLetters(availableLetters.filter(l => l.id !== letterObj.id));

    // Check if word is complete
    const currentString = [...writtenLetters, letterObj].map(l => l.char).join('');
    if (currentString === currentLevel.word) {
      setTimeout(startRewriteStage, 1000);
    }
  };

  const removeLetter = (letterObj) => {
      setWrittenLetters(writtenLetters.filter(l => l.id !== letterObj.id));
      setAvailableLetters([...availableLetters, letterObj]);
  };

  const checkRewrite = () => {
      if (rewriteInput.toLowerCase().trim() === currentLevel.word.toLowerCase()) {
          addPoints(10);
          setSolvedCount(prev => {
              const newCount = prev + 1;
              if (newCount >= 5) unlockBadge('puzzle_solver');
              return newCount;
          });
          setStage('reward');
      } else {
          alert('Ups! Spróbuj przepisać dokładnie. ' + currentLevel.word);
      }
  };

  const nextLevel = () => {
    setLevelIndex((prev) => (prev + 1) % puzzleData.length);
    setStage('match');
    setSelectedWord(null);
  };

  const speakPrompt = () => {
      const u = new SpeechSynthesisUtterance(currentLevel.word);
      u.lang = 'pl-PL';
      window.speechSynthesis.speak(u);
  };

  // Render Logic
  if (stage === 'reward') {
      return (
          <div className="game-container">
              <h2>Brawo!</h2>
              <div style={{ fontSize: '8rem', margin: '2rem' }}>❤️</div>
              <p style={{ fontSize: '2rem' }}>Ułożyłeś słowo: {currentLevel.word}</p>
              <button className="nav-btn" onClick={nextLevel}>Następne <ArrowRight /></button>
          </div>
      );
  }

  return (
    <div className="game-container">
      <h2>Magiczne Puzzle</h2>

      {/* Visual Context */}
      <div className="card-display" style={{ fontSize: '6rem', marginBottom: '2rem' }}>
          {currentLevel.imageEmoji}
      </div>

      {stage === 'match' && (
          <div>
              <p style={{fontSize: '1.5rem'}}>Co to jest? Kliknij, aby zacząć!</p>
              <button className="action-btn" onClick={() => handleMatch(currentLevel)} style={{ fontSize: '2rem', padding: '1rem 3rem' }}>
                  Start
              </button>
          </div>
      )}

      {stage === 'speak' && (
          <div>
              <p style={{fontSize: '1.5rem'}}>Powiedz to słowo:</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className="action-btn" onClick={speakPrompt}><Volume2/></button>
                <button className="action-btn" onClick={startListening} style={{ backgroundColor: isListening ? '#ccc' : '#F72585' }}>
                    <Mic/> {isListening ? 'Słucham...' : 'Mów'}
                </button>
              </div>
              <button className="text-btn" onClick={startWriteStage} style={{marginTop: '2rem'}}>Pomiń (mam chrypkę)</button>
          </div>
      )}

      {stage === 'write' && (
          <div>
              <p style={{fontSize: '1.5rem'}}>Ułóż słowo z literek:</p>

              {/* Target Slots */}
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem', minHeight: '60px' }}>
                  {writtenLetters.map(l => (
                      <button key={l.id} className="letter-tile" onClick={() => removeLetter(l)}>
                          {l.char}
                      </button>
                  ))}
                  {/* Empty slots for visual hint */}
                  {[...Array(Math.max(0, currentLevel.word.length - writtenLetters.length))].map((_, i) => (
                       <div key={`empty-${i}`} className="letter-tile placeholder"></div>
                  ))}
              </div>

              {/* Available Letters */}
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {availableLetters.map(l => (
                      <button key={l.id} className="letter-tile available" onClick={() => addLetter(l)}>
                          {l.char}
                      </button>
                  ))}
              </div>
          </div>
      )}

      {stage === 'rewrite' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <p style={{fontSize: '1.5rem'}}>Teraz przepisz to słowo:</p>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#3A0CA3', letterSpacing: '5px' }}>
                  {currentLevel.word}
              </div>
              <input
                type="text"
                value={rewriteInput}
                onChange={(e) => setRewriteInput(e.target.value)}
                style={{
                    fontSize: '2rem',
                    padding: '0.5rem',
                    borderRadius: '10px',
                    border: '3px solid #4CC9F0',
                    textAlign: 'center',
                    width: '300px'
                }}
                placeholder="..."
              />
              <button className="action-btn" onClick={checkRewrite}>
                  <Check /> Sprawdź
              </button>
          </div>
      )}
    </div>
  );
};

export default PuzzleGame;
