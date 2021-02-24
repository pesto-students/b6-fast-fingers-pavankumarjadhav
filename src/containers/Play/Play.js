import React, { useState } from 'react'
import Header from '../../layouts/Header/Header'
import Game from '../Game/Game';
import './Play.css';
import Footer from '../../layouts/Footer/Footer';

function Play(props) {
    
    const [ stopGame, setStopGame ] = useState(false);
    const userName=localStorage.getItem('userName');
    const difficulty=localStorage.getItem('difficulty');

    const setSession = () => {
        localStorage.clear();
        props.resetSession();
    }

    return (
        <div className="play">
            <Header userName={userName} difficulty={difficulty} />

            <Game playAgain={() => setStopGame(false)} onStopGame={() => setStopGame(true)} stopGame={stopGame} />

            <Footer onStopGame={() => setStopGame(true)} isGameOver={stopGame} onClearSession={() => setSession()}/>

            

        </div>
    )
}

export default Play
