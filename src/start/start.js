
import './start';
import './start.css'
import personIcon from '../assets/icons/person-icon.svg'
import gamepadIcon from '../assets/icons/gamepad-icon.svg'
import reloadIcon from '../assets/icons/reload-icon.svg'
import crossIcon from '../assets/icons/cross-icon.svg'
import React, { Component } from 'react';
import data from '../assets/data/dictionary.json';
import { node } from 'prop-types';
class Start extends React.Component{
  constructor(props) {
    super(props);
    // this.state = {
    //   inputText : ''
    // };
    this.state = {
      endGame:false,
      inputText : '',
      levelDisplayData : data.filter(function (item){
        
        if(localStorage.getItem('level')=='EASY' && item.length<=4)
        {
          return item;
        }
        if(localStorage.getItem('level')=='MEDIUM' && item.length<=6 && item.length>4)
        {
          return item;
        }
        if(localStorage.getItem('level')=='HARD' && item.length>6)
        {
          return item;
        }
       
    }),
    score:0,
    displayRandomWord :'',
    completeTime:0
    
    };
    
    this.timerFlag='';
    this.totalCompletedWord=0;
    this.getName = this.handleChangeName.bind(this);
    this.allScoreData=[];
    this.stopGame = this.stopGame.bind(this);
   this.FULL_DASH_ARRAY=283;
    this.chooseRandomWord();
    this.ScoreCardDetails();
  }
  handleChangeName(event) {
    this.setState({inputText: event.target.value});
    var text=event.target.value;
    var displayText='';
    if(this.state.displayRandomWord==text)
    {
      this.setState((state) => ({
        score:state.score + this.state.completeTime
      }));
     // this.setState({score:this.state.completeTime });
      this.setState({inputText: ''});
      this.chooseRandomWord();
      return 0;
    }
    for(var i=0;i<this.state.displayRandomWord.length;i++)
    {
      if(this.state.displayRandomWord[i]==text[i])
      {
        displayText += "<span class='green'>"+this.state.displayRandomWord[i]+"</span>"
      }
      else{
        
        displayText += "<span class='blue'>"+this.state.displayRandomWord[i]+"</span>"
        // text.replace(text[i], "<span class='blue'>"+text[i]+"</span>");
        console.log("outtttt",displayText)
      }
    }
    console.log("durrrr",displayText);
       document.getElementById("colorText").innerHTML=displayText;
      
       
  }
  chooseRandomWord()
{
 this.totalCompletedWord++;
  var len= this.state.levelDisplayData.length;
  console.log(this.state.levelDisplayData[Math.floor(Math.random() * (len - 1 + 1) + 1)],"chooseRandomWord",)
  this.state.displayRandomWord=this.state.levelDisplayData[Math.floor(Math.random() * (len - 1 + 1) + 1)];
  clearInterval(this.timerFlag); 

  this.FormatTimeLeft();

}
 FormatTimeLeft() {
  
  var time=this.state.displayRandomWord.length;
  let minutes;
  let seconds;
  
  
  this.timerFlag= setInterval(() => {
       minutes = Math.floor(time / 60);
   seconds = time % 60;
  
   if (seconds < 10) {
    seconds = `0${seconds}`;
  }
 
 this.setState((state) => ({
    completeTime: this.state.displayRandomWord.length-time
  }));

  this.setCircleDasharray();
  //setRemainingPathColor(timeLeft);
  console.log(this.state.completeTime,"aaaa",this.state.displayRandomWord.length-time)
  document.getElementById('base-timer-label').innerHTML=`${minutes}:${seconds}`;
  if(time==0)
  {
    clearInterval(this.timerFlag);
    this.EndGameAndStoreScore();
 
  }
  time--;
  }, 1000);
  // The output in MM:SS format
  // return `${minutes}:${seconds}`;
}
 setCircleDasharray() {
  const circleDasharray = `${(
    this.calculateTimeFraction() * this.FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  //console.log(circleDasharray,"circleDasharray")
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
calculateTimeFraction() {
    const rawTimeFraction = (this.state.displayRandomWord.length-this.state.completeTime) / this.state.displayRandomWord.length;
    return rawTimeFraction - (1 / this.FULL_DASH_ARRAY) * (1 - rawTimeFraction);
}

EndGameAndStoreScore()
{
  //localStorage.setItem()
  var totalScore;
  totalScore=
    {
      'time':this.state.score,
      'totalWord':this.totalCompletedWord
    }
    
    var all_scores=[];
  if(localStorage.getItem('all_scores')==undefined)
  {
    all_scores.push(totalScore);
  }
  else
  {
     all_scores=JSON.parse(localStorage.getItem('all_scores'));
     all_scores.push(totalScore);
    console.log(all_scores,"totalScore");
  }
 
  this.setState({endGame:true});
  localStorage.setItem('all_scores',JSON.stringify(all_scores))
}
ScoreCardDetails()
{
  
  if(localStorage.getItem('all_scores')!=undefined)
  {
    this.allScoreData=JSON.parse(localStorage.getItem('all_scores'));
  
    //console.log(this.allScoreData,"gettataaa")
  }
 
}

playAgain = ()=>{
  console.log("rrrrrrrrrrrr");
  this.setState({inputText: ''});
  this.setState({endGame:false});
  this.setState({score:0});
  this.ScoreCardDetails();
  this.chooseRandomWord();
}
stopGame(props)
{
  this.setState({inputText: ''});
  clearInterval(this.timerFlag);
  this.props.history.push('/');
}
  render()
  {

  
  return (
    <div className="mainDiv">
              <div className="brand-left">
              <GameInfo />
              </div>
              <div className="brand-right">
             
              <ScoreDetails score={this.state.score} />
              </div>
               
               <div class="align-scoreboard">
                 <div>
               <ScoreCard all_score={this.allScoreData} />

               </div>
               
               <div>

              { !this.state.endGame && (
              <div class="align-game-center">
           
            <div className="timer-align">
              <Timer  />
              </div>
             
              <div >
               <div className="display-type-text" id="colorText">{this.state.displayRandomWord}</div>
              </div>
             
              <div >
              <input type="text"  value={this.state.inputText} onChange={this.getName} className="input"  required></input>
              </div>
             
              </div>
           

           ) }     
             { this.state.endGame && (
              <div class="align-game-center">
            <div className="timer-align">
             <EndCard parentMethod={this.playAgain} score={this.state.score} gameIndex={this.allScoreData.length} />
              </div>
              </div>
           

           ) } 
           </div>
           </div>
         <div>
         <div className="mainLabel end-game "><img src={crossIcon} alt="crossIcon" onClick={this.stopGame} className="crossIcon"/> STOP GAME</div>
         </div>
          
  </div>
     
  );
}
}

function timeConverter(inputSec)
{
  let minutes=0;
  let seconds=0;
  minutes = Math.floor(inputSec / 60);
   seconds = inputSec % 60;
  
   if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`
}
function GameInfo() {
    
    return  <div className="playerUpper">
        <div>
        <img src={personIcon} alt="personIcon" className="personIcon" />
        {/* <span className="mainLabel">PLAYER NAME</span> : */}
        <span className="mainLabel">{localStorage.getItem('username').toUpperCase()}</span>
        </div>
         <div>
         <img src={gamepadIcon} alt="gamepadIcon" className="personIcon" />
        <span className="mainLabel">LEVEL :</span>
        <span className="mainLabel"> {localStorage.getItem('level')}</span>
         </div>
       
        
    </div>

}

function ScoreDetails(props) {
    
    return   <div className="playerUpper">
    <div>
   
    <span className="mainLabel">Fast Fingers</span>
    </div>
     <div>
    <span className="mainLabel">SCORE :</span>
    <span className="mainLabel"> { timeConverter(props.score)}</span>
     </div>
     </div>

}

function Timer()
{
  
  return  <div className="base-timer">
  <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g className="base-timer__circle">
      <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        className="base-timer__path-remaining red"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" className="base-timer__label"></span>
</div>

  // <div class="base-timer">
  //   <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  //     <g className="base-timer__circle">
  //       <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
  //     </g>
  //   </svg>
  //   <span id="base-timer-label" className="base-timer__label">
    
  // </span>
  
  // </div>
}
function EndCard(props) 

 {
//  var click = () => {
//     props.playAgain();
// }
  return   <div >
  <div className="display-type-text " >SCORE : GAME{props.gameIndex+1}</div>
  <div className="display-type-text center" >{timeConverter(props.score)} </div>
  <h1 className="highScoreText center">New High Score</h1>
  
  <div className="mainLabel center"><img src={reloadIcon} alt="reloadIcon" onClick={props.parentMethod} className="reloadIcon"/> PLAY AGAIN</div>
 </div>
}

function ScoreCard(props)
{
   return  <div className="score-div">
  <div className="score-board-label center">SCORE BOARD</div>
  
  {
    props.all_score.map((object, i)=>
    
       <div className="score-board-value center">Game{i+1} : {timeConverter(object.time)} 
       
       {/* <span className="personal-best-text">PERSONAL BEST</span> */}
       </div>
       
    )}
   
</div>
 
       
}


export default Start;




