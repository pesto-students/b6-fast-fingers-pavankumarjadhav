import React, { useEffect, useState } from 'react';
import './OVER.css';

function Over(props) {

    const [minutes, setMinutes ] = useState(0);
    const [seconds, setSeconds ] = useState(0);
    const [number, setNumber] = useState(0);
    const [bestScore, setBestScore ] = useState(0);


    const calculateMinutes = (time) => {
        return Math.floor( time/ 60);
    }

    const getSeconds = (time) => {
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return seconds;
    }

    useEffect(() =>{
          const tmpMinutes = calculateMinutes(props.bestRecord.score_val);
         const tmpSeconds = getSeconds(props.bestRecord.score_val);
        setMinutes(tmpMinutes);
        setSeconds(tmpSeconds);
       
    }, [props.bestRecord])

    return (
        <div className="game-complete">

            <div className="game-complete__number">
                <span>SCORE : </span><span>GAME {props.gameno}</span>
            </div>
            <div className="game-complete__score">
                <span>{minutes}: {seconds}</span>
            </div>
            {
               props.bestRecord.is_best=="yes" ?
                        <div className="game-complete__message">
                            New High Score
                        </div>
                        : null
            }
            
        </div>
    )
}

export default Over

