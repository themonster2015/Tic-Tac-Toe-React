import React from "react";
import Square from "./Square";
export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      nextPlayerX: true
    };
  }
  handleClick(i) {
    const squares = this.state.squares.slice();

    squares[i] = this.state.nextPlayerX ? "X" : "O";

    this.setState({ squares: squares, nextPlayerX: !this.state.nextPlayerX });
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  declareWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      let [a, b, c] = lines[i];
      if (
        this.state.squares[a] &&
        this.state.squares[a] === this.state.squares[b] &&
        this.state.squares[a] === this.state.squares[c]
      ) {
        return this.state.squares[a];
      }
    }
    return null;
  }
  render() {
    let status = "Next player is " + (this.state.nextPlayerX ? "X" : "O");
    const winner = this.declareWinner();
    if (winner) {
      status = "And the winner is " + winner;
    }

    return (
      <div>
        <div>{status} </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
