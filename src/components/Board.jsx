import React from 'react'
import Tile from './Tile';
import { SNAKES, LADDERS } from '../utils/CommonUtils';
import '../App.css'


class Board extends React.Component {
    constructor(props) {
      super(props);
  
      this.renderBoardTiles = this.renderBoardTiles.bind(this);
      this.snakes = SNAKES;
      this.ladders = LADDERS;
    }
  
    renderBoardTiles() {
      let tileNum = 1;
      let boardTiles = [];
  
      for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
          boardTiles.push(
            <Tile
              row={i}
              col={j}
              num={tileNum}
              to={
                [...this.snakes, ...this.ladders].find(
                  (x) => x.from - 1 === tileNum
                )?.to ?? tileNum
              }
              players={this.props.players.filter(
                (p) => p.boardLocation === tileNum
              )}
            />
          );
  
          tileNum++;
        }
      }
  
      return boardTiles;
    }
  
    render() {
      let boardTiles = this.renderBoardTiles();
  
      let lastActionText = "Press roll to play";
  
      if (this.props.lastRoll != 0) {
        lastActionText = "Rolled a " + this.props.lastRoll;
      }
  
      return (
        <div>
          <div className="board-header">
            <div className="player-turn">
              Current Turn: Player {this.props.turn}
            </div>
  
            <div className="last-action">{lastActionText}</div>
  
            <button className="roll-dice" onClick={() => this.props.rollDice()}>
              Roll
            </button>
          </div>
          <div className="board">{boardTiles}</div>
        </div>
      );
    }
  }

  export default Board;
  