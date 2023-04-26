import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './GamePage.css';

function GamePage() {
  const [countdown, setCountdown] = useState(3);
  const [grid, setGrid] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [startTime, setStartTime] = useState(null);
  const navigate = useNavigate();

  const startGame = useCallback(() => {
    setGrid(generateGrid());
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      startGame();
    }
  }, [countdown, startGame]);

  function generateGrid() {
    const numbers = Array.from({ length: 25 }, function (_, i) { return i + 1 });
    return numbers.sort(function () { return Math.random() - 0.5 });
  };

  function handleClick(number, index) {
    if (number === currentNumber) {
      const clickSound = new Audio('/click.mp3');
      clickSound.play();

      setCurrentNumber(currentNumber + 1);

      if (currentNumber === 25) {
        const endTime = Date.now();
        const timeTaken = (endTime - startTime) / 1000;
        navigate(`/results?time=${timeTaken}`);
      }
    } else {
      const button = document.getElementById(`grid-item-${index}`);
      button.classList.add('incorrect');
      setTimeout(function () { button.classList.remove('incorrect'); }, 1000);
    }
  };

  return (
    <div className="game-page">
      <h2 className="instructions-header">click from 1 to 25 in sequence</h2>
      <div className="game-content min-vh-100 d-flex flex-column justify-content-center align-items-center">
        {countdown === 0 && (
          <Link to="/">
            <button className="btn return-button">Return</button>
          </Link>
        )}
        {countdown === 0 && (
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${((currentNumber - 1) / 25) * 100}%` }}
            />
          </div>
        )}
        {countdown > 0 ? (
          <h1>{countdown}</h1>
        ) : (
          <div className="grid">
            {grid.map((number, index) => (
              <button
                key={index}
                id={`grid-item-${index}`}
                className="grid-item btn btn-light"
                onClick={() => handleClick(number, index)}
              >
                {number}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
