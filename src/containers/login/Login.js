/* eslint-disable no-empty-pattern */
import React, { useState, useEffect, useMemo } from 'react'
import keyboard from '../../assets/icons/keyboard-icon.svg';
import playIcon from '../../assets/icons/play-icon.svg';
import './Login.css';
import Input from '../../components/Input/Input';
import Signup from '../signup/signup';
import ErrorBox from '../../components/ErrorBox/ErrorBox';
import {getLevel,storeScore} from '../../services/userService'

let options;
function Login(props) {
  
const [ userName, setUserName ] = useState(localStorage.getItem('userName'))
const [ userId, setUserId ] = useState(localStorage.getItem('userId'))

useMemo(() => {

    getLevel().then( (data) => {
        checkAlreadyLogin();
        options=data;
      },
      (error) => {
        alert(error);
      });
  
  }, []);
const [ difficultLevel, setDifficultyLevel ] = useState(undefined);
const [ login, setLogin ] = useState(false);
const [error , setError] = useState('');

const checkAlreadyLogin = () => {
    if(localStorage.setItem('userName', userName))
    {
       setLogin(true);
    }
   
}

const startGame = (userName, difficultLevel) => {
   
        if(userName!=='' && difficultLevel)
        {
            setSession(userName, difficultLevel);
         
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
        console.log(userName,difficultLevel,userId)
        localStorage.setItem('userName', userName);
        localStorage.setItem('difficulty', difficultLevel);
        localStorage.setItem('id', userId);

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
                { login ? 
                <div>
                <div className="login__name-input">
                    <Input type='text' value={userName} placeholder="Type your Name" onInputChange={(value) => setUserName(value)}/>
                </div>
                <div className="login__name-select">
                    <Input type='select' options={options} onInputChange={(value) => setDifficultyLevel(value)} placeholder="Difficulty Level"/>
                </div>
               
                
                <div className="login__start-button left25" onClick={() => startGame(userName, difficultLevel)}>
                    <img src={playIcon} alt="play" />
                    <p>Start Game</p>
                </div>
                </div>
                 :
                <Signup userLogin={() => { setLogin(true) } } setUser={(name) => { setUserName(name) } } setId={(id) => { setUserId(id) } } />
                }
                {
                error ?
  < ErrorBox error={error} setError={() => { setError('') }}  /> :null
            }
            </div>
      
        </div>
    )
}

export default Login
