const Questions = (state = [], action) => {
    switch (action.type) {
      case 'ADD_Question':
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      case 'TOGGLE_Question':
        return state.map(Question =>
          (Question.id === action.id)
            ? {...Question, completed: !Question.completed}
            : Question
        )
      default:
        return state
    }
  }
  export default Questions