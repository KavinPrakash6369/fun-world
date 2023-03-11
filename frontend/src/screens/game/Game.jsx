import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { store } from '../../store';
import './game.css';
const Game = () => {
  const { state, dispatch } = useContext(store);
  const { user, candyCrush, typingSpeed } = state;

  useEffect(() => {
    const getScore = async () => {
      try {
        const { data } = await Axios.get(`/candycrush/${user.user._id}`);
        dispatch({ type: 'CANDY_CRUSH', payload: data });
      } catch (err) {
        alert(err);
      }
    };
    if (user) {
      getScore();
    }
  });

  useEffect(() => {
    const getScore = async () => {
      try {
        const { data } = await Axios.get(`/typingspeed/${user.user._id}`);
        dispatch({ type: 'TYPING_SPEED', payload: data });
      } catch (err) {
        alert(err);
      }
    };
    if (user) {
      getScore();
    }
  });

  return (
    <div className="games">
      <div className="game-cards">
        {user && (
          <Link to="/game/typo">
            <div className="game-card">
              <div className="gc-left">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8iRZ4oIbQwXol4xfDTsKGXwD_CRWJkM6V7vekNwpJXIP15VJQiS5JTHb_ZoeJkFa87QE&usqp=CAU"
                  alt=""
                  srcset=""
                />
              </div>
              <div className="gc-right">
                <h1>TYPING GAME</h1>
                <p className="description">
                  It is a Game which test your typing speed{' '}
                </p>
                <div className="gc-gamecount">
                  <h3>Games</h3>{' '}
                  <p>
                    {user
                      ? typingSpeed
                        ? typingSpeed.gamecount
                        : '0'
                      : '--:--'}
                  </p>{' '}
                </div>
                <div className="gc-highest-core">
                  {' '}
                  <h3>High Score</h3>{' '}
                  <p>
                    {user
                      ? typingSpeed
                        ? typingSpeed.highscore
                        : '0'
                      : '--:--'}
                  </p>{' '}
                </div>
                <div className="gc-Average">
                  {' '}
                  <h3>Average</h3>{' '}
                  <p>
                    {user
                      ? typingSpeed
                        ? (
                            typingSpeed.totalscore / typingSpeed.gamecount
                          ).toFixed(2)
                        : '0'
                      : '--:--'}
                  </p>{' '}
                </div>
              </div>
            </div>
          </Link>
        )}
        {user && (
          <Link to="/game/candycrush">
            <div className="game-card">
              <div className="gc-left">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvrfXujVmcLKTfgq5ttv1xQNKTND6EsvRWng&usqp=CAU"
                  alt=""
                  srcset=""
                />
              </div>
              <div className="gc-right">
                <h1>Candy Crush</h1>
                <p className="description">
                  It is a Game with candies it's fun to play{' '}
                </p>
                <div className="gc-gamecount">
                  <h3>Games</h3>{' '}
                  <p>
                    {user ? (candyCrush ? candyCrush.gamecount : '0') : '--:--'}
                  </p>{' '}
                </div>
                <div className="gc-highest-core">
                  {' '}
                  <h3>High Score</h3>{' '}
                  <p>
                    {user ? (candyCrush ? candyCrush.highscore : '0') : '--:--'}
                  </p>{' '}
                </div>
                <div className="gc-Average">
                  {' '}
                  <h3>Average</h3>{' '}
                  <p>
                    {user
                      ? candyCrush
                        ? (
                            candyCrush.totalscore / candyCrush.gamecount
                          ).toFixed(2)
                        : '0'
                      : '--:--'}
                  </p>{' '}
                </div>
              </div>
            </div>
          </Link>
        )}
        {user && (
          <Link to="/game/sudoku">
            <div className="game-card">
              <div className="gc-left">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKt2wtYESaUWhE3jTGm5xG5FdVWOevFQDzDA&usqp=CAU"
                  alt=""
                  srcset=""
                />
              </div>
              <div className="gc-right">
                <h1>Sudoku</h1>
                <p className="description">A challenging game for your IQ </p>
                <div className="gc-gamecount">
                  <h3>Games</h3> <p>10</p>{' '}
                </div>
                <div className="gc-highest-core">
                  {' '}
                  <h3>High Score</h3> <p>500</p>{' '}
                </div>
                <div className="gc-Average">
                  {' '}
                  <h3>Average</h3> <p>45.8</p>{' '}
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Game;
