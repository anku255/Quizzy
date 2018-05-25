import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { renderTextField } from './formFields';
import { updateUserProfile } from '../../actions';

const validate = values => {
  const errors = {};
  const requiredFields = ['name', 'email'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  if (values['semester'] < 1 || values['semester'] > 8)
    errors['semester'] = 'Semester must lie in range [1:8]';

  return errors;
};

class EditProfile extends Component {
  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const initData = {
      name: this.props.user.name,
      email: this.props.user.email,
      semester: this.props.user.semester
    };

    this.props.initialize(initData);
  }

  handleFormSubmit(userData) {
    this.props.updateUserProfile(userData, this.props.history);
  }

  render() {
    const { handleSubmit, pristine } = this.props;
    return (
      <div className="container">
        <div
          style={{
            margin: '20px 50px',
            padding: '20px',
            border: '2px solid rgb(177, 173, 173)'
          }}
        >
          <div className="title" style={{ textAlign: 'center' }}>
            Edit Profile
          </div>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <Field
              name="name"
              component={renderTextField}
              label="Name"
              type="text"
            />
            <Field
              name="email"
              component={renderTextField}
              label="Email"
              type="email"
            />
            <Field
              name="semester"
              component={renderTextField}
              label="Semester"
              type="Number"
              placeholder="Enter your semester"
            />

            <div
              className="field is-grouped "
              style={{ display: 'flex', justifyContent: 'space-evenly' }}
            >
              <div className="control ">
                <button className="button is-danger is-medium ">
                  <Link to="/dashboard" className="has-text-white">
                    <span className="icon ">
                      <i className="fas fa-ban " />
                    </span>
                    <span>Cancel</span>
                  </Link>
                </button>
              </div>

              <div className="control ">
                <button
                  className="button is-success is-medium"
                  disabled={pristine}
                  action="submit"
                >
                  <span>Submit</span>
                  <span className="icon ">
                    <i className="fas fa-arrow-right " />
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth
});

export default connect(mapStateToProps, { updateUserProfile })(
  reduxForm({
    form: 'editProfile', // a unique identifier for this form
    validate
  })(EditProfile)
);
