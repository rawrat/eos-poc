import { connect } from 'react-redux'
import { toggleQuestion } from '../actions'
import QuestionList from '../components/QuestionList'
const getVisibleQuestions = (Questions, filter) => {
  console.log("get visible questions", Questions)
  switch (filter) {
    case 'SHOW_COMPLETED':
      return Questions.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return Questions.filter(t => !t.completed)
    case 'SHOW_ALL':
    default:
      return Questions
  }
}
const mapStateToProps = state => ({
  Questions: getVisibleQuestions(state.Questions, state.visibilityFilter)
})
const mapDispatchToProps = dispatch => ({
  toggleQuestion: id => dispatch(toggleQuestion(id))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionList)