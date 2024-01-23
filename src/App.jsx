import React from 'react'
import './App.css'


const SNAKES = [
  {
    from: 17,
    to: 8
  },
  {
    from: 54,
    to: 34
  },
  {
    from: 62,
    to: 19
  },
  {
    from: 64,
    to: 60
  },
  {
    from: 87,
    to: 24
  },
  {
    from: 93,
    to: 73
  },
  {
    from: 95,
    to: 75
  },
  {
    from: 99,
    to: 78
  }
];

const LADDERS = [
  {
    from: 4,
    to: 14
  },
  {
    from: 9,
    to: 31
  },
  {
    from: 20,
    to: 38
  },
  {
    from: 28,
    to: 84
  },
  {
    from: 40,
    to: 59
  },
  {
    from: 51,
    to: 67
  },
  {
    from: 63,
    to: 81
  },
  {
    from: 71,
    to: 91
  }
];

const Player = ({ number }) => {
  return <div className={"player player-" + number} />;
};

const Tile = ({ num, players, to }) => {
  return (
    <div className="tile">
      <div className="tile-number">{num}</div>
      <div className="tile-type">{num > to ? "S" : num < to ? "L" : ""}</div>
      <div className="tile-players-container">
        {players.map((player) => (
          <Player number={player.playerNum} location={player.boardLocation} />
        ))}
      </div>
    </div>
  );
};

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

class StartMenu extends React.Component {
  render() {
    return (
      <div className="start-menu-container">
        <h1 className="start-title-text">Snakes and Ladders</h1>
        <div className="player-count-button-container">
          <button
            className="player-count-button"
            onClick={() => this.props.handleClick(2)}
          >
            2 Players
          </button>
          <button
            className="player-count-button"
            onClick={() => this.props.handleClick(3)}
          >
            3 Players
          </button>
          <button
            className="player-count-button"
            onClick={() => this.props.handleClick(4)}
          >
            4 Players
          </button>
        </div>
      </div>
    );
  }
}

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