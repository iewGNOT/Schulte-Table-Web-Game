//HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage(){
  return (
    <div className="home-page bg-aqua d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="text-white">Schulte Table Game</h1>
      <Link to="/game">
        <button className="btn btn-lg mt-5">Play</button>
      </Link>
    </div>
  );
};

export default HomePage;