import { useRef } from 'react'
import '../App.css'

const StartMenu = (props) => {

    const ref = useRef(null);
    
    return (
    <div className="start-menu-container">
        <h1 className="start-title-text">Snakes and Ladders</h1>
        <div className="player-count-button-container">
        <input type='number' className='start-input' placeholder='How many will play?' ref={ref} />
        <button
            className="player-count-button"
            onClick={() => props.handleClick(ref.current.value)}
        >
            Submit
        </button>
        </div>
    </div>
    );
  }
  
export default StartMenu;