import Player from './Player';
import '../App.css'

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

export default Tile;