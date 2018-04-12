import EosConnector from '../EosConnector';

window.Questions = [];

const Questions = (state = [], action) => {
    switch (action.type) {
      case 'ADD_QUESTION':
        return [
          ...state,
          {
            id: action.id,
            question: action.question,
            completed: false
          }
        ]
      case 'TOGGLE_QUESTION':
        return state.map(Question =>
          (Question.id === action.id)
            ? {...Question, completed: !Question.completed}
            : Question
        )
      case 'FETCH_QUESTIONS':
        return [ ...state ];
      case 'GET_QUESTIONS':
        return [
          ...state,
          ...window.Questions
        ];
      default:
        return state
    }
  }
  export default Questions