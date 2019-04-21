import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class ScoreCardList extends Component {
    render() {
        return (
            <div>
                {this.props.sortedUsers.map((u) => (
                    <Card className='score-card' key={u.id}>
                        <Container>
                            <Row>
                                <Col xs="3" s="3" md="3" lg="3" style={{ 'padding': '15px' }}>
                                    <Image src={u.avatarURL} />
                                </Col>
                                <Col xs="6" s="6" md="6" lg="6" style={{ 'padding': '10px' }}>
                                    <h6 style={{ 'fontSize': '1em' }}>{u.name}</h6>
                                    <div>Answered questions : {Object.keys(u.answers).length}</div>
                                    <div>Created questions : {u.questions.length}</div>
                                </Col>
                                <Col xs="3" s="3" md="3" lg="3" style={{ 'padding': '10px' }}>
                                    <Card>
                                        <Card.Header style={{ 'height': '30px', 'padding': '3px', 'textAlign': 'center' }}>Score</Card.Header>
                                        <Container>
                                            <Row>
                                                <Col xs="12" s="12" md="12" lg="12" >
                                                    <div className="text-info" style={{ 'fontSize': '1.5em', 'padding': '10px', 'textAlign': 'center' }}>
                                                        <b>{Object.keys(u.answers).length + u.questions.length}</b>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Card>
                ))}
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    let sortedUsers = []
    sortedUsers = Object.values(users)
        .sort((a, b) => (
            (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length)
        ))
    return {
        users, sortedUsers
    }
}

export default connect(mapStateToProps)(ScoreCardList)