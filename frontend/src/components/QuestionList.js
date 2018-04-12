import React from 'react'
import PropTypes from 'prop-types'
import Question from './Question'
const QuestionList = ({ Questions, toggleQuestion }) => (
  <div>
    {Questions.map(question =>
      <Question
        key={question.id}
        data={question}
        {...question}
        onClick={() => toggleQuestion(question.id)}
      />
    )}
  </div>
)
QuestionList.propTypes = {
  Questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  toggleQuestion: PropTypes.func.isRequired
}
export default QuestionList