import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Learn from './components/Learn';
import Quiz from './components/Quiz';
import ConnectSoundQuiz from './components/ConnectSoundQuiz';
import StickerBook from './components/StickerBook';
import { letters, upperCaseLetters, syllables } from './data/content';
import { Star, BookOpen, GraduationCap, Smile, Link as LinkIcon } from 'lucide-react';
import './styles/App.css';

const MainContent = () => {
  const { points } = useGame();
  const [view, setView] = useState('menu'); // menu, learn-small, learn-big, learn-syl, quiz-small, quiz-big, quiz-syl, stickers

  const renderContent = () => {
    switch (view) {
      case 'menu':
        return (
          <div className="menu-grid">
            <button className="menu-card" onClick={() => setView('learn-small')}>
              <BookOpen size={40} />
              <br />Małe Litery
            </button>
            <button className="menu-card" onClick={() => setView('learn-big')}>
              <BookOpen size={40} />
              <br />Duże Litery
            </button>
            <button className="menu-card" onClick={() => setView('learn-syl')}>
              <BookOpen size={40} />
              <br />Sylaby
            </button>
            <button className="menu-card" style={{ backgroundColor: '#FB8500' }} onClick={() => setView('stickers')}>
              <Smile size={40} />
              <br />Naklejki
            </button>
            <button className="menu-card" style={{ backgroundColor: '#FFB703', color: '#000' }} onClick={() => setView('quiz-small')}>
              <GraduationCap size={40} />
              <br />Quiz: Małe Litery
            </button>
            <button className="menu-card" style={{ backgroundColor: '#FFB703', color: '#000' }} onClick={() => setView('quiz-big')}>
              <GraduationCap size={40} />
              <br />Quiz: Duże Litery
            </button>
            <button className="menu-card" style={{ backgroundColor: '#FFB703', color: '#000' }} onClick={() => setView('quiz-syl')}>
              <GraduationCap size={40} />
              <br />Quiz: Sylaby
            </button>
            <button className="menu-card" style={{ backgroundColor: '#8ECAE6', color: '#000' }} onClick={() => setView('match-small')}>
              <LinkIcon size={40} />
              <br />Połącz: Małe Litery
            </button>
            <button className="menu-card" style={{ backgroundColor: '#8ECAE6', color: '#000' }} onClick={() => setView('match-big')}>
              <LinkIcon size={40} />
              <br />Połącz: Duże Litery
            </button>
            <button className="menu-card" style={{ backgroundColor: '#8ECAE6', color: '#000' }} onClick={() => setView('match-syl')}>
              <LinkIcon size={40} />
              <br />Połącz: Sylaby
            </button>
          </div>
        );
      case 'learn-small':
        return <Learn data={letters} title="Małe Litery" />;
      case 'learn-big':
        return <Learn data={upperCaseLetters} title="Duże Litery" />;
      case 'learn-syl':
        return <Learn data={syllables} title="Sylaby" />;
      case 'quiz-small':
        return <Quiz data={letters} title="Zgadnij Małą Literę" />;
      case 'quiz-big':
        return <Quiz data={upperCaseLetters} title="Zgadnij Dużą Literę" />;
      case 'quiz-syl':
        return <Quiz data={syllables} title="Zgadnij Sylabę" />;
      case 'match-small':
        return <ConnectSoundQuiz data={letters} title="Połącz: Małe Litery" />;
      case 'match-big':
        return <ConnectSoundQuiz data={upperCaseLetters} title="Połącz: Duże Litery" />;
      case 'match-syl':
        return <ConnectSoundQuiz data={syllables} title="Połącz: Sylaby" />;
      case 'stickers':
        return <StickerBook />;
      default:
        return <div>Wybierz opcję</div>;
    }
  };

  return (
    <>
      <header className="header">
        <div>Mądra Sowa 🦉</div>
        <div className="points-badge">
          {points} <Star size={20} style={{ display: 'inline', verticalAlign: 'middle' }} fill="#FB8500" />
        </div>
      </header>

      <main className="main-content">
        {renderContent()}
      </main>

      <footer className="nav-footer">
        <button className="nav-btn" onClick={() => setView('menu')}>🏠</button>
        <button className="nav-btn" onClick={() => setView('stickers')}>⭐</button>
      </footer>
    </>
  );
};

const App = () => {
  return (
    <GameProvider>
      <MainContent />
    </GameProvider>
  );
};

export default App;
