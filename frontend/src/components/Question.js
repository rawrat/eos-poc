import React, { Component } from 'react'
import PropTypes from 'prop-types'
import store from '../store'
import { addVote, removeQuestion } from '../actions'

class Question extends Component {
    constructor(props) {
      super(props);

      this.state = {
        question_id: this.props.data.id,
        reason: '',
        yesno: '',
        yes: 0,
        no: 0,
        disabled: true
      };
    }

    handleChange(e) {
      this.setState({ reason: e.target.value });
    }
 
    handleVoteSelect(e) {
      this.setState({ yesno: e.target.value, disabled: false });
    }

    removeQuestion(e) {
      store.dispatch(removeQuestion(this.props.data.id))
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
                <option selected disabled >Please choose...</option>
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
              <button class="btn btn-info btn-xs" disabled={this.state.disabled}>Publish</button>
              </div>
          </div>
          <br/>
          <div class="form-row">
            <div class="col-10">{this.props.data.percentYes}% Yes&nbsp;&nbsp;|&nbsp;&nbsp;{this.props.data.percentNo}% No</div>
            <div class="col-2"><a href="#" class="danger" onClick={ this.removeQuestion.bind(this) }>Remove Question</a></div>
          </div>
          </div>
      </form>
    )
  }
}
export default Question