import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import MainContaine from './components/MainContaine';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={MainContaine} />
      </Router>
    )
  }
}

export default App;
