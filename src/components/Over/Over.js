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
        setNumber(localStorage.getItem('currentGameNumber') || '1');
        const time = localStorage.getItem(localStorage.getItem('currentGameNumber') || '1');
        const tmpMinutes = calculateMinutes(time);
        const tmpSeconds = getSeconds(time);
        setMinutes(tmpMinutes);
        setSeconds(tmpSeconds);
        if(localStorage.getItem('bestIndex')) {
            setBestScore(localStorage.getItem(Number(localStorage.getItem('bestIndex')) + 1 ))
        }
    }, [props.currentTimeInPlay, props.bestIndex])


    return (
        <div className="game-complete">

            <div className="game-complete__number">
                <span>SCORE : </span><span>GAME {number}</span>
            </div>
            <div className="game-complete__score">
                <span>{minutes}: {seconds}</span>
            </div>
            {
                localStorage.getItem(localStorage.getItem('currentGameNumber') || '1') >= bestScore ?
                        <div className="game-complete__message">
                            New High Score
                        </div>
                        : null
            }
            
        </div>
    )
}

export default Over

