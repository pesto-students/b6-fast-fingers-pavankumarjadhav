import React, { useState } from 'react';
import './App.css';
import Login from './containers/login/Login';
import Play from './containers/Play/Play';

function App() {

  const [ userName, setUserName ] = useState(localStorage.getItem('userName'));
  

  const updateUserName = (userName) => {
    setUserName(userName);
  }
  

  const componentToRender = Boolean(userName) ? <Play resetSession={() => setUserName(undefined)}/> 
                            : <Login onUserUpdate={(userName) => updateUserName(userName)}/>;

  // const componentToRender = <Login />;

  return (
    <section className="App">
      {
        componentToRender
      }
    </section>
  );
}
export default App;
