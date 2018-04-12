import React from 'react'
import PropTypes from 'prop-types'
const Question = ({ onClick, completed, text, question }) => (
  <li
    onClick={onClick}
    style={ {
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {question}
  </li>
)
Question.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}
export default Question