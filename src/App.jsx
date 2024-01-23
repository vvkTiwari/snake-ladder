import React from 'react'
import StartMenu from './components/StartMenu';
import Board from './components/Board';
import './App.css'


class SnakesAndLadders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStarted: false,
      playerCount: 2,
      players: [],
      playerTurn: 1,
      lastRoll: 0
    };
  }

  startGame(playerCount) {
    for (let i = 1; i <= playerCount; i++) {
      this.state.players.push({
        playerNum: i,
        boardLocation: 1
      });
    }

    this.setState({
      playerCount: playerCount,
      gameStarted: true
    });
  }

  rollDice() {
    let rolledNum = Math.floor(Math.random() * 6) + 1;
    let players = this.state.players.slice();

    let nextTurn = this.state.playerTurn + 1;
    if (nextTurn > this.state.players.length) {
      nextTurn = 1;
    }

    if (players[this.state.playerTurn - 1].boardLocation + rolledNum === 100) {
      this.setState({
        end: true,
        playerTurn: this.state.playerTurn
      });
    } else if (
      players[this.state.playerTurn - 1].boardLocation + rolledNum >
      100
    ) {
      rolledNum = "a number which exceeds 100";
      this.setState({ playerTurn: nextTurn });
    } else {
      players[this.state.playerTurn - 1].boardLocation += rolledNum;
      this.setState({ playerTurn: nextTurn });
    }

    this.setState({
      players: players,
      lastRoll: rolledNum
    });
  }

  playAgain() {
    this.setState({
      gameStarted: false,
      end: false,
      players: [],
      playerTurn: 1,
      lastRoll: 0
    });
  }

  movePlayer(playerNum, tile) {
    let players = this.state.players.slice();
    players[playerNum - 1].boardLocation = tile;
    this.setState({ players: players });
  }

  render() {
    if (this.state.end) {
      return (
        <div className="victory-message-container">
          <h1 className="victory-message">
            Player {this.state.playerTurn} wins!
          </h1>
          <button onClick={this.playAgain.bind(this)}>Play Again</button>
        </div>
      );
    } else if (this.state.gameStarted) {
      return (
        <Board
          players={this.state.players}
          turn={this.state.playerTurn}
          lastRoll={this.state.lastRoll}
          playAgain={this.state.playAgain}
          rollDice={this.rollDice.bind(this)}
          movePlayer={this.movePlayer.bind(this)}
        />
      );
    } else {
      return <StartMenu handleClick={this.startGame.bind(this)} />;
    }
  }
}

export default SnakesAndLadders;