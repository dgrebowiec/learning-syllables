import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Learn from './components/Learn';
import Quiz from './components/Quiz';
import ConnectSoundQuiz from './components/ConnectSoundQuiz';
import StickerBook from './components/StickerBook';
import VoicePractice from './components/VoicePractice';
import Logotherapy from './components/Logotherapy';
import PuzzleGame from './components/PuzzleGame';
import MissingLetter from './components/MissingLetter';
import SentenceBuilder from './components/SentenceBuilder';
import ListenWrite from './components/ListenWrite';
import { letters, upperCaseLetters, syllables } from './data/content';
import { firstGradeData } from './data/firstGradeData';
import { Star, BookOpen, GraduationCap, Smile, Link as LinkIcon, Mic, MessageCircle, Puzzle, ArrowLeft, Trophy, Edit3, MessageSquare, Music } from 'lucide-react';
import './styles/App.css';

const MainContent = () => {
  const { points, ageGroup, setAgeGroup } = useGame();
  const [view, setView] = useState(ageGroup ? 'menu' : 'age-gate');
  const [gameOptions, setGameOptions] = useState(null);

  const handleSetAgeGroup = (group) => {
    setAgeGroup(group);
    setView('menu');
  };

  const startGame = (game, options) => {
    setGameOptions(options);
    setView(game);
  };

  const renderAgeGate = () => (
    <div className="menu-grid">
      <button className="menu-card" style={{ backgroundColor: '#4CC9F0', color: '#000' }} onClick={() => handleSetAgeGroup('preschool')}>
        <Smile size={40} />
        <br />Przedszkolak
      </button>
      <button className="menu-card" style={{ backgroundColor: '#F72585' }} onClick={() => handleSetAgeGroup('first-grade')}>
        <GraduationCap size={40} />
        <br />Pierwszoklasista
      </button>
    </div>
  );

  const renderPreschoolMenu = () => (
    <div className="menu-grid">
      <button className="menu-card" style={{ backgroundColor: '#4CC9F0', color: '#000' }} onClick={() => setView('menu-learn')}>
        <BookOpen size={40} />
        <br />Nauka i Ćwiczenia
      </button>
      <button className="menu-card" style={{ backgroundColor: '#F72585' }} onClick={() => setView('menu-quiz')}>
        <GraduationCap size={40} />
        <br />Quizy i Zadania
      </button>
      <button className="menu-card" style={{ backgroundColor: '#FB8500' }} onClick={() => setView('stickers')}>
        <Smile size={40} />
        <br />Naklejki i Nagrody
      </button>
    </div>
  );

  const renderFirstGradeMenu = () => (
    <div className="menu-grid">
      <button className="menu-card" onClick={() => startGame('missing-letter', { data: firstGradeData.missingLetter, category: 'nouns', subcategory: 'fruits' })}>
        <Edit3 size={40} />
        <br />Uzupełnij Litery
      </button>
      <button className="menu-card" onClick={() => startGame('sentence-builder', { data: firstGradeData.sentenceBuilder, category: 'general' })}>
        <MessageSquare size={40} />
        <br />Ułóż Zdania
      </button>
      <button className="menu-card" onClick={() => startGame('listen-write', { data: firstGradeData.listenWrite, level: 1 })}>
        <Music size={40} />
        <br />Napisz ze Słuchu
      </button>
    </div>
  );

  const renderContent = () => {
    if (view === 'age-gate') return renderAgeGate();

    switch (view) {
      case 'menu':
        if (ageGroup === 'preschool') return renderPreschoolMenu();
        if (ageGroup === 'first-grade') return renderFirstGradeMenu();
        return renderAgeGate();

      // First Grade Games
      case 'missing-letter':
        return <MissingLetter {...gameOptions} onComplete={() => setView('menu')} />;
      case 'sentence-builder':
        return <SentenceBuilder {...gameOptions} onComplete={() => setView('menu')} />;
      case 'listen-write':
        return <ListenWrite {...gameOptions} onComplete={() => setView('menu')} />;

      // --- SUBMENU: NAUKA ---
      case 'menu-learn':
        return (
          <div className="menu-grid">
             <button className="menu-card" onClick={() => setView('menu')}>
              <ArrowLeft size={40} />
              <br />Wróć
            </button>
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
            <button className="menu-card" style={{ backgroundColor: '#F72585' }} onClick={() => setView('voice')}>
              <Mic size={40} />
              <br />Mówię!
            </button>
            <button className="menu-card" style={{ backgroundColor: '#3A0CA3' }} onClick={() => setView('logo')}>
              <MessageCircle size={40} />
              <br />Logopedia
            </button>
          </div>
        );

      // --- SUBMENU: QUIZY ---
      case 'menu-quiz':
        return (
           <div className="menu-grid">
            <button className="menu-card" onClick={() => setView('menu')}>
              <ArrowLeft size={40} />
              <br />Wróć
            </button>
            <button className="menu-card" style={{ backgroundColor: '#FFB703', color: '#000' }} onClick={() => setView('quiz-small')}>
              <GraduationCap size={40} />
              <br />Quiz: Małe
            </button>
            <button className="menu-card" style={{ backgroundColor: '#FFB703', color: '#000' }} onClick={() => setView('quiz-big')}>
              <GraduationCap size={40} />
              <br />Quiz: Duże
            </button>
            <button className="menu-card" style={{ backgroundColor: '#FFB703', color: '#000' }} onClick={() => setView('quiz-syl')}>
              <GraduationCap size={40} />
              <br />Quiz: Sylaby
            </button>
            <button className="menu-card" style={{ backgroundColor: '#8ECAE6', color: '#000' }} onClick={() => setView('match-small')}>
              <LinkIcon size={40} />
              <br />Połącz: Małe
            </button>
            <button className="menu-card" style={{ backgroundColor: '#8ECAE6', color: '#000' }} onClick={() => setView('match-big')}>
              <LinkIcon size={40} />
              <br />Połącz: Duże
            </button>
            <button className="menu-card" style={{ backgroundColor: '#8ECAE6', color: '#000' }} onClick={() => setView('match-syl')}>
              <LinkIcon size={40} />
              <br />Połącz: Sylaby
            </button>
            <button className="menu-card" style={{ backgroundColor: '#4CC9F0', color: '#000' }} onClick={() => setView('puzzle')}>
              <Puzzle size={40} />
              <br />Puzzle
            </button>
          </div>
        );

      // --- CONTENT VIEWS ---
      case 'learn-small':
        return <Learn data={letters} title="Małe Litery" type="letters" />;
      case 'learn-big':
        return <Learn data={upperCaseLetters} title="Duże Litery" type="letters_big" />;
      case 'learn-syl':
        return <Learn data={syllables} title="Sylaby" type="syllables" />;
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
      case 'voice':
        return <VoicePractice />;
      case 'logo':
        return <Logotherapy />;
      case 'puzzle':
        return <PuzzleGame />;
      default:
        return <div>Wybierz opcję</div>;
    }
  };

  return (
    <>
      <header className="header">
        <div style={{ cursor: 'pointer' }} onClick={() => setView('menu')}>🦉 Mądra Sowa</div>
        <div>
          {ageGroup && (
            <button className="change-age-btn" onClick={() => setView('age-gate')}>
              {ageGroup === 'preschool' ? <Smile size={20} /> : <GraduationCap size={20} />}
            </button>
          )}
          <span className="points-badge">
            {points} <Star size={20} style={{ display: 'inline', verticalAlign: 'middle' }} fill="#FB8500" />
          </span>
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
