let nextQuestionId = 0
export const addQuestion = text => ({
  type: 'ADD_Question',
  id: nextQuestionId++,
  text
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleQuestion = id => ({
  type: 'TOGGLE_Question',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}