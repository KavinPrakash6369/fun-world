import React, { useContext, useEffect, useMemo, useState } from 'react';
import './CandyCrush.css';
import Axios from 'axios';
import blueCandy from '../../assets/blue-candy.png';
import greenCandy from '../../assets/green-candy.png';
import orangeCandy from '../../assets/orange-candy.png';
import purpleCandy from '../../assets/purple-candy.png';
import redCandy from '../../assets/red-candy.png';
import yellowCandy from '../../assets/yellow-candy.png';
import blank from '../../assets/blank.png';
import ScoreBoard from './ScoreBoard';
import { store } from '../../store.js';

const width = 8;
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
];

export default function CandyCrush() {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareDrag, setSquareDrag] = useState(null);
  const [squareReplace, setSquareReplace] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [isGameOver, setIsGameOver] = useState(false);
  const [start, setStart] = useState(false);

  const { state, dispatch } = useContext(store);
  const { user } = state;

  const checkColumnThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnThree = [i, i + width, i + 2 * width];
      const checkColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      if (
        columnThree.every(
          (box) => currentColorArrangement[box] === checkColor && !isBlank
        )
      ) {
        setScore((s) => s + 3);
        columnThree.forEach((box) => (currentColorArrangement[box] = blank));
        return true;
      }
    }
  };

  const checkRowThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowThree = [i, i + 1, i + 2];
      const checkColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      if (notValid.includes(i)) continue;
      if (
        rowThree.every(
          (box) => currentColorArrangement[box] === checkColor && !isBlank
        )
      ) {
        setScore((s) => s + 3);
        rowThree.forEach((box) => (currentColorArrangement[box] = blank));
        return true;
      }
    }
  };

  const checkColumnFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnThree = [i, i + width, i + 2 * width, i + 3 * width];
      const checkColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      if (
        columnThree.every(
          (box) => currentColorArrangement[box] === checkColor && !isBlank
        )
      ) {
        setScore((s) => s + 4);
        columnThree.forEach((box) => (currentColorArrangement[box] = blank));
        return true;
      }
    }
  };

  const checkRowFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowFour = [i, i + 1, i + 2, i + 3];
      const checkColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      if (notValid.includes(i)) continue;
      if (
        rowFour.every(
          (box) => currentColorArrangement[box] === checkColor && !isBlank
        )
      ) {
        setScore((s) => s + 4);
        rowFour.forEach((box) => (currentColorArrangement[box] = blank));
        return true;
      }
    }
  };

  const move = () => {
    for (let i = 0; i < 64 - width; i++) {
      if (i < 8 && currentColorArrangement[i] === blank) {
        currentColorArrangement[i] =
          candyColors[Math.floor(Math.random() * candyColors.length)];
      }
      if (currentColorArrangement[i + width] === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
        return true;
      }
    }
  };

  const dragStart = (e) => {
    setSquareDrag(e.target);
  };

  const dragDrop = (e) => {
    setSquareReplace(e.target);
  };

  const dragEnd = () => {
    const squareDragId = parseInt(squareDrag.getAttribute('data-id'));
    const squareReplaceId = parseInt(squareReplace.getAttribute('data-id'));
    currentColorArrangement[squareReplaceId] = squareDrag.getAttribute('src');
    currentColorArrangement[squareDragId] = squareReplace.getAttribute('src');

    const validMoves = [
      squareDragId - 1,
      squareDragId - width,
      squareDragId + 1,
      squareDragId + width,
    ];

    const validMove = validMoves.includes(squareReplaceId);

    if (
      squareReplaceId &&
      validMove &&
      (checkColumnFour() ||
        checkColumnThree() ||
        checkRowFour() ||
        checkRowThree())
    ) {
      setSquareDrag(null);
      setSquareReplace(null);
    } else {
      currentColorArrangement[squareReplaceId] =
        squareReplace.getAttribute('src');
      currentColorArrangement[squareDragId] = squareDrag.getAttribute('src');
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  useEffect(() => {
    const updateScore = async () => {
      try {
        const name = user.user.name;
        const { data } = await Axios.put(
          `/candycrush/addscore/${user.user._id}`,
          {
            score,
            name,
          }
        );
        dispatch({ type: 'CANDY_CRUSH', payload: data });
      } catch (err) {
        alert(err);
      }
    };
    if (start) {
      const action = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      if (timer <= 0) {
        updateScore();
        setIsGameOver(true);
        clearInterval(action);
        return;
      }
      return () => clearInterval(action);
    }
  }, [start, timer]);

  useEffect(() => {
    createBoard();
  }, []);
  useEffect(() => {
    const action = setInterval(() => {
      checkColumnFour();
      checkRowFour();
      checkColumnThree();
      checkRowThree();
      move();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 50);
    return () => clearInterval(action);
  }, [
    checkColumnThree,
    checkRowThree,
    checkRowFour,
    checkColumnFour,
    move,
    currentColorArrangement,
  ]);

  return (
    <div className="header">
      <div className="candy-crush-home-container">
        <ScoreBoard scores={score} times={timer} />
        <section className="candy-crush-container">
          <div className="candy-board-container">
            {currentColorArrangement.map((candyColor, index) => (
              <div
                className={
                  candyColor === blank ? 'candy-box blank' : 'candy-box'
                }
                key={index}
              >
                <img
                  src={candyColor}
                  data-id={index}
                  draggable={start && true}
                  onDragStart={dragStart}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDragEnter={(e) => {
                    e.preventDefault();
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={dragDrop}
                  onDragEnd={dragEnd}
                  alt="candy"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="start-button"
            onClick={() => {
              setStart(true);
            }}
          >
            {start ? 'Stop' : 'Play'}
          </button>
        </section>
      </div>
      <div
        className={
          isGameOver
            ? 'close-container active-close-container'
            : 'close-container'
        }
        onClick={() => {
          setIsGameOver(false);
          setScore(0);
          setStart(false);
          setTimer(120);
        }}
      >
        <img src={require('../../assets/close-icon.png')} />
      </div>
      <section
        className={
          isGameOver
            ? 'game-over-box-container active-game-over-box'
            : 'game-over-box-container'
        }
      ></section>
      <div
        className={
          isGameOver ? 'game-over-box active-game-over-box' : 'game-over-box'
        }
      >
        {' '}
        <div className="trophy-image-container">
          <img src={require('../../assets/trophy.png')} alt="Trophy" />
        </div>
        <div className="score-container">Your Score</div>
        <div className="score-container">{score}</div>
      </div>
    </div>
  );
}
