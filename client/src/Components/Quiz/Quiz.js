import React, { Component } from 'react';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';
import Button from 'material-ui/Button';

// CSS
const styles = {
  root: {
    margin: '0 2%',
    flexGrow: 1
  },
  gridContainer: {
    textAlign: 'center'
  },
  paper: {
    textAlign: 'left',
    padding: 16,
    marginTop: 5
  },
  submitBtn: {
    color: 'white'
  }
};

// prettier-ignore
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
    return <div style={styles.root}>
        {/* Grid Container */}
        <Grid container style={styles.gridContainer}>
          {this.props.currentQuiz.map((Quiz, quesIndex) => {
            return <Grid key={Quiz._id} item xs={12}>
                {/* One Grid Item consist of One Paper Component */}
                <Paper style={styles.paper} elevation={4}>
                  {/* Question Text (h4) */}
                  <Typography variant="headline" component="h4">
                    {Quiz.text}
                  </Typography>

                  {/* Choices are wrapped inside FromControl Component */}
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Options:</FormLabel>

                    {/* Radio buttons are grouped within a RadioGroup */}
                    <RadioGroup onChange={this.handleChange} value={this.state.radioBtnValue[quesIndex]}>
                      {Quiz.choices.map((choice, index) => {
                        return <FormControlLabel key={choice} value={`${Quiz._id} ${index} ${quesIndex}`} control={<Radio />} label={choice} />;
                      })}
                    </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>;
          })}

          <Button variant="raised" color="primary">
            <Link to={{
              pathname: '/current/answers',
              state: {
                response: this.state.response,
                currentQuiz: this.props.currentQuiz
              }
              }}
              style={styles.submitBtn}
              >
              Submit
            </Link>
          </Button>
        </Grid>
      </div>;
  }
}

function mapStateToProps(state) {
  return {
    currentQuiz: state.quiz.currentQuiz
  };
}

export default connect(mapStateToProps, actions)(Quiz);
