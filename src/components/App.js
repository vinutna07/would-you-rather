import React, { Component, Fragment } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import QuestionList from '../components/QuestionList'
import QuestionCardExpanded from './QuestionCardExpanded'
import NewQuestionForm from './NewQuestionForm'
import ScoreCardList from './ScoreCardList'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import LoginForm from './LoginForm'
import ErrorPage from './ErrorPage'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const user = this.props.authedUser
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="App">
            <Nav authedUser={user} />
            {this.props.loggedout === true
              ? <Route path='/' component={LoginForm} /> :
              <div>
                <Switch>
                  <Route path='/' exact component={QuestionList} />
                  <Route path='/questions/:id' component={QuestionCardExpanded} />
                  <Route path='/add' component={NewQuestionForm} />
                  <Route path='/leaderboard' component={ScoreCardList} />
                  <Route component={ErrorPage}/>
                </Switch>
              </div>}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    loggedout: authedUser === null,
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(App);
