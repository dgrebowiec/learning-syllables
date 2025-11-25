import React, { useState, useMemo, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ArrowRight } from 'lucide-react';

const ItemTypes = {
  LETTER: 'letter',
};

const DraggableLetter = ({ letter, onDragStart }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.LETTER,
    item: { letter },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="letter-tile available"
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
      onMouseDown={() => onDragStart(letter)}
    >
      {letter}
    </div>
  );
};

const DroppablePlaceholder = ({ onDrop, filledLetter, isCorrect }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.LETTER,
    drop: (item) => onDrop(item.letter),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let className = `letter-tile placeholder ${isOver ? 'hover' : ''}`;
  if (isCorrect === true) className += ' correct';
  if (isCorrect === false) className += ' wrong';

  return (
    <div ref={drop} className={className}>
      {filledLetter}
    </div>
  );
};

const MissingLetter = ({ data, category, subcategory, onComplete }) => {
  const { addPoints, speak, unlockStickerByCategory } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [droppedLetters, setDroppedLetters] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [correctness, setCorrectness] = useState([]);

  const exerciseData = data[category][subcategory];
  const currentExercise = exerciseData[currentIndex];

  useEffect(() => {
    setDroppedLetters(new Array(currentExercise.missing.length).fill(null));
    setFeedback('');
    setIsFinished(false);
    setCorrectness([]);
  }, [currentIndex, currentExercise]);

  const handleDrop = (letter, placeholderIndex) => {
    if (isFinished) return;
    const newDroppedLetters = [...droppedLetters];
    newDroppedLetters[placeholderIndex] = letter;
    setDroppedLetters(newDroppedLetters);
  };

  const checkAnswer = () => {
    const isCorrect = droppedLetters.join('') === currentExercise.missing.join('');

    if (isCorrect) {
      setFeedback('Świetnie! +10 punktów');
      addPoints(10);
      speak(currentExercise.fullWord);
      setIsFinished(true);

      const newCorrectness = droppedLetters.map((l, i) => l === currentExercise.missing[i]);
      setCorrectness(newCorrectness);
    } else {
      setFeedback('Spróbuj jeszcze raz!');
       const newCorrectness = droppedLetters.map((l, i) => l === currentExercise.missing[i]);
       setCorrectness(newCorrectness);
    }
  };

  const nextWord = () => {
    if (currentIndex < exerciseData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      unlockStickerByCategory(subcategory);
      onComplete();
    }
  };

  const wordWithPlaceholder = useMemo(() => {
    let finalWord = [];
    let missingIndex = 0;
    currentExercise.fullWord.split('').forEach((char, index) => {
      const missingChars = currentExercise.missing;
      const originalCharIndex = missingChars.indexOf(char);

      if (originalCharIndex !== -1 && missingIndex < missingChars.length) {
        finalWord.push({ type: 'placeholder', id: `p-${missingIndex}`, index: missingIndex });
        missingIndex++;
      } else {
        finalWord.push({ type: 'char', char: char, id: `c-${index}` });
      }
    });
    return finalWord;
  }, [currentExercise]);

  const availableLetters = useMemo(() => {
      return [...currentExercise.missing].sort(() => Math.random() - 0.5);
  }, [currentExercise]);


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="dnd-container">
        <h2>Uzupełnij brakujące litery</h2>

        <div className="word-display">
          {wordWithPlaceholder.map(item =>
            item.type === 'placeholder' ? (
              <DroppablePlaceholder
                key={item.id}
                onDrop={(letter) => handleDrop(letter, item.index)}
                filledLetter={droppedLetters[item.index]}
                isCorrect={isFinished ? correctness[item.index] : undefined}
              />
            ) : (
              <div key={item.id} className="letter-tile">{item.char}</div>
            )
          )}
        </div>

        {!isFinished && (
          <div className="letter-bank">
            {availableLetters.map((letter, i) => (
              <DraggableLetter key={i} letter={letter} onDragStart={() => {}} />
            ))}
          </div>
        )}

        <div className="feedback-msg">{feedback}</div>

        {!isFinished ? (
          <button className="control-btn" onClick={checkAnswer} disabled={droppedLetters.includes(null)}>
            Sprawdź
          </button>
        ) : (
          <button className="control-btn" onClick={nextWord}>
            {currentIndex < exerciseData.length - 1 ? 'Dalej' : 'Zakończ'} <ArrowRight />
          </button>
        )}
      </div>
    </DndProvider>
  );
};

export default MissingLetter;
