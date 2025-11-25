import React, { useState, useMemo, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { DndProvider, useDrag, useDrop } from 'react-d-html5-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Volume2, ArrowRight } from 'lucide-react';

const ItemTypes = {
  WORD: 'word',
};

const DraggableWord = ({ word, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.WORD,
    item: { word },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onDrop(item.word, dropResult.target);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="word-tile" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {word.text}
    </div>
  );
};

const SentenceBuilder = ({ data, category, onComplete }) => {
  const { addPoints, speak, unlockStickerByCategory } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedWords, setPlacedWords] = useState([]);
  const [bankedWords, setBankedWords] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  const exerciseData = data[category];
  const currentExercise = exerciseData[currentIndex];

  useEffect(() => {
    const shuffled = [...currentExercise.words].sort(() => Math.random() - 0.5);
    setBankedWords(shuffled.map((word, index) => ({ id: `${word}-${index}`, text: word })));
    setPlacedWords([]);
    setFeedback('');
    setIsFinished(false);
  }, [currentIndex, currentExercise]);

  const handleDrop = (word, target) => {
    if (isFinished) return;
    if (target === 'sentence' && !placedWords.find(w => w.id === word.id)) {
      setPlacedWords([...placedWords, word]);
      setBankedWords(bankedWords.filter(w => w.id !== word.id));
    } else if (target === 'bank' && !bankedWords.find(w => w.id === word.id)) {
      setBankedWords([...bankedWords, word]);
      setPlacedWords(placedWords.filter(w => w.id !== word.id));
    }
  };

  const checkAnswer = () => {
    const constructedSentence = placedWords.map(w => w.text).join(' ');
    if (constructedSentence === currentExercise.sentence) {
      setFeedback('Doskonale! +15 punktów');
      addPoints(15);
      speak('Świetnie');
      setIsFinished(true);
    } else {
      setFeedback('Coś się nie zgadza. Spróbuj jeszcze raz!');
    }
  };

  const nextSentence = () => {
    if (currentIndex < exerciseData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      unlockStickerByCategory(category);
      onComplete();
    }
  };

  const [, dropSentence] = useDrop(() => ({ accept: ItemTypes.WORD, drop: () => ({ target: 'sentence' }) }));
  const [, dropBank] = useDrop(() => ({ accept: ItemTypes.WORD, drop: () => ({ target: 'bank' }) }));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="dnd-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <h2>Ułóż zdanie</h2>
          <button onClick={() => speak(currentExercise.sentence)} className="control-btn">
            <Volume2 />
          </button>
        </div>

        <div ref={dropSentence} className="sentence-drop-area">
          {placedWords.map((word) => (
            <DraggableWord key={word.id} word={word} onDrop={handleDrop} />
          ))}
        </div>

        <div ref={dropBank} className="word-bank">
          {bankedWords.map((word) => (
            <DraggableWord key={word.id} word={word} onDrop={handleDrop} />
          ))}
        </div>

        <div className="feedback-msg">{feedback}</div>

        {!isFinished ? (
          <button className="control-btn" onClick={checkAnswer} disabled={bankedWords.length > 0}>
            Sprawdź
          </button>
        ) : (
          <button className="control-btn" onClick={nextSentence}>
            {currentIndex < exerciseData.length - 1 ? 'Dalej' : 'Zakończ'} <ArrowRight />
          </button>
        )}
      </div>
    </DndProvider>
  );
};

export default SentenceBuilder;
