import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Volume2 } from 'lucide-react';

const Quiz = ({ data, title }) => {
  const { addPoints, speak } = useGame();
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [feedback, setFeedback] = useState('');

  const generateQuestion = () => {
    // Pick a random item as the question
    const randomIndex = Math.floor(Math.random() * data.length);
    const target = data[randomIndex];

    // Pick 3 other random distractors
    const distractors = [];
    while (distractors.length < 3) {
      const r = Math.floor(Math.random() * data.length);
      if (r !== randomIndex && !distractors.includes(data[r])) {
        distractors.push(data[r]);
      }
    }

    const allOptions = [target, ...distractors].sort(() => Math.random() - 0.5);

    setQuestion(target);
    setOptions(allOptions);
    setSelectedOption(null);
    setIsCorrect(null);
    setFeedback('Posłuchaj i wybierz!');

    // Auto speak the question with a slight delay
    setTimeout(() => {
       speak(`Gdzie jest ${target.sound || target.char}?`);
    }, 500);
  };

  useEffect(() => {
    generateQuestion();
  }, [data]);

  const handleOptionClick = (option) => {
    if (isCorrect === true) return; // Prevent clicking after success

    setSelectedOption(option);

    if (option.id === question.id) {
      setIsCorrect(true);
      setFeedback('Brawo! Super!');
      speak('Brawo!');
      addPoints(1); // Reward

      // Auto next question after delay
      setTimeout(() => {
        generateQuestion();
      }, 2000);
    } else {
      setIsCorrect(false);
      setFeedback('Spróbuj jeszcze raz!');
      speak('Oj, spróbuj jeszcze raz.');
    }
  };

  const repeatQuestion = () => {
    if (question) {
       speak(`Gdzie jest ${question.sound || question.char}?`);
    }
  };

  if (!question) return <div>Ładowanie...</div>;

  return (
    <div className="quiz-container" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>{title}</h2>

      <button onClick={repeatQuestion} className="control-btn" style={{ marginBottom: '1rem' }}>
        <Volume2 size={40} />
      </button>

      <div className="feedback-msg">{feedback}</div>

      <div className="quiz-options">
        {options.map((opt) => (
          <button
            key={opt.id}
            className={`quiz-btn
              ${selectedOption === opt && isCorrect === true ? 'correct' : ''}
              ${selectedOption === opt && isCorrect === false ? 'wrong' : ''}
            `}
            onClick={() => handleOptionClick(opt)}
          >
            {opt.char}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
