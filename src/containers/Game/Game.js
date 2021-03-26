import React, { useState, useEffect } from "react";
import Board from "../../components/Board/Board";
import "./Game.css";
import Over from "../../components/Over/Over";
import Action from "../Action/Action";

import reloadIcon from '../../assets/icons/reload-icon.svg'

import {storeScore,getAllScore} from '../../services/userService'
function Game(props) {
    const [ isGameOver, setIsGameOver ] = useState(false);
    const [ currentTimeInPlay, setCurrentTimeInPlay ] = useState(0);
    const [ scores, setScores ] = useState([]);
    useEffect(() => {
        console.log("useEffect")
        if(props.stopGame) {
            updateScores();
            setCurrentTimeInPlay(0);
        }
        setIsGameOver(props.stopGame);
        createBoardJSON();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.stopGame]);

    const createBoardJSON = () => {
        getAllScore(Number(localStorage.getItem('id')))
        .then( (data) => {
            
           if(data.status)
           {
                setScores(data.record);
            }
            else
            {
                setScores([{is_best: "yes",score_val: 0}]);
            }
            
     },
          (error) => {
            alert(error);
          });
    }


    const play = () => {
        props.playAgain();
        setIsGameOver(false);
    }

    const updateScores = () => {
         createBoardJSON();
    }

    const gameOver =() => {
        storeScore(currentTimeInPlay,Number(localStorage.getItem('id'))
        ,localStorage.getItem('difficulty'))
        .then( (data) => {
          
            props.onStopGame();
            setCurrentTimeInPlay(0);
            setIsGameOver(true);
          },
          (error) => {
            alert(error);
          });
     
    }

    const updateCurrentTime = (time) => {
        
        setCurrentTimeInPlay(time + currentTimeInPlay);
        props.updateCurrentScore(time + currentTimeInPlay);
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
                                <Over gameno={scores.length-1} bestRecord={scores[scores.length-1]}/>
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
