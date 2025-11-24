import React, { useState } from 'react';
import { logotherapyExercises } from '../data/newModes';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import '../styles/App.css';

const Logotherapy = () => {
  const [index, setIndex] = useState(0);

  const currentExercise = logotherapyExercises[index];

  const nextExercise = () => {
    setIndex((prev) => (prev + 1) % logotherapyExercises.length);
  };

  const prevExercise = () => {
    setIndex((prev) => (prev - 1 + logotherapyExercises.length) % logotherapyExercises.length);
  };

  return (
    <div className="game-container">
      <h2>Ćwiczenia Logopedyczne</h2>

      <div className="card-display" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '6rem', marginBottom: '2rem' }}>
          {currentExercise.emoji}
        </div>
        <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#3A0CA3' }}>
          {currentExercise.title}
        </h3>
        <p style={{ fontSize: '1.5rem', lineHeight: '1.4' }}>
          {currentExercise.instruction}
        </p>
      </div>

      <div className="controls" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
        <button className="nav-btn" onClick={prevExercise}>
          <ArrowLeft /> Poprzednie
        </button>
        <button className="nav-btn" onClick={nextExercise}>
          Następne <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Logotherapy;
