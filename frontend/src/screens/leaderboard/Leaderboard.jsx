import React, { useContext, useEffect, useState } from 'react';
import Leaderboardrow from '../../componants/leaderboardrow/Leaderboardrow';
import { store } from '../../store';
import Axios from 'axios';
import './leaderboard.css';

const Leaderboard = () => {
  const [active, setActive] = useState('2');
  const style = { backgroundColor: 'red', borderRadius: '0.3rem' };

  const list = [
    { Name: 'Kishore', Games: '12', Score: '3010', Average: '45.7' },
    { Name: 'Kishore', Games: '12', Score: '3010', Average: '45.7' },
    { Name: 'Kishore', Games: '12', Score: '3010', Average: '45.7' },
    { Name: 'Kishore', Games: '12', Score: '3010', Average: '45.7' },
    { Name: 'Kishore', Games: '12', Score: '3010', Average: '45.7' },
    { Name: 'Kishore', Games: '12', Score: '3010', Average: '45.7' },
    { Name: 'Kishore', Games: '12', Score: '3010', Average: '45.7' },
    { Name: 'Kishore', Games: '12', Score: '3010', Average: '45.7' },
    { Name: 'Kishore', Games: '12', Score: '3010', Average: '45.7' },
    { Name: 'Kishore', Games: '12', Score: '3010', Average: '45.7' },
    { Name: 'Kishore', Games: '12', Score: '3010', Average: '45.7' },
    { Name: 'Kishore', Games: '12', Score: '3010', Average: '45.7' },
    { Name: 'Kishore', Games: '12', Score: '3010', Average: '45.7' },
    { Name: 'Kishore', Games: '12', Score: '3010', Average: '45.7' },
  ];

  const { state, dispatch } = useContext(store);
  const { user, Leaderboard } = state;

  useEffect(() => {
    const updateScore = async () => {
      try {
        const { data } = await Axios.get(`/user`);
        console.log(data);
        dispatch({ type: 'OVERALL_LEADERBOARD', payload: data });
      } catch (err) {
        alert(err);
      }
    };
    updateScore();
  }, []);

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <div
          style={active === '2' ? style : null}
          onClick={() => setActive('2')}
          className="lbh-item"
        >
          Candy Crush
        </div>
        <div
          style={active === '3' ? style : null}
          onClick={() => setActive('3')}
          className="lbh-item"
        >
          Typing Speed
        </div>
        <div
          style={active === '4' ? style : null}
          onClick={() => setActive('4')}
          className="lbh-item"
        >
          Sudoku
        </div>
      </div>

      <div className="leaderboard-table">
        <table className="lb-table">
          <thead>
            <tr>
              <th>Ranking</th>
              <th>Name</th>
              <th>Games</th>
              <th>Score</th>
              <th>High Score</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            {Leaderboard &&
              active === '2' &&
              Leaderboard.candycrush.map((e, idx) => {
                return <Leaderboardrow key={idx} data={e} rank={idx + 1} />;
              })}
            {Leaderboard &&
              active === '3' &&
              Leaderboard.typing.map((e, idx) => {
                return <Leaderboardrow key={idx} data={e} rank={idx + 1} />;
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
