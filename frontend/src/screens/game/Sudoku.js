import React from 'react';
import '../../index.css';
import Board from './Board.js';
import Menu from './Menu.js';

var _ = require('lodash');
export default class Sudoku extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: 33,
      time: 0,
    };
  }

  handleGeneration = (initial) => {
    this.setState({ initial: initial });
  };

  render() {
    return (
      <div>
        <div className="game">
          <div className="header">
            <div className="headerTitle sudoku"> SUDOKU </div>{' '}
          </div>{' '}
          <div className="game-board">
            <Board key={_.random(0, 10000)} initial={this.state.initial} />{' '}
            <div className="game-menu">
              <Menu onGenerate={this.handleGeneration} />{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </div>
    );
  }
}
