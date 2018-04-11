import React from 'react'
import { connect } from 'react-redux'
import { addQuestion } from '../actions'
const AddQuestion = ({ dispatch }) => {
  let input
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addQuestion(input.value))
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
export default connect()(AddQuestion)