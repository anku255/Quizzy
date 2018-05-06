import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Quiz from './Quiz/Quiz';
import Answers from './Quiz/Answers';

class App extends Component {
  componentDidMount = () => {
    this.props.fetchUser();
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/current" component={Quiz} />
          <Route path="/current/answers" component={Answers} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
