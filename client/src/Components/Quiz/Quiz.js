import React, { Component } from 'react';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Question from './Question';

// CSS
const styles = {
  root: {
    margin: '0 2%',
    flexGrow: 1
  },
  submitBtn: {
    color: 'white'
  }
};

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {},
      radioBtnValue: [] // Will be used for controlled radio btn value
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const values = event.target.value.split(' ');
    const quesID = values[0];
    const choiceIndex = values[1];
    const quesIndex = values[2];
    const radioVal = event.target.value; // Value of radio btn which was clicked

    this.setState(prevState => {
      // change the radioBtn value at quesIndex
      prevState.radioBtnValue[quesIndex] = radioVal;
      return {
        response: { ...prevState.response, [quesID]: choiceIndex },
        radioBtnValue: prevState.radioBtnValue
      };
    });
  }

  componentDidMount = () => {
    this.props.fetchCurrentQuiz();
  };

  render() {
    return (
      <div style={styles.root}>
        <Grid container style={styles.gridContainer}>
          {this.props.loading ? (
            <div>Loading</div>
          ) : (
            <Grid item xs={12}>
              <Question
                currentQuiz={this.props.currentQuiz}
                radioBtnValue={this.state.radioBtnValue}
                handleChange={this.handleChange}
              />
              <Button variant="raised" color="primary">
                <Link
                  to={{
                    pathname: '/current/answers',
                    state: {
                      response: this.state.response,
                      currentQuiz: this.props.currentQuiz,
                      radioBtnValue: this.state.radioBtnValue
                    }
                  }}
                  style={styles.submitBtn}
                >
                  Submit
                </Link>
              </Button>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentQuiz: state.quiz.currentQuiz,
    loading: state.quiz.loading
  };
}

export default connect(mapStateToProps, actions)(Quiz);
