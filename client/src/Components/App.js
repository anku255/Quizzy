import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { fetchUser } from '../actions';
import { MODERATOR_LEVEL, ADMIN_LEVEL } from '../constants/accessLevel';
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
import StatsMain from './Stats/StatsMain';
import QuestionsManager from './Admin/QuestionsManager';
import QuizManager from './Admin/QuizManager';

class App extends Component {
  componentDidMount = () => {
    this.props.fetchUser();
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Landing} />
          <Route
            path="/(.+)"
            render={() => <Header user={this.props.user} />}
          />
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
          <Switch>
            <PrivateRoute
              exact
              user={this.props.user}
              path="/stats"
              component={StatsMain}
            />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              user={this.props.user}
              RequiredAccessLevel={MODERATOR_LEVEL}
              path="/question/new"
              component={QuestionNew}
            />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              user={this.props.user}
              RequiredAccessLevel={ADMIN_LEVEL}
              path="/admin/questions"
              component={QuestionsManager}
            />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              user={this.props.user}
              RequiredAccessLevel={ADMIN_LEVEL}
              path="/admin/quizzes"
              component={QuizManager}
            />
          </Switch>
          <Route path="/current/answers" component={Answers} />
          <Route path="/questions/:category/:page" component={QuestionsMain} />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.auth };
}

export default connect(
  mapStateToProps,
  { fetchUser }
)(App);
