import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { calculateSimilarity } from '../utils/stringMatching';
import { Mic, ArrowRight, Volume2, RotateCcw } from 'lucide-react';

const Speaking = ({ data, title }) => {
  const { addPoints, speak } = useGame();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [matchPercentage, setMatchPercentage] = useState(null);
  const [feedback, setFeedback] = useState('Naciśnij mikrofon i mów!');
  const [recognitionObj, setRecognitionObj] = useState(null);
  const [notSupported, setNotSupported] = useState(false);

  const currentItem = data[currentIndex];

  useEffect(() => {
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setNotSupported(true);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'pl-PL';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setFeedback('Słucham...');
      setTranscript('');
      setMatchPercentage(null);
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      checkResult(text);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      setFeedback('Nie zrozumiałem, spróbuj jeszcze raz.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    setRecognitionObj(recognition);
  }, [currentIndex]); // Re-init not strictly needed on index change but keeps it clean

  const startListening = () => {
    if (recognitionObj && !isListening) {
      try {
        recognitionObj.start();
      } catch (e) {
        console.error("Start error:", e);
      }
    }
  };

  const checkResult = (spokenText) => {
    // Compare spoken text with currentItem.char or currentItem.sound
    // We prefer comparing with 'sound' if available (e.g. for letters 'be' vs 'b'),
    // but users might say the letter name or the sound.
    // For simplicity, let's try comparing with the display char first.
    // If the data has specific 'spoken' field, use that.

    // Actually, for letters like 'b', user might say 'be'.
    // Let's check against both char and sound if available.

    const target1 = currentItem.char;
    const target2 = currentItem.sound || currentItem.char;

    const score1 = calculateSimilarity(spokenText, target1);
    const score2 = calculateSimilarity(spokenText, target2);

    const bestScore = Math.max(score1, score2);

    setMatchPercentage(bestScore);

    if (bestScore >= 80) {
      setFeedback(`Brawo! (${bestScore}%)`);
      addPoints(2); // Higher reward for speaking
      speak('Super!');
    } else if (bestScore >= 50) {
      setFeedback(`Blisko! (${bestScore}%) Spróbuj wyraźniej.`);
      speak('Blisko, spróbuj jeszcze raz.');
    } else {
      setFeedback(`Nie do końca. (${bestScore}%)`);
      speak('Spróbuj jeszcze raz.');
    }
  };

  const nextItem = () => {
    setTranscript('');
    setMatchPercentage(null);
    setFeedback('Naciśnij mikrofon i mów!');
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const playSound = () => {
     // Use the sound property if available (e.g. "be"), otherwise char
     speak(currentItem.sound || currentItem.char);
  };

  if (notSupported) {
    return (
      <div className="speaking-container">
        <h2>Twoja przeglądarka nie obsługuje rozpoznawania mowy.</h2>
        <p>Spróbuj w Google Chrome lub Safari.</p>
      </div>
    );
  }

  return (
    <div className="speaking-container" style={{ textAlign: 'center', padding: '20px' }}>
      <h2>{title}</h2>

      <div className="card-display" style={{
        fontSize: '8rem',
        fontWeight: 'bold',
        margin: '20px auto',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '3px solid #333',
        borderRadius: '20px',
        width: '300px',
        backgroundColor: '#fff'
      }}>
        {currentItem.char}
      </div>

      <div className="controls" style={{ display: 'flex', gap: '20px', justifyContent: 'center', margin: '20px' }}>
        <button onClick={playSound} className="control-btn" style={{ padding: '15px', borderRadius: '50%' }}>
          <Volume2 size={32} />
        </button>

        <button
          onClick={startListening}
          className={`control-btn ${isListening ? 'listening' : ''}`}
          style={{
            padding: '20px',
            borderRadius: '50%',
            backgroundColor: isListening ? '#ff4d4d' : '#4CAF50',
            color: 'white'
          }}
        >
          <Mic size={40} />
        </button>

        <button onClick={nextItem} className="control-btn" style={{ padding: '15px', borderRadius: '50%' }}>
          <ArrowRight size={32} />
        </button>
      </div>

      <div className="results-area" style={{ minHeight: '100px' }}>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{feedback}</p>
        {transcript && (
          <p>Usłyszałem: <strong>{transcript}</strong></p>
        )}
      </div>

      <style>{`
        .listening {
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 77, 77, 0.7); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(255, 77, 77, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 77, 77, 0); }
        }
      `}</style>
    </div>
  );
};

export default Speaking;
