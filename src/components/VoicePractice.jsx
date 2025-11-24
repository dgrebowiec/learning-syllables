import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { calculateSimilarity } from '../utils/textUtils';
import { voiceWords } from '../data/newModes';
import { Mic, Volume2, Star, ArrowRight } from 'lucide-react';
import '../styles/App.css';

const VoicePractice = () => {
  const { addPoints } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState('');

  const currentWord = voiceWords[currentIndex];

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Twoja przeglądarka nie obsługuje rozpoznawania mowy. Spróbuj w Google Chrome.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'pl-PL';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setFeedback('Słucham...');
      setTranscript('');
      setScore(null);
    };

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      setTranscript(text);
      checkResult(text);
    };

    recognition.onerror = (event) => {
      setFeedback('Nie usłyszałem. Spróbuj jeszcze raz! 👂');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const checkResult = (spokenText) => {
    const similarity = calculateSimilarity(spokenText, currentWord.word);
    const percentage = Math.round(similarity * 100);
    setScore(percentage);

    if (percentage >= 70) {
      setFeedback('Brawo! 🎉');
      addPoints(2);
    } else {
      setFeedback('Blisko! Spróbuj jeszcze raz.');
    }
  };

  const nextWord = () => {
    setCurrentIndex((prev) => (prev + 1) % voiceWords.length);
    setTranscript('');
    setScore(null);
    setFeedback('');
  };

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.lang = 'pl-PL';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="game-container">
      <h2>Powtarzanie Słów</h2>

      <div className="card-display" style={{ fontSize: '4rem', padding: '2rem' }}>
        <div>{currentWord.emoji}</div>
        <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>{currentWord.word}</div>
      </div>

      <div className="controls" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '2rem 0' }}>
        <button className="action-btn" onClick={speakWord} style={{ backgroundColor: '#4CC9F0' }}>
          <Volume2 size={32} /> Posłuchaj
        </button>

        <button
          className="action-btn"
          onClick={startListening}
          disabled={isListening}
          style={{ backgroundColor: isListening ? '#ccc' : '#F72585' }}
        >
          <Mic size={32} /> {isListening ? 'Mów teraz...' : 'Powiedz'}
        </button>
      </div>

      {transcript && (
        <div style={{ fontSize: '1.5rem', margin: '1rem' }}>
          Powiedziałeś: <strong>{transcript}</strong>
        </div>
      )}

      {score !== null && (
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: score >= 70 ? 'green' : 'orange' }}>
          Wynik: {score}%
        </div>
      )}

      <div style={{ fontSize: '1.5rem', minHeight: '3rem' }}>{feedback}</div>

      <button className="nav-btn" onClick={nextWord} style={{ marginTop: '2rem' }}>
        Dalej <ArrowRight />
      </button>
    </div>
  );
};

export default VoicePractice;
