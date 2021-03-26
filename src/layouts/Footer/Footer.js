
import React from 'react';
import './Footer.css';

import crossIcon from '../../assets/icons/cross-icon.svg'
import { useHistory } from 'react-router-dom';

function Footer(props) {
    const history = useHistory();
    const onStopGame = () =>  {
        props.onStopGame();
    }

    const clearSession = () => {
        history.push('/');
        //props.onClearSession();
    }

    return (
        <footer className="footer">
            {
                props.isGameOver ? <div className="footer-button__quit" onClick={ () => clearSession() }>QUIT</div> 
                                : <div className="footer-button__stop" onClick={ () => onStopGame() }>
                                    <img src={crossIcon}  alt="stop game"/>
                                    STOP GAME
                                  </div>
            }
            <div className="occ-space"></div>    
        </footer>
    )
}

export default Footer

