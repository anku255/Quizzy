import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Checkbox from 'material-ui/Checkbox';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel
} from 'material-ui/Form';

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
  }
};

// prettier-ignore
class Quiz extends Component {
  componentDidMount = () => {
    this.props.fetchCurrentQuiz();
  }

  render() {
    return (
      <div style={styles.root}>

        {/* Grid Container */}
        <Grid container style={styles.gridContainer}>
          {
            this.props.currentQuiz.map(Quiz => {
              return <Grid key={Quiz._id} item xs={12}>

                  {/* One Grid Item consist of One Paper Component */}
                  <Paper style={styles.paper} elevation={4}>

                    {/* Question Text (h4) */}
                    <Typography variant="headline" component="h4">
                      {Quiz.text}
                    </Typography>

                    {/* Choices are wrapped inside FromControl Component */}
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        Options:
                      </FormLabel>
                      <FormGroup>
                        {Quiz.choices.map((choice) => {
                          return <FormControlLabel key={choice} control={<Checkbox />} label={choice} />
                        })}
                      </FormGroup>
                    </FormControl>
                  </Paper>
                </Grid>;
            })
          }

        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentQuiz: state.quiz.currentQuiz
  };
}

export default connect(mapStateToProps, actions)(Quiz);
