import EosConnector from '../EosConnector';

  export const addQuestion = question => {
    return function(dispatch) {
      EosConnector.addQuestion(question)
      .then(() => {
          dispatch(fetchQuestions())
      });
      
    }
  }

export const addVote = vote => {
  return function(dispatch) {
    EosConnector.addVote(vote)
    .then(() => {
        dispatch(fetchQuestions())
    });
    
  }
}

export const getQuestions = () => ({
  type: 'GET_QUESTIONS'
})

export const fetchQuestions = () => {
  return function(dispatch) {
    EosConnector.fetchQuestions().then((data) => {
      console.log("got questions", data);
      window.Questions = data.rows;
      dispatch(getQuestions())
    });
  }
}

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleQuestion = id => ({
  type: 'ADD_QUESTION',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}