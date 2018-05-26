import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { fetchUser } from '../actions';
import Header from './Header';
import Landing from './Landing';
import Quiz from './Quiz/Quiz';
import Answers from './Quiz/Answers';
import QuestionNew from './Form/QuestionNew';
import PrivateRoute from './common/PrivateRoute';
import QuestionsMain from './Questions/QuestionsMain';
import Dashboard from './Dashboard/Dashboard';
import EditProfile from './Form/EditProfile';
import QuizHistory from './Dashboard/QuizHistory/QuizHistory';

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
          <Switch>
            <PrivateRoute
              exact
              user={this.props.user}
              path="/dashboard"
              component={Dashboard}
            />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              user={this.props.user}
              path="/dashboard/edit-profile"
              component={EditProfile}
            />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              user={this.props.user}
              path="/dashboard/quiz-history"
              component={QuizHistory}
            />
          </Switch>
          <Route path="/current/answers" component={Answers} />
          <Route path="/question/new" component={QuestionNew} />
          <Route path="/questions/:category/:page" component={QuestionsMain} />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.auth };
}

export default connect(mapStateToProps, { fetchUser })(App);
