import React from 'react';
import { useGame } from '../context/GameContext';
import { stickers } from '../data/content';

const StickerBook = () => {
  const { points, myStickers, buySticker } = useGame();

  const handleBuy = (sticker) => {
    const isOwned = myStickers.some(s => s.id === sticker.id);
    if (isOwned) return;

    if (points >= sticker.cost) {
      buySticker(sticker);
    } else {
      alert('Za mało gwiazdek! Graj więcej, żeby zdobyć gwiazdki.');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <h2>Twoje Naklejki</h2>
      <p style={{ textAlign: 'center' }}>Zbieraj gwiazdki i odkrywaj naklejki!</p>

      <div className="sticker-grid">
        {stickers.map(sticker => {
          const isOwned = myStickers.some(s => s.id === sticker.id);
          return (
            <div
              key={sticker.id}
              className={`sticker-item ${isOwned ? 'owned' : ''}`}
              onClick={() => handleBuy(sticker)}
              style={{ opacity: isOwned ? 1 : 0.7 }}
            >
              <div className="sticker-emoji">
                {isOwned ? sticker.emoji : '❓'}
              </div>
              <div style={{ fontWeight: 'bold' }}>{sticker.name}</div>
              {!isOwned && (
                <div className="sticker-cost">
                  Koszt: {sticker.cost} ⭐
                </div>
              )}
              {isOwned && <div style={{ color: 'green' }}>Zdobyte!</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StickerBook;
