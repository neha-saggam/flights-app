import React, { Component } from 'react';
import './App.css';
import { NavBar } from './components/Header/NavBar';
import Movie from './containers/Movie';
class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar> </NavBar>
        <Movie></Movie>
      </div>
    );
  }
}

export default App;
