import React, { useState } from 'react';

interface CardProps {
  id: number;
  color: string;
  x: number;
  y: number;
  speed: number;
}

const CARD_SIZE = 100;
const MAX_SPEED = 5;

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function getRandomColor(): string {
  const colors = ['red', 'green', 'blue', 'orange', 'purple'];
  return colors[getRandomInt(colors.length)];
}

function getRandomSpeed(): number {
  return getRandomInt(MAX_SPEED) + 1;
}

function getRandomPosition(): [number, number] {
  const x = getRandomInt(window.innerWidth - CARD_SIZE);
  const y = getRandomInt(window.innerHeight - CARD_SIZE);
  return [x, y];
}

function generateCards(numCards: number): CardProps[] {
  const cards: CardProps[] = [];
  for (let i = 0; i < numCards; i++) {
    const [x, y] = getRandomPosition();
    cards.push({
      id: i,
      color: getRandomColor(),
      x,
      y,
      speed: getRandomSpeed(),
    });
  }
  return cards;
}

function moveCards(cards: CardProps[]): CardProps[] {
  return cards.map((card) => {
    const { x, y, speed } = card;
    let newX = x + speed;
    if (newX > window.innerWidth) {
      newX = -CARD_SIZE;
    }
    return { ...card, x: newX };
  });
}

function LandingPage() {
  const [cards, setCards] = useState(generateCards(10));

  function handleButtonClick() {
    // Do something when the button is clicked
    console.log('Button clicked!');
  }

  function updateCards() {
    setCards(moveCards(cards));
  }

  setInterval(updateCards, 30);

  return (
    <div className="app">
      <div className="cards-container">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card"
            style={{ backgroundColor: card.color, left: card.x, top: card.y }}
          />
        ))}
      </div>
      <button className="button" onClick={handleButtonClick}>
        Click Me!
      </button>
    </div>
  );
}

export default LandingPage;

