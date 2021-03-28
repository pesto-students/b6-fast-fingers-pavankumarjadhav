import React from 'react';
import './Board.css';

function Board(props) {

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

    return (
        <div className="board">
            <div className="board__title">score board</div>
            {
                    props.scores ? props.scores.map((value, i) =>  {
                                        const  minutes = calculateMinutes(value.score);
                                        const seconds = getSeconds(value.score);
                                        return (
                                            value.best ? <div key={i} className="score">
                                                            <div className="slcore board__best"> PERSONAL BEST </div> 
                                                            <div  className="board__scores">Game {value.number} : {minutes} : {seconds}</div>
                                                        </div> :
                                                        <div key={i} className="score board__scores">Game {value.number} : {minutes} : {seconds}</div>
                                        )
                                    })
                                    :
                                    null
            }
        </div>
    )
}


export default Board

