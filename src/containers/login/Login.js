/* eslint-disable no-empty-pattern */
import React, { useState } from 'react'
import keyboard from '../../assets/icons/keyboard-icon.svg';
import playIcon from '../../assets/icons/play-icon.svg';
import './Login.css';
import Input from '../../components/Input/Input';

function Login(props) {
    const options = [
        {level: 'EASY', value: 1},
        {level: 'MEDIUM', value: 1.5}, 
        {level: 'HARD', value: 2}
    ];
  
const [ userName, setUserName ] = useState('');
const [ difficultLevel, setDifficultyLevel ] = useState(undefined);
const [error , setError] = useState('');

const startGame = (userName, difficultLevel) => {
        if(userName!=='' && difficultLevel)
        {
            setSession(userName, difficultLevel);
           // createUser(userName, difficultLevel);
         
            props.onUserUpdate(userName);
            console.log("addToStorage",userName,difficultLevel);
        }
        else
        {
          setError("Please Filled All Data Properly");
        }
    }
// const createUser = (userName, difficultLevel) => {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({name:userName,level:difficultLevel} )
//     };
//     fetch("http://localhost:1000/users/createUser",requestOptions)
//     .then(res => res.json())
//     .then(
//       (result) => {
//        alert(result.status);
//       },
//       (error) => {
//         alert(error);
//       }
//     )
// }

    const setSession = (userName, difficultLevel) => {
        localStorage.setItem('userName', userName);
        localStorage.setItem('difficulty', difficultLevel);
    }
    const CloseError =()=>
    {
        setError("");
    }

    return (
        <div className="login">
            <div className="login__container">
                
                <img src={keyboard} alt="keyboard logo" className="login__logo"/>

                <div className="login__brand-name">
                    <h1 className="login__brand-title">fast fingers</h1>
                    <div className="login__brand-name-subtitle">
                        <div className="login__brand-name-subtitle-left-line"></div>
                        <p>the ultimate typing game</p>
                        <div className="login__brand-name-subtitle-right-line"></div>
                    </div>
                </div>
                <div className="login__name-input">
                    <Input type='text' placeholder="Type your Name" onInputChange={(value) => setUserName(value)}/>
                </div>
                <div className="login__name-select">
                    <Input type='select' options={options} onInputChange={(value) => setDifficultyLevel(value)} placeholder="Difficulty Level"/>
                </div>
               
                
                <div className="login__start-button" onClick={() => startGame(userName, difficultLevel)}>
                    <img src={playIcon} alt="play" />
                    <p>Start Game</p>
                </div>
                {
                error ?
  <div class="alert">
  <span class="closebtn" onClick={() => CloseError()}>&times;</span> 
  <strong>Error!</strong>{error}
</div> :null
            }
            </div>
         
          
            
        </div>
    )
}

export default Login
