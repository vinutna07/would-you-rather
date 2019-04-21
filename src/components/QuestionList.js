import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionCard from './QuestionCard'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'


class QuestionList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unansweredQuestion: true
        }
    }

    aQuestion = (e) => {
        e.preventDefault()
        if (this.state.unansweredQuestion) {
            this.setState({ unansweredQuestion: false })
        }
    }

    uQuestion = (e) => {
        e.preventDefault()
        if (!this.state.unansweredQuestion) {
            this.setState({ unansweredQuestion: true })
        }
    }

    render() {
        //console.log(this.props)
        return (
            <div>
                <div className='question-list-container'>
                    <ButtonGroup>
                        <Button className={this.state.unansweredQuestion ? 'selected-list' : 'nothing'} variant="info" onClick={this.uQuestion}>Unanswered Questions</Button>
                        <Button className={!this.state.unansweredQuestion ? 'selected-list' : 'nothing'} variant="info" onClick={this.aQuestion}>Answered Questions</Button>
                    </ButtonGroup>
                    <ul style={{ 'listStyleType': 'none', 'paddingLeft': '0px' }}>
                        {this.state.unansweredQuestion ? this.props.uQuestionIds.map((id) => (
                            <li key={id}>
                                <QuestionCard id={id} />
                            </li>
                        )) : this.props.aQuestionIds.map((id) => (
                            <li key={id}>
                                <QuestionCard id={id} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}



function mapStateToProps({ questions, authedUser }) {
    let uQuestionIds = []
    let aQuestionIds = []
    Object.keys(questions)
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
        .filter(qid => (!questions[qid].optionOne.votes.includes(authedUser) && !questions[qid].optionTwo.votes.includes(authedUser)) ?
            uQuestionIds.push(qid)
            : aQuestionIds.push(qid))
    return {
        uQuestionIds, aQuestionIds, authedUser
    }

}

export default connect(mapStateToProps)(QuestionList)