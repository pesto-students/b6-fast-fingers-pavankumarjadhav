import keyboardIcon from './assets/icons/keyboard-icon.svg';
import playIcon from './/assets/icons/play-icon.svg';
import './App.css';
import React, { Component } from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username : ''
    };
    this.state = {
      level : 'EASY'
    };
    this.getName = this.handleChangeName.bind(this);
    this.getLevel = this.handleChangeLevel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeName(event) {
    this.setState({username: event.target.value});
  }
  handleChangeLevel(event) {
    this.setState({level: event.target.value});
  }
  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.level);
    localStorage.setItem('username',this.state.username);
    localStorage.setItem('level',this.state.level);
    this.props.history.push('/start');
    event.preventDefault();
  }
  render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={keyboardIcon} alt="keyboardIcon" className="keyboardIcon" />
        <p>
        <span className="fastFingeText">fast fingers</span> 
        <div className="UltimateText">
          <hr className="frontLine"></hr>the ultimate typing game
          <hr className="frontLine"></hr></div>
        </p>
      <form onSubmit={this.handleSubmit} className="form">
        <input type="text" value={this.state.username} onChange={this.getName} className="input" placeholder="TYPE YOUR NAME" required></input>
        <div className="select">
  <select value={this.state.level} onChange={this.getLevel} required>
    <option selected disabled>Choose an option</option>
    <option value="EASY">EASY</option>
    <option value="MEDIUM">MEDIUM</option>
    <option value="HARD">HARD</option>
  </select>
</div>
<p>
<div className="UltimateText" onClick={startGame}>
<img src={playIcon} alt="playIcon"  />
  <button  className="startText"  type="submit">      
        <span >START GAME</span> 
        </button>
         </div>
   
       </p>
      </form>
      </header>
    </div>
  );
  }
}

function startGame ()
{
  console.log("hiiii")
}





export default App;
