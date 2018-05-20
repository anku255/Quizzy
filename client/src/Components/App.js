import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Quiz from './Quiz/Quiz';
import Answers from './Quiz/Answers';
import QuestionNew from './Form/QuestionNew';
import PrivateRoute from './common/PrivateRoute';

class App extends Component {
  componentDidMount = () => {
    this.props.fetchUser();
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header user={this.props.user} />
          <Route exact path="/" component={Landing} />
          <Switch>
            <PrivateRoute
              exact
              user={this.props.user}
              path="/current"
              component={Quiz}
            />
          </Switch>
          <Route path="/current/answers" component={Answers} />
          <Route path="/question/new" component={QuestionNew} />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.auth };
}

export default connect(mapStateToProps, actions)(App);
