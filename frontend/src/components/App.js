import React from 'react'
import AddQuestion from '../containers/AddQuestion'
import VisibleQuestionList from '../containers/VisibleQuestionList'
import Login from '../containers/Login'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/questions'>Questions</Link></li>
        <li><Link to='/'>Vote</Link></li>
      </ul>
    </nav>
  </header>
)
const QuestionView = () => (
  <div>
    <h1>Ask a question</h1>
    <AddQuestion />
  </div>
)

const VotingView = () => (
  <div>
    <h1>Vote on questions</h1>
    <VisibleQuestionList />
  </div>
)

const App = () => (
  <main>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={VotingView}/>
        <Route path="/questions" component={QuestionView}/>
        <Route path="/login" component={Login}/>
      </Switch>
    </div>
  </main>
)
export default App
