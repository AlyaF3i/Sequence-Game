import React, { useState } from 'react';
import './App.css';
import Card from './assets/Cards';
import ChooseGame from './ChooseGame/ChooseGame';

const App = () => {
  const [showChooseGameCard, setShowChooseGameCard] = useState(false);

  const handlePlayButtonClick = () => {
    setShowChooseGameCard(true);
  };

  return (
    <div className="App">
      <button className="play-button" onClick={handlePlayButtonClick}>
        Let's Play
      </button>
      <div className="ChooseGame-container" style={{ display: showChooseGameCard ? 'block' : 'none' }}>
        <ChooseGame onGameStart={function (name: string, number: number, playerType: 'human' | 'bot'): void {
          throw new Error('Function not implemented.');
        } } />
      </div>
      <Card />
    </div>
  );
};

export default App;
