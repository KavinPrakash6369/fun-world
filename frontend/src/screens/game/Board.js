import React from 'react';
import { Button } from 'react-bootstrap';

import * as sg from './sudokuGenerator.js';
var _ = require('lodash');
var value = 0;
export default class Board extends React.Component {
  constructor(props) {
    super(props);
    let startingBoard = sg.generateStartingBoard(this.props.initial);
    this.state = {
      squares: startingBoard,
      status: {
        msg: '',
        color: 'white',
        backgroundColor: '',
        border: '',
      },
    };
  }

  score() {
    console.log(value);
    return value;
  }
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  handleSubmit(e, i) {
    const squares = this.state.squares.slice();
    squares[i].value = e.target.value;
    this.setState({ squares: squares });
  }

  handleValidation(squares) {
    const cells = sg.elementsToPositions(squares.slice());
    let emptyCells = cells
      .map((cell) => cell.value === '')
      .filter((v) => v).length;
    let msg = 'No conflicts, ' + emptyCells + ' cells to go!';
    let color = 'white';
    let backgroundColor = 'blue';
    let border = '3px solid white';
    let neighbours;
    cells.forEach((cell) => {
      cell.classes.delete(' conflict');
      if (cell.value) {
        neighbours = sg.getNeighbours(cell.coords, cells);
        neighbours.forEach((neighbour, i) => {
          if (neighbour) {
            if (String(neighbour.value) === String(cell.value)) {
              cell.classes.add(' conflict');
              msg = "Something's not quite right";
              color = 'white';
              backgroundColor = 'red';
              border = '3px solid white';
            }
          }
        });
      }
    });
    let newSquares = sg.elementsToPositions(cells);
    this.setState({
      squares: newSquares,
      status: {
        msg: msg,
        color: color,
        backgroundColor: backgroundColor,
        border: border,
      },
    });

    // Check for win
    let hasConflict = cells
      .map((cell) => cell.classes)
      .map((set) => set.has(' conflict'))
      .includes(true);
    let hasEmpty = cells.map((cell) => cell.value).includes('');
    if (!hasEmpty && !hasConflict) {
      this.setState({
        status: {
          msg: 'Puzzle Solved!!',
          color: 'white',
          backgroundColor: 'green',
          border: '3px solid white',
        },
      });
    }
    if (emptyCells <= 47 && !hasConflict) {
      value++;
    }
  }

  createBoard() {
    var check = 0;
    let board = [];
    let row;
    let block;
    // Generate blocks
    for (let i = 0; i < 9; i++) {
      block = [];
      for (let j = 0; j < 3; j++) {
        row = [];
        for (let k = 0; k < 3; k++) {
          row.push(this.renderSquare(i * 9 + j * 3 + k));
        }
        if (check % 2 === 0) {
          block.push(
            <div className="board-row even" key={j}>
              {' '}
              {row}{' '}
            </div>
          );
        } else {
          block.push(
            <div className="board-row odd" key={j}>
              {' '}
              {row}{' '}
            </div>
          );
        }
      }
      if (check % 2 === 0) {
        board.push(
          <div className="block even" key={i}>
            {' '}
            {block}{' '}
          </div>
        );
      } else {
        board.push(
          <div className="block odd" key={i}>
            {' '}
            {block}{' '}
          </div>
        );
      }
      check = check + 1;
    }
    board.push(
      <Button
        className="validation"
        onClick={() => {
          this.handleValidation(this.state.squares);
        }}
        key={'v-' + _.random(0, 1000)}
      >
        Validate{' '}
      </Button>
    );

    board.push(
      <form>
        {' '}
        <button type="submit" className="reset validation btn">
          Reset{' '}
        </button>{' '}
      </form>
    );

    board.push(
      <span
        className="status"
        key="stats"
        style={{
          color: this.state.status.color,
          backgroundColor: this.state.status.backgroundColor,
          border: this.state.status.border,
        }}
      >
        {this.state.status.msg}{' '}
      </span>
    );
    return board;
  }

  renderSquare(i) {
    let disabled = false;
    if (this.state.squares[i].initial) {
      disabled = true;
    }

    let className = '';
    this.state.squares[i].classes.forEach((element) => (className += element));

    return (
      <Square
        value={this.state.squares[i].value}
        disabled={disabled}
        className={className}
        key={i}
        onKeyDown={this.handleKeyPress}
        onChange={(e) => this.handleSubmit(e, i)}
      />
    );
  }

  render() {
    return (
      <div className="board-parent">
        <div> {this.createBoard()} </div>{' '}
        <div className="score-parent headerTitletitle timer1">
          Score: {this.score()}{' '}
        </div>{' '}
      </div>
    );
  }
}

class Square extends React.Component {
  render() {
    return (
      <input
        value={this.props.value}
        type="text"
        disabled={this.props.disabled}
        pattern="[1-9]"
        maxLength="1"
        className={this.props.className}
        onChange={this.props.onChange}
        onKeyDown={this.props.onKeyDown}
      />
    );
  }
}
