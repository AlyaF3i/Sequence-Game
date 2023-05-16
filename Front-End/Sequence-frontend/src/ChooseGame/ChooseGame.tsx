import React, { useState } from 'react';
import "./ChooseGame.css"


type PlayerType = 'human' | 'bot';

interface Props {
  onGameStart: (name: string, number: number, playerType: PlayerType) => void;
}

const ChooseGame: React.FC<Props> = ({ onGameStart }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState<number>(2);
  const [playerType, setPlayerType] = useState<PlayerType>('bot');

  
  const handleStartGame = () => {
    if (name && playerType ) {
      const url = "http://127.0.0.1:8000/create_user/";
const data = {
  name: name,
  ip: "123444",
  port: 0,
};

fetch(url, {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(response => {
    if (response.ok) {
      // Request successful
      console.log(response.json());
    } else {
      // Request failed
      throw new Error("Error: " + response.status);
    }
  })
  .then(result => {
    // Process the response
    console.log(result);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  })
    }
  };

  return (
    <div className="choose-game-container">
      <label>
        Choose Your Name:{' '}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <div>
        Select a number:
        <label>
          <input
            type="radio"
            value={1}
            checked={number === 1}
            onChange={() => setNumber(1)}
          />{' '}
          1
        </label>
        <label>
          <input
            type="radio"
            value={2}
            checked={number === 2}
            onChange={() => setNumber(2)}
          />{' '}
          2
        </label>
        <label>
          <input
            type="radio"
            value={3}
            checked={number === 3}
            onChange={() => setNumber(3)}
          />{' '}
          3
        </label>
      </div>

      <div>
        Choose your player type:
        <label>
          <input
            type="radio"
            value="human"
            checked={playerType === 'human'}
            onChange={() => setPlayerType('human')}
          />{' '}
          Human
        </label>
        <label>
          <input
            type="radio"
            value="bot"
            checked={playerType === 'bot'}
            onChange={() => setPlayerType('bot')}
          />{' '}
          Bot
        </label>
        
      </div>

      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default ChooseGame;

