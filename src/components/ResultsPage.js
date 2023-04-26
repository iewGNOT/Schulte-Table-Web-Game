import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ResultsPage.css';
import Confetti from 'react-dom-confetti';

function ResultsPage() {
  const location = useLocation();
  const time = new URLSearchParams(location.search).get('time');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(function() {
    const timer = setTimeout(function() {
      setShowConfetti(true);
    }, 100);

    return function() { clearTimeout(timer); };
  }, []);

  const confettiConfig = {
    angle: 90,
    spread: 45,
    startVelocity: 45,
    elementCount: 50,
    decay: 0.9,
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };

  return (
    <div className="results-page d-flex justify-content-center align-items-center">
      <div className="content text-center">
        <h1>Time taken: {time} seconds</h1>
        <div className="buttons">
          <Link to="/">
            <button className="btn btn-light home mx-2">Home</button>
          </Link>
          <Link to="/game">
            <button className="btn btn-light play mx-2">Play Again</button>
          </Link>
        </div>
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        <Confetti active={showConfetti} config={confettiConfig} />
      </div>
    </div>
  );
};

export default ResultsPage;