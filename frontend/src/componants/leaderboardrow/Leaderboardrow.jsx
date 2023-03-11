import React from 'react';
import './leaderboardrow.css';

const Leaderboardrow = ({ data, rank }) => {
  return (
    <tr className="leaderboardrow">
      <td>{rank}</td>
      <td>{data.name}</td>
      <td>{data.gamecount}</td>
      <td>{data.totalscore}</td>
      <td>{data.highscore}</td>
      <td>{(data.totalscore / data.gamecount).toFixed(2)}</td>
    </tr>
  );
};

export default Leaderboardrow;
