import React, { Component } from 'react';
import './App.css';
import { NavBar } from './components/Header/NavBar';
import Flight from './containers/Flight';
class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar> </NavBar>
        <Flight></Flight>
      </div>
    );
  }
}

export default App;
