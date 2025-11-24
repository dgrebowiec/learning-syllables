import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { puzzleData } from '../data/newModes';
import { Volume2, ArrowRight, Check } from 'lucide-react';
import '../styles/App.css';

const PuzzleGame = () => {
  const { addPoints, unlockBadge } = useGame();
  const [levelIndex, setLevelIndex] = useState(0);
  const [stage, setStage] = useState('puzzle'); // 'puzzle', 'reveal', 'letters', 'reward'
  const [puzzleType, setPuzzleType] = useState('swap'); // 'swap' or 'drag'
  const [puzzlePieces, setPuzzlePieces] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  // Word formation state
  const [writtenLetters, setWrittenLetters] = useState([]);
  const [availableLetters, setAvailableLetters] = useState([]);

  const currentLevel = puzzleData[levelIndex];

  useEffect(() => {
    initLevel();
  }, [levelIndex]);

  const initLevel = () => {
    // 1. Pick mode
    const mode = Math.random() > 0.5 ? 'swap' : 'drag';
    setPuzzleType(mode);
    setStage('puzzle');

    // 2. Generate Pieces
    const { rows, cols } = currentLevel.gridSize;
    const pieces = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        pieces.push({
          id: `${r}-${c}`,
          correctIndex: r * cols + c,
          currentPos: null, // will be set after shuffle
          bgX: (c * 100) / (cols - 1),
          bgY: (r * 100) / (rows - 1),
        });
      }
    }

    // 3. Shuffle
    if (mode === 'swap') {
        const shuffled = [...pieces];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setPuzzlePieces(shuffled.map((p, i) => ({ ...p, currentPos: i })));
    } else {
        // Drag mode: pieces are in a "pool", grid is empty
        const shuffled = [...pieces];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        // In drag mode, pieces in the pool have currentPos = -1 (not on board)
        // Or we can track board state separate from pool.
        // Let's use a single array where board slots are indices 0..N-1, and pool is separate.
        // Actually, simpler:
        // puzzlePieces = array of size (rows*cols). Some are null (empty slots).
        // poolPieces = array of pieces waiting to be placed.

        // Let's unify:
        // We need a 'boardState' array of length rows*cols.
        // And a 'poolState' array.
        // Since I used puzzlePieces as the main state, let's adapt.

        setPuzzlePieces(pieces.map(p => ({ ...p, currentPos: 'pool' }))); // All start in pool
    }

    // 4. Init Letters (hidden until stage 3)
    const letters = [...currentLevel.parts, ...currentLevel.distractors];
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    setAvailableLetters(letters.map((l, i) => ({ id: i, char: l })));
    setWrittenLetters([]);
  };

  const handlePuzzleComplete = () => {
      setStage('reveal');
      setTimeout(() => speakWord(currentLevel.word), 500);
      setTimeout(() => setStage('letters'), 2000); // Wait a bit then show letters, or show immediately?
      // Requirement: "pozniej pokaze sie napisane slowo ... pozniej bedzie wypowiedziane ... na samym dole trzeba bedzieulozyc z dostepnych literek"
      // Let's do: Reveal -> Speak -> (User Interaction for letters)
      // I'll enable the letter section immediately after reveal.
      setStage('letters');
  };

  const speakWord = (text) => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'pl-PL';
      window.speechSynthesis.speak(u);
  };

  // --- Puzzle Logic: Swap Mode ---
  const handleSwapClick = (index) => {
      if (puzzleType !== 'swap') return;
      if (stage !== 'puzzle') return;

      // Basic click-to-swap logic could be: click first, click second -> swap.
      // But drag and drop is preferred.
  };

  const handleDragStart = (e, piece, sourceIndex, source) => {
      // source can be 'board' or 'pool'
      setDraggedItem({ piece, sourceIndex, source });
  };

  const handleDrop = (e, targetIndex, targetSource) => {
      e.preventDefault();
      if (!draggedItem) return;

      const newPieces = [...puzzlePieces];

      if (puzzleType === 'swap') {
          // Swap two items on the board
          if (targetSource === 'board' && draggedItem.source === 'board') {
             const temp = newPieces[draggedItem.sourceIndex];
             newPieces[draggedItem.sourceIndex] = newPieces[targetIndex];
             newPieces[targetIndex] = temp;

             // Update currentPos for correctness check (actually index is position in array)
             setPuzzlePieces(newPieces);
             checkCompletion(newPieces);
          }
      } else if (puzzleType === 'drag') {
          // Drag from Pool to Board, or Board to Board, or Board to Pool
          // Here puzzlePieces tracks the Pool. We need a separate state for Board?
          // Let's change state structure for Drag mode.
          // We need:
          // 1. `boardState`: array of (null | piece)
          // 2. `poolState`: array of (piece)
          // This is getting complex to share state. Let's separate or unify logic.
      }
  };

  // Re-thinking State for Simplicity
  // Let's keep `boardState` as the truth.
  // Swap Mode: boardState has all pieces.
  // Drag Mode: boardState has nulls initially. poolState has all pieces.

  const [boardState, setBoardState] = useState([]);
  const [poolState, setPoolState] = useState([]);

  useEffect(() => {
    // Re-sync with InitLevel logic but updating these new states
    if (!currentLevel) return;

    const { rows, cols } = currentLevel.gridSize;
    const total = rows * cols;
    const pieces = [];
    for (let i = 0; i < total; i++) {
        pieces.push({
            id: `p-${i}`,
            correctIndex: i,
            bgX: ((i % cols) * 100) / (cols - 1 || 1),
            bgY: ((Math.floor(i / cols)) * 100) / (rows - 1 || 1),
        });
    }

    if (puzzleType === 'swap') {
        // Shuffle pieces into boardState
        const shuffled = [...pieces];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setBoardState(shuffled);
        setPoolState([]);
    } else {
        // Drag mode
        setBoardState(new Array(total).fill(null));
        // Shuffle pieces for pool
        const shuffled = [...pieces];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setPoolState(shuffled);
    }
  }, [puzzleType, levelIndex]);


  const checkCompletion = (currentBoard) => {
      const isComplete = currentBoard.every((p, i) => p && p.correctIndex === i);
      if (isComplete) {
          handlePuzzleComplete();
      }
  };

  const onDropBoard = (targetIndex) => {
      if (!draggedItem) return;

      const newBoard = [...boardState];
      const newPool = [...poolState];
      const sourcePiece = draggedItem.piece;

      if (puzzleType === 'swap') {
          // Swap logic
          if (draggedItem.source === 'board') {
              const targetPiece = newBoard[targetIndex];
              newBoard[targetIndex] = sourcePiece;
              newBoard[draggedItem.sourceIndex] = targetPiece;
              setBoardState(newBoard);
              checkCompletion(newBoard);
          }
      } else {
          // Drag Mode
          if (draggedItem.source === 'pool') {
              // Pool -> Board
              const existingPiece = newBoard[targetIndex];
              newBoard[targetIndex] = sourcePiece;
              // Remove from pool
              const poolIdx = newPool.findIndex(p => p.id === sourcePiece.id);
              if (poolIdx > -1) newPool.splice(poolIdx, 1);
              // If there was a piece there, return to pool
              if (existingPiece) newPool.push(existingPiece);

              setBoardState(newBoard);
              setPoolState(newPool);
              checkCompletion(newBoard);
          } else if (draggedItem.source === 'board') {
              // Board -> Board (move)
              const existingAtTarget = newBoard[targetIndex];
              newBoard[targetIndex] = sourcePiece;
              newBoard[draggedItem.sourceIndex] = existingAtTarget; // Swap if occupied, or null
              setBoardState(newBoard);
              checkCompletion(newBoard);
          }
      }
      setDraggedItem(null);
  };

  const onDropPool = () => {
      // Only for Drag mode: return piece to pool
      if (puzzleType !== 'drag' || !draggedItem) return;
      if (draggedItem.source === 'pool') return; // already in pool

      const newBoard = [...boardState];
      const newPool = [...poolState];

      // Remove from board
      newBoard[draggedItem.sourceIndex] = null;
      // Add to pool
      newPool.push(draggedItem.piece);

      setBoardState(newBoard);
      setPoolState(newPool);
      setDraggedItem(null);
  };

  // --- Letter Logic ---
  const addLetter = (letterObj) => {
    const newWritten = [...writtenLetters, letterObj];
    setWrittenLetters(newWritten);
    setAvailableLetters(availableLetters.filter(l => l.id !== letterObj.id));

    // Check Word
    const currentString = newWritten.map(l => l.char).join('');
    if (currentString === currentLevel.word) {
      addPoints(20);
      setStage('reward');
    }
  };

  const removeLetter = (letterObj) => {
      setWrittenLetters(writtenLetters.filter(l => l.id !== letterObj.id));
      setAvailableLetters([...availableLetters, letterObj]);
  };

  const nextLevel = () => {
    setLevelIndex((prev) => (prev + 1) % puzzleData.length);
    // Init will trigger via useEffect
  };

  // Styles helpers
  const getGridStyle = () => ({
      display: 'grid',
      gridTemplateColumns: `repeat(${currentLevel.gridSize.cols}, 1fr)`,
      gap: '2px',
      width: '300px', // Fixed size for consistency
      height: `${(300 / currentLevel.gridSize.cols) * currentLevel.gridSize.rows}px`,
      border: '4px solid #3A0CA3',
      backgroundColor: '#eee',
      margin: '0 auto'
  });

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

      {/* STAGE 1 & 2: Puzzle Board */}
      <div style={{ marginBottom: '2rem' }}>
          <div style={getGridStyle()}>
              {boardState.map((piece, i) => (
                  <div
                      key={i}
                      draggable={stage === 'puzzle' && (!!piece || puzzleType === 'drag')}
                      onDragStart={(e) => piece && handleDragStart(e, piece, i, 'board')}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => onDropBoard(i)}
                      style={{
                          width: '100%',
                          height: '100%',
                          backgroundImage: piece ? `url(${currentLevel.imageUrl})` : 'none',
                          backgroundSize: `${currentLevel.gridSize.cols * 100}% ${currentLevel.gridSize.rows * 100}%`,
                          backgroundPosition: piece ? `${piece.bgX}% ${piece.bgY}%` : 'center',
                          backgroundColor: piece ? 'transparent' : '#ddd',
                          cursor: stage === 'puzzle' ? 'grab' : 'default',
                          border: '1px solid #fff',
                          opacity: (draggedItem && draggedItem.piece === piece) ? 0.5 : 1
                      }}
                  />
              ))}
          </div>

          {/* Drag Mode: Pool of pieces */}
          {puzzleType === 'drag' && stage === 'puzzle' && (
             <div
                style={{ marginTop: '1rem', minHeight: '80px', display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center', padding: '10px', background: '#f0f0f0', borderRadius: '10px' }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDropPool}
             >
                 {poolState.map((piece, i) => (
                     <div
                        key={piece.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, piece, i, 'pool')}
                        style={{
                            width: '60px',
                            height: '60px',
                            backgroundImage: `url(${currentLevel.imageUrl})`,
                            backgroundSize: `${currentLevel.gridSize.cols * 100}% ${currentLevel.gridSize.rows * 100}%`,
                            backgroundPosition: `${piece.bgX}% ${piece.bgY}%`,
                            cursor: 'grab',
                            border: '1px solid #333'
                        }}
                     />
                 ))}
             </div>
          )}
      </div>

      {/* STAGE 2: Revealed Word & Audio */}
      {(stage === 'reveal' || stage === 'letters' || stage === 'reward') && (
          <div style={{ textAlign: 'center', animation: 'fadeIn 1s' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#3A0CA3', letterSpacing: '2px' }}>
                      {currentLevel.word}
                  </span>
                  <button className="action-btn" onClick={() => speakWord(currentLevel.word)} style={{ padding: '0.5rem' }}>
                      <Volume2 />
                  </button>
              </div>
          </div>
      )}

      {/* STAGE 3: Letters */}
      {stage === 'letters' && (
          <div style={{ marginTop: '2rem', borderTop: '2px dashed #ccc', paddingTop: '1rem', width: '100%' }}>
              <p style={{fontSize: '1.2rem', marginBottom: '1rem'}}>Ułóż słowo z literek:</p>
               {/* Target Slots */}
               <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem', minHeight: '60px' }}>
                  {writtenLetters.map(l => (
                      <button key={l.id} className="letter-tile" onClick={() => removeLetter(l)}>
                          {l.char}
                      </button>
                  ))}
                  {/* Placeholder slots */}
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

    </div>
  );
};

export default PuzzleGame;
