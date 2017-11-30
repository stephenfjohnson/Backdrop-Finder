import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Main from './components/Main';
import Amplitude from 'react-amplitude';
Amplitude.initialize('4466018a729c934d7980bf2bb690ecff');

class App extends React.Component {
  render() {
    return (
      <main>
        <Navigation />
        <Main />
      </main>
    );
  }
}

export default App;
