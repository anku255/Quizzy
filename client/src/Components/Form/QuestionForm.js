import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    margin: '2% 10%',
    flexGrow: 1
  },
  gridContainer: {
    textAlign: 'center'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  selectField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: '200px'
  }
});

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
const categories = ['category1', 'category2', 'category3'];

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      choice0: '',
      choice1: '',
      choice2: '',
      choice3: '',
      correctAnsIndex: '',
      semester: '',
      category: '',
      ansDescription: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    for (const [key, value] of Object.entries(this.state)) {
      if (value.length < 1) {
        return alert(`Please fill the ${key} field`);
      }
    }

    if (this.state.correctAnsIndex < 0 || this.state.correctAnsIndex > 3) {
      return alert('CorrectAnsIndex should in the range (0,3) ');
    }

    const result = { ...this.state, choices: [] };
    for (let i = 0; i < 4; i++) {
      result.choices.push(this.state[`choice${i}`]);
      delete result[`choice${i}`];
    }

    this.props.submitQuestion(this.state);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form className={classes.container}>
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12}>
              <Typography variant="title" gutterBottom>
                Submit A New Question
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="text"
                label="Question Text"
                value={this.state.text}
                onChange={this.handleChange('text')}
                margin="normal"
                multiline={true}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="choice0"
                label="First Option"
                className={classes.textField}
                value={this.state.choice0}
                onChange={this.handleChange('choice0')}
                margin="normal"
              />
              <TextField
                id="choice1"
                label="Second Option"
                className={classes.textField}
                value={this.state.choice1}
                onChange={this.handleChange('choice1')}
                margin="normal"
              />
              <TextField
                id="choice2"
                label="Third Option"
                className={classes.textField}
                value={this.state.choice2}
                onChange={this.handleChange('choice2')}
                margin="normal"
              />
              <TextField
                id="choice3"
                label="Fourth Option"
                className={classes.textField}
                value={this.state.choice3}
                onChange={this.handleChange('choice3')}
                margin="normal"
              />
              <TextField
                id="correctAnsIndex"
                label="Correct Answer Index"
                className={classes.textField}
                value={this.state.correctAnsIndex}
                onChange={this.handleChange('correctAnsIndex')}
                type="number"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="select-semester"
                select
                label="Semester"
                className={classes.selectField}
                value={this.state.semester}
                onChange={this.handleChange('semester')}
                margin="normal"
              >
                {semesters.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="select-category"
                select
                label="Category"
                className={classes.selectField}
                value={this.state.category}
                onChange={this.handleChange('category')}
                margin="normal"
              >
                {categories.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="ansDescription"
                label="Answer Description"
                value={this.state.ansDescription}
                onChange={this.handleChange('ansDescription')}
                margin="normal"
                multiline={true}
                fullWidth
              />
            </Grid>
            <Button
              variant="raised"
              color="primary"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </div>
    );
  }
}

export default connect(null, actions)(withStyles(styles)(QuestionForm));
