import React, { useState, useEffect } from "react";
import Board from "../../components/Board/Board";
import "./Game.css";
import Over from "../../components/Over/Over";
import Action from "../Action/Action";

import reloadIcon from '../../assets/icons/reload-icon.svg'

function Game(props) {
    const [ isGameOver, setIsGameOver ] = useState(false);
    const [ currentTimeInPlay, setCurrentTimeInPlay ] = useState(0);
    const [ scores, setScores ] = useState(null);
    const [bestIndex, setBestIndex ] = useState(0);
    let gameNumber = '1';
    useEffect(() => {
        if(props.stopGame) {
            updateScores();
            setCurrentTimeInPlay(0);
        }
        setIsGameOver(props.stopGame);
        createBoardJSON();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.stopGame]);

    const createBoardJSON = () => {
        let currentBestScore = 0;
        let tmpBestIndex = 0;
        gameNumber = Number(localStorage.getItem('currentGameNumber'));
        const tmpScores = [];
        for(let i = 1; i <= gameNumber; i+= 1 ) {
            const currentScore = localStorage.getItem(String(i));
            if(Number(currentScore) >= Number(currentBestScore) ) {
                currentBestScore = Number(currentScore);
                tmpBestIndex = i - 1;
                localStorage.setItem('bestIndex', tmpBestIndex);
                setBestIndex((i-1));
            }
            tmpScores.push({
                best: false,
                number: Number(i),
                score: localStorage.getItem(String(i))
            });
        }
        if(tmpScores[tmpBestIndex]) {
            tmpScores[tmpBestIndex].best = true;
        }
        setScores(tmpScores);
    }


    const play = () => {
        props.playAgain();
        setIsGameOver(false);
    }

    const updateScores = () => {
        const currentGameNumber = localStorage.getItem('currentGameNumber');
        gameNumber = String(Number(currentGameNumber) + 1);
        localStorage.setItem(gameNumber, currentTimeInPlay);
        localStorage.setItem('currentGameNumber', gameNumber);
        createBoardJSON();
    }

    const gameOver =() => {
        props.onStopGame();
        setCurrentTimeInPlay(0);
        setIsGameOver(true);
    }

    const updateCurrentTime = (time) => {
        setCurrentTimeInPlay(time + currentTimeInPlay);
    }
    

    return (
        <div className="game">
            {
            !isGameOver ? 
                <div className="game__scores">
                    <Board scores={scores} key={scores}/>
                </div>
                : null
            }

            {
                isGameOver ? <div className="game__area">
                                <Over currentTimeInPlay={currentTimeInPlay} bestIndex={bestIndex}/>
                                <div className="game-complete__button" onClick={() => play()}>
                                    <img src={reloadIcon} alt="play again" />
                                    PLAY AGAIN
                                </div> 
                            </div>
                            :
                            <div className="game__area">
                                <Action onSuccess={(currentTime) => updateCurrentTime(currentTime) } onTimeExpired={ () => gameOver()}/>
                            </div>

            }
            {
                !isGameOver ? <div className="game__occ-space"></div>
                            : null
            }
            
        </div>
    );
}

export default Game;
