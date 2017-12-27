import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Body from './Body';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title nmt pt-md pl-lg normal">G Notes</h1>
        </header>
        <Body/>
      </div>
    );
  }
}

export default App;
