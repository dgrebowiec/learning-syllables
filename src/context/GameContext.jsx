import React, { createContext, useState, useEffect, useContext } from 'react';
import { badges as badgesData, stickers } from '../data/content';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('points');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [myStickers, setMyStickers] = useState(() => {
    const saved = localStorage.getItem('myStickers');
    return saved ? JSON.parse(saved) : [];
  });

  const [myBadges, setMyBadges] = useState(() => {
      const saved = localStorage.getItem('myBadges');
      return saved ? JSON.parse(saved) : [];
  });

  const [ageGroup, setAgeGroupInternal] = useState(() => {
    return localStorage.getItem('ageGroup');
  });

  useEffect(() => {
    localStorage.setItem('points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('myStickers', JSON.stringify(myStickers));
  }, [myStickers]);

  useEffect(() => {
      localStorage.setItem('myBadges', JSON.stringify(myBadges));
  }, [myBadges]);

  const setAgeGroup = (group) => {
    localStorage.setItem('ageGroup', group);
    setAgeGroupInternal(group);
  };

  const addPoints = (amount) => {
    setPoints((prev) => prev + amount);
  };

  const buySticker = (sticker) => {
    if (points >= sticker.cost && !myStickers.some(s => s.id === sticker.id)) {
      setPoints((prev) => prev - sticker.cost);
      setMyStickers((prev) => [...prev, sticker]);
      return true;
    }
    return false;
  };

  const unlockBadge = (badgeId) => {
      if (!myBadges.includes(badgeId)) {
          setMyBadges(prev => [...prev, badgeId]);
          // Optional: Add bonus points for badge?
          addPoints(50);
          return true; // Unlocked
      }
      return false; // Already owned
  };

  const unlockStickerByCategory = (category) => {
    const stickersToUnlock = stickers.filter(s => s.category === category && !myStickers.some(ms => ms.id === s.id));
    if (stickersToUnlock.length > 0) {
      setMyStickers(prev => [...prev, ...stickersToUnlock]);
      addPoints(25 * stickersToUnlock.length); // Bonus points
      return true;
    }
    return false;
  };

  // Text to speech helper
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop previous speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pl-PL';
      utterance.rate = 0.8; // Slightly slower for kids
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <GameContext.Provider value={{ points, myStickers, myBadges, ageGroup, setAgeGroup, addPoints, buySticker, unlockBadge, unlockStickerByCategory, speak, badgesData }}>
      {children}
    </GameContext.Provider>
  );
};
