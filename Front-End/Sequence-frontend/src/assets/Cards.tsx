import React, { useState, useEffect } from 'react';
import './Cards.css';

interface CardProps {
  posX: number;
  posY: number;
}

const Card = ({ posX, posY }: CardProps) => {
  const [cardPosX, setCardPosX] = useState(posX);
  const [cardPosY, setCardPosY] = useState(posY);
  const [angle, setAngle] = useState(Math.random() * Math.PI * 2);

  useEffect(() => {
    const amplitude = 15;
    const speed = 0.1;
    const easing = 0.1;

    const interval = setInterval(() => {
      const newX = cardPosX + Math.cos(angle) * amplitude;
      const newY = cardPosY + Math.sin(angle) * amplitude;

      if (newX < 0 || newX > window.outerWidth) {
        setAngle(Math.PI - angle);
      } else if (newY < 0 || newY > window.outerHeight) {
        setAngle(-angle);
      } else {
        setCardPosX(cardPosX + (newX - cardPosX) * easing);
        setCardPosY(cardPosY + (newY - cardPosY) * easing);
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [angle, cardPosX, cardPosY]);

  useEffect(() => {
    const handleResize = () => {
      setCardPosX(cardPosX * (window.outerWidth / window.innerWidth));
      setCardPosY(cardPosY * (window.outerHeight / window.innerHeight));
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [cardPosX, cardPosY]);

  return (
    <div
      className="card"
      style={{ transform: `translate(${cardPosX}px, ${cardPosY}px)` }}
    ></div>
  );
};

const Cards = () => {
  const numCards = 20;
  const cards = [];

  for (let i = 0; i < numCards; i++) {
    const posX = Math.random() * window.outerWidth;
    const posY = Math.random() * window.outerHeight;

    cards.push(<Card key={i} posX={posX} posY={posY} />);
  }

  return <div className="cards-container">{cards}</div>;
};

export default Cards;