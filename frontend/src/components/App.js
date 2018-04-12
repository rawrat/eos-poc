import React from 'react'
import AddQuestion from '../containers/AddQuestion'
import VisibleQuestionList from '../containers/VisibleQuestionList'

const App = () => (
  <div>
    <h1>Ask a question</h1>
    <AddQuestion />
    <br/><br/>
    <h1>Vote on questions</h1>
    <VisibleQuestionList />
  </div>
)

export default App