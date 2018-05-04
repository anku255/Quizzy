import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';

class App extends Component {
  componentDidMount = () => {
    this.props.fetchUser();
  };

  render() {
    return <Header />;
  }
}

export default connect(null, actions)(App);
