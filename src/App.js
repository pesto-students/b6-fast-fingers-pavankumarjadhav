import React, { useState } from 'react';
import './App.css';
import Login from './containers/login/Login';
import Play from './containers/Play/Play';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App() {
          

  return (
  
    <Router>
      <div className="App">
      
        <Switch>
          <Route path="/play">
            <Play />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
