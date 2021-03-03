import React, { useState, useEffect } from 'react';
import './Header.css';

import gamepadIcon from '../../assets/icons/gamepad-icon.svg'
import personIcon from '../../assets/icons/person-icon.svg'

function Header(props) {
    const { userName, difficulty } = props;
    const [ difficultyString, setDifficultyString ] = useState('EASY');

    const updateDifficultyString = () => {
        if( difficulty >= 1 && difficulty < 1.5) {
            setDifficultyString('EASY');
        } else if(difficulty >= 1.5 && difficulty < 2) {
            setDifficultyString('MEDIUM');
        } else {
            setDifficultyString('HARD');
        }
    }

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

    useEffect(() => {
        console.log("update header");
        updateDifficultyString();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.difficulty])

    return (
        <div className="header">
            <div className="header__container">

                <div className="header__user-container">
                    
                    <div className="header__user">
                        <img src={personIcon} alt="user"/>
                        <span>{userName}</span>
                    </div>

                    <div className="header__difficulty">
                        <img src={gamepadIcon} alt="gamepad"/>
                        <span>LEVEL : </span>
                        <span>{difficultyString}</span>
                    </div>

                </div>




                <div className="header__user-container">
                    
                    <div className="header__user">
                        
                        <span>fast fingers</span>
                    </div>

                    <div className="header__difficulty">
                        
                        <span>score :</span>
                        <span>{calculateMinutes(props.score)} : {getSeconds(props.score)}</span>
                    </div>

                </div>

            </div>

        </div>
    )
}


export default Header

