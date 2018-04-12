import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addQuestion, fetchQuestions } from '../actions'

class AddQuestion extends Component {
  componentDidMount () {
    this.props.dispatch(fetchQuestions())
  }

  render() {
    let input
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault()
            if (!input.value.trim()) {
              return
            }
            this.props.dispatch(addQuestion(input.value))
            input.value = ''
          }}
        >
            <div class="form-row">
              <div class="col-10">
                <input ref={node => input = node} class="form-control" />
              </div>
              <div class="col">
                <button type="submit" class="btn btn-info">
                  Ask Question
                </button>
              </div>
            </div>
        </form>
        </div>
    )
  }
}

export default connect()(AddQuestion)