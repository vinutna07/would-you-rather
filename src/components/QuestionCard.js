import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

class QuestionCard extends Component {
    render() {
        const { question } = this.props
        if (question === null) {
            return <p>This Question doesn't exist</p>
        }
        return (
            <Card className='question-card'>
                <Card.Header as="h6">{this.props.user.name} asks:</Card.Header>
                <Container>
                    <Row>
                        <Col xs="4" s="4" md="4" lg="4" style={{ 'padding': '25px' }}>
                            <Image src={this.props.user.avatarURL} />
                        </Col>
                        <Col xs="8" s="8" md="8" lg="8" style={{ 'padding': '15px' }}>
                            <h6 style={{ 'fontSize': '1em' }}>Would you rather</h6>
                            <div>
                                ...{question.optionOne.text.substring(0, 15)}...
                            </div>
                            <Link to={`/questions/${question.id}`}>
                                <div>
                                    <Button style={{ 'width': '100%', 'marginTop': '10px', 'padding': '2px' }}
                                        variant="outline-info">View Poll</Button>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </Card>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    let question = questions[id]
    let user = question ? users[question.author] : null
    return {
        authedUser,
        question: question ? question : null,
        user
    }
}

export default connect(mapStateToProps)(QuestionCard)