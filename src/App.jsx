import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Learn from './components/Learn';
import Quiz from './components/Quiz';
import ConnectSoundQuiz from './components/ConnectSoundQuiz';
import StickerBook from './components/StickerBook';
import VoicePractice from './components/VoicePractice';
import Logotherapy from './components/Logotherapy';
import PuzzleGame from './components/PuzzleGame';
import SentenceBuilder from './components/SentenceBuilder';
import FillInTheBlank from './components/FillInTheBlank';
import { letters, upperCaseLetters, syllables } from './data/content';
import { sentenceBuilderData, fillInBlankData } from './data/grade2';
import { Star, BookOpen, GraduationCap, Smile, Link as LinkIcon, Mic, MessageCircle, Puzzle, ArrowLeft, Trophy, PenTool } from 'lucide-react';
import './styles/App.css';

const MainContent = () => {
  const { points } = useGame();
  const [view, setView] = useState('menu'); // menu, menu-learn, menu-quiz, learn-small...

  // Helper to render a submenu or content
  const renderContent = () => {
    switch (view) {
      // --- MAIN MENU ---
      case 'menu':
        return (
          <div className="menu-grid">
            <button className="menu-card" style={{ backgroundColor: '#4CC9F0', color: '#000' }} onClick={() => setView('menu-learn')}>
              <BookOpen size={40} />
              <br />Nauka i Ćwiczenia
            </button>
            <button className="menu-card" style={{ backgroundColor: '#F72585' }} onClick={() => setView('menu-quiz')}>
              <GraduationCap size={40} />
              <br />Quizy i Zadania
            </button>
            <button className="menu-card" style={{ backgroundColor: '#7209B7', color: 'white' }} onClick={() => setView('menu-grade2')}>
              <PenTool size={40} />
              <br />Szkoła
            </button>
            <button className="menu-card" style={{ backgroundColor: '#FB8500' }} onClick={() => setView('stickers')}>
              <Smile size={40} />
              <br />Naklejki i Nagrody
            </button>
          </div>
        );

      // --- SUBMENU: KLASA 2 ---
      case 'menu-grade2':
        return (
          <div className="menu-grid">
            <button className="menu-card" onClick={() => setView('menu')}>
              <ArrowLeft size={40} />
              <br />Wróć
            </button>
            <button className="menu-card" style={{ backgroundColor: '#4CC9F0' }} onClick={() => setView('sentence-builder')}>
              <PenTool size={40} />
              <br />Budowanie Zdań
            </button>
            <button className="menu-card" style={{ backgroundColor: '#F72585' }} onClick={() => setView('fill-blanks')}>
              <PenTool size={40} />
              <br />Uzupełnianki
            </button>
          </div>
        );

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
             {/* Merged logic could go here, but keeping separate buttons is clearer for kids if we have space now */}
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
      case 'sentence-builder':
        return <SentenceBuilder data={sentenceBuilderData} onBack={() => setView('menu-grade2')} />;
      case 'fill-blanks':
        return <FillInTheBlank data={fillInBlankData} onBack={() => setView('menu-grade2')} />;
      default:
        return <div>Wybierz opcję</div>;
    }
  };

  return (
    <>
      <header className="header">
        <div style={{ cursor: 'pointer' }} onClick={() => setView('menu')}>🦉 Mądra Sowa</div>
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
