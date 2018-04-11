import React from 'react'
import PropTypes from 'prop-types'
import Question from './Question'
const QuestionList = ({ Questions, toggleQuestion }) => (
  <ul>
    {Questions.map(question =>
      <Question
        key={question.id}
        {...question}
        onClick={() => toggleQuestion(question.id)}
      />
    )}
  </ul>
)
QuestionList.propTypes = {
  Questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  toggleQuestion: PropTypes.func.isRequired
}
export default QuestionList