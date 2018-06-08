import React, { Component } from 'react';

class QuizFormModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: '',
      endTime: '',
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Initialize form values
    if (nextProps.quiz) {
      const { startTime, endTime, description } = nextProps.quiz;
      this.setState({ startTime, endTime, description });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { toggleModal } = this.props;
    return (
      <div className="modal">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Quiz Form</p>
          </header>
          <section className="modal-card-body">
            <form>
              <div className="field">
                <label className="label">Start Time</label>
                <div className="control">
                  <input
                    name="startTime"
                    className="input is-primary"
                    type="datetime-local"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">End Time</label>
                <div className="control">
                  <input
                    name="endTime"
                    className="input is-primary"
                    type="datetime-local"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <textarea
                    name="description"
                    className="textarea is-primary"
                    placeholder="Description"
                    onChange={this.handleChange}
                    value={this.state.description}
                  />
                </div>
              </div>
            </form>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-danger" onClick={() => toggleModal()}>
              Cancel
            </button>
            <button
              className="button is-success"
              onClick={e => this.props.handleSubmit(e, this.state)}
            >
              Submit
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

export default QuizFormModal;
