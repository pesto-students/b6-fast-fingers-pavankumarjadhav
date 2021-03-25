import React, { useState, useEffect } from 'react';
import Timer from '../../components/Timer/Timer';
import Word from '../../components/Word/Word';
import Input from '../../components/Input/Input';
import easyJson from "../../assets/data/easy.json";
import mediumJson from "../../assets/data/medium.json";
import hardJson from "../../assets/data/hard.json";
import './Action.css';
import {randomWord} from '../../services/userService'


function Action(props) {

    const [ timer, setTimer ] = useState(0);
    const [ word, setWord ] = useState('');
    const [ charArray, setCharArray ] = useState([]);
    const [ difficultyLevel, setDifficultyLevel ] = useState(localStorage.getItem('difficulty'));
    const [ currentTime, setCurrentTime ] = useState(0);
    let totalTime = 0;


    const play = () => {
        randomWord().then( (data) => {
    
            console.log(data,'randomWord')
            let newWord =  data['word'];
            setWord(newWord);
            const timer = calculateTimer(newWord, difficultyLevel)
            setTimer(timer);
            const charArray = getWordSplits(newWord, '');
            setCharArray(charArray);
          },
          (error) => {
            alert(error);
          });
    }


    const computeWords = (value) => {
        if( value === word ) {
            updateScoreBoard();
            props.onSuccess(totalTime);
            computeDifficulty();
            play();
        } else {
            const charArray = getWordSplits(word, value);
            setCharArray(charArray);
        }
    }

    const updateScoreBoard = () => {
        const tmpTime = totalTime + currentTime;
        totalTime = tmpTime;
    }

    const computeDifficulty = () => {
        const difficulty = Number(difficultyLevel) + 0.01;
        localStorage.setItem('difficulty', difficulty);
        setDifficultyLevel(difficulty);
       
    }


    const getWordSplits = (word, wordToCompare) => {
        console.log(word,wordToCompare);
        return word.split('').map((char, i) => {
           const charToCompare = wordToCompare[i]; 
           if(!charToCompare) {
                return <span key={i}>{char}</span>
           } else if(char ===  charToCompare) {
                return <span className="word__correct" key={i}>{char}</span>
           } else {
                return <span className="word__incorrect" key={i}>{char}</span>
            }
        })
    }

    const getRandomWord = () => {
       
      
       
    }
  
    const getDifferentWord = () => {
        var dataJson;
        
        // if( difficultyLevel >= 1 && difficultyLevel < 1.5) {
        //     dataJson=  easyJson;
        // } else if(difficultyLevel >= 1.5 && difficultyLevel < 2) {
        //     dataJson=  mediumJson;
        // } else {
        //     dataJson=  hardJson;
        // }
        var newWord =  getRandomWord();
        return newWord
    }

    const calculateTimer = (word, difficulty) => {
        const timer = Math.ceil(word.length / difficulty);
        return timer > 2 ? timer : 2;
    }

    const timeExpired = () => {
        props.onTimeExpired();
    }

    useEffect(() => {
        play();
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className="action">
            <Timer time={timer} postCurrentUserTime={(time) => {setCurrentTime(time)}} 
            onTimeExpired={() => { timeExpired() }} key={difficultyLevel}/>
            <Word>
                {charArray}
            </Word>
            <Input
                type="text"
                isTextCenter="true"
                onInputChange={(value) => computeWords(value)}
                key={word}
            />
            
        </div>
        
    )
}

export default Action
