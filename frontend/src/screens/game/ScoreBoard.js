import React from 'react';

export default function ScoreBoard({ scores, times }) {
  return (
    <div className="score-container">
      <h2 className="purples"> Score: {scores} </h2>{' '}
      <h2 className="timer"> Timer: {times} </h2>{' '}
    </div>
  );
}
