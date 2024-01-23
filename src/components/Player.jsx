import '../App.css'

const Player = ({ number }) => {
    return <div className={"player player-" + number} />;
};
  
export default Player;