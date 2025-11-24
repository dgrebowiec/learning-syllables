import React from 'react';
import { useGame } from '../context/GameContext';
import { stickers } from '../data/content';

const StickerBook = () => {
  const { points, myStickers, buySticker, myBadges, badgesData } = useGame();

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

      {/* Badges Section */}
      <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '15px', marginBottom: '2rem' }}>
          <h2>Twoje Osiągnięcia 🏆</h2>
          <div className="sticker-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
              {badgesData.map(badge => {
                  const unlocked = myBadges.includes(badge.id);
                  return (
                      <div key={badge.id} className="sticker-item" style={{ opacity: unlocked ? 1 : 0.4, background: unlocked ? '#FFD700' : '#ddd' }}>
                          <div style={{ fontSize: '2rem' }}>{badge.icon}</div>
                          <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{badge.name}</div>
                          <div style={{ fontSize: '0.7rem' }}>{badge.description}</div>
                          {unlocked && <div style={{ color: 'green', fontWeight: 'bold' }}>Zdobyte!</div>}
                      </div>
                  )
              })}
          </div>
      </div>

      <h2>Twoje Naklejki</h2>
      <p style={{ textAlign: 'center' }}>Masz {points} ⭐. Zbieraj więcej i odkrywaj naklejki!</p>

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
