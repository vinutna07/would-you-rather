import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { handleAnswerQuestion } from '../actions/questions'

class QuestionCardExpanded extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showResult: false,
            userChoice: ''
        }
    }

    componentDidMount() {
        const { authedUser, question } = this.props
        if (question.optionOne.votes.includes(authedUser)) {
            this.setState({ showResult: true, userChoice: 'optionOne' })
        } else if (question.optionTwo.votes.includes(authedUser)) {
            this.setState({ showResult: true, userChoice: 'optionTwo' })
        }
    }

    handleOptionChange = (e) => {
        const choice = e.target.value
        this.setState({ userChoice: choice })
        //console.log('choice ' ,choice)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const answer = this.state.userChoice
        const { dispatch, authedUser, question } = this.props
        dispatch(handleAnswerQuestion({
            authedUser,
            qid: question.id,
            answer
        }))

        this.setState({ showResult: true })
    }

    render() {
        const { question, user } = this.props
        if (question === null) {
            return <p>This Question doesn't exist</p>
        }
        const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
        const optionOneVotes = question.optionOne.votes.length
        const optionTwoVotes = question.optionTwo.votes.length
        const nowOne = ((optionOneVotes / totalVotes) * 100).toFixed(0);
        const nowTwo = ((optionTwoVotes / totalVotes) * 100).toFixed(0);
        const uc = this.state.userChoice
        //console.log(this.props.user)
        return (
            <Card className='question-card-expanded'>
                {!this.state.showResult ?
                    <Fragment>
                        <Card.Header as="h6">{this.props.user.name} asks:</Card.Header>
                        <Container>
                            <Row>
                                <Col xs="4" s="4" md="4" lg="4" style={{ 'padding': '35px' }}>
                                    <Image src={user.avatarURL} />
                                </Col>
                                <Col xs="8" s="8" md="8" lg="8" style={{ 'padding': '15px' }}>
                                    <h6 style={{ 'fontSize': '1em' }}>Would You Rather...</h6>
                                    <Form onSubmit={this.handleSubmit}>
                                        <div className="radio">
                                            <label><input type="radio"
                                                value="optionOne"
                                                checked={this.state.userChoice === "optionOne"}
                                                onChange={this.handleOptionChange} />    {this.props.question.optionOne.text}</label>
                                        </div>
                                        <div className="radio">
                                            <label><input type="radio"
                                                value="optionTwo"
                                                checked={this.state.userChoice === "optionTwo"}
                                                onChange={this.handleOptionChange} />    {this.props.question.optionTwo.text}</label>
                                        </div>
                                        <Button style={{ 'width': '100%', 'marginTop': '10px', 'padding': '2px' }}
                                            type="submit"
                                            variant="info"
                                            disabled={this.state.userChoice === ''}>Submit</Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Container></Fragment> :
                    <Fragment>
                        <Card.Header as="h6">Asked by {this.props.user.name}</Card.Header>
                        <Container>
                            <Row>
                                <Col md="4" lg="4" style={{ 'padding': '35px' }}>
                                    <Image src={this.props.user.avatarURL} />
                                </Col>
                                <Col md="8" lg="8" style={{ 'padding': '15px' }}>
                                    <h6 style={{ 'fontSize': '1em' }}>Results:</h6>
                                    <Container>
                                        <Row>
                                            <Card className={uc === 'optionOne' ? 'selected-option-card' : 'option-card'}>
                                                {uc === 'optionOne' ? <span className='badge'>Your<p>vote</p></span> : <Fragment></Fragment>}
                                                <Card.Text style={{ 'fontSize': '0.75em', 'marginBottom': '5px' }}><b>{this.props.question.optionOne.text}?</b></Card.Text>
                                                <ProgressBar style={{ 'margin': '5px' }} variant="info" now={nowOne} label={`${nowOne}%`} />
                                                <div style={{ 'textAlign': 'center', 'fontSize': '0.7em' }}>{optionOneVotes} out of {totalVotes} votes</div>
                                            </Card>
                                        </Row>
                                        <Row>
                                            <Card className={uc === 'optionTwo' ? 'selected-option-card' : 'option-card'}>
                                                {uc === 'optionTwo' ? <span className='badge'>Your<p>vote</p></span> : <Fragment></Fragment>}
                                                <Card.Text style={{ 'fontSize': '0.75em', 'marginBottom': '5px' }}><b>{this.props.question.optionTwo.text}?</b></Card.Text>
                                                <ProgressBar style={{ 'margin': '5px' }} variant="info" now={nowTwo} label={`${nowTwo}%`} />
                                                <div style={{ 'textAlign': 'center', 'fontSize': '0.7em' }}>{optionTwoVotes} out of {totalVotes} votes</div>
                                            </Card>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Container></Fragment>}
            </Card>
        )
    }
}

//get id value from page route
function mapStateToProps({ authedUser, users, questions }, props) {
    const { id } = props.match.params
    let question = questions[id]
    let user = question ? users[question.author] : null
    return {
        authedUser,
        question: question ? question : null,
        user
    }
}

export default connect(mapStateToProps)(QuestionCardExpanded)