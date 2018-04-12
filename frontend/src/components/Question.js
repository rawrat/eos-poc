import React, { Component } from 'react'
import PropTypes from 'prop-types'
import store from '../store'
import { addVote } from '../actions'

class Question extends Component {
    constructor(props) {
      super(props);

      this.state = {
        question_id: this.props.data.id,
        reason: '',
        yesno: ''
      };
    }

    handleChange(e) {
      this.setState({ reason: e.target.value });
    }
 
    handleVoteSelect(e) {
      this.setState({ yesno: e.target.value });
    }

    render() {
    return (
      <form
      onSubmit={e => {
        e.preventDefault()
        store.dispatch(addVote(this.state))
      }}>
        <div class="question">
          <div class="form-row">
            <div class="col-12"><h3>{this.props.data.question}</h3></div>
          </div>
          <div class="form-row">
            <div class="col-1">
              I say
            </div>
            <div class="col-3"> 
              <select class="form-control" onChange={ this.handleVoteSelect.bind(this) } >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div class="col-2"> , because&nbsp;
            </div>
            <div class="col-4">
              <input type="text" class="form-control" onChange={ this.handleChange.bind(this) } />
            </div>
            <div class="col-2">
              <button class="btn btn-info btn-xs">Publish</button>
              </div>
          </div>
          </div>
      </form>
    )
  }
}
Question.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}
export default Question