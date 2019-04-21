import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { setAuthedUser } from '../actions/authedUser'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(setAuthedUser(this.state.loggedInUser))
    }

    handleChangeOption = (e) => {
        e.preventDefault()
        this.setState({ loggedInUser: e.target.value })
    }

    render() {
        const userList = Object.values(this.props.users).map(u => { return { name: u.name, value: u.id } })
        //console.log(userList)
        return (
            <Card className='option-card'>
                <Card.Header style={{ 'textAlign': 'center' }} as="h6">Welcome to the Would You Rather App!
                <div style={{ 'textAlign': 'center', 'fontSize': '0.75em' }}>Please sign in to continue</div>
                </Card.Header>
                <Container>
                    <Row>
                        <Col xs="12" s="12" md="12" lg="12" style={{ 'padding': '25px' }}>
                            <div style={{ 'textAlign': 'center' }}><Image src='/avatars/reduxlogo.png' width='75' height='70' /></div>
                            <div style={{ 'marginTop': '20px', 'fontSize': '1.5em', 'textAlign': 'center' }} className="text-info"><b>Sign in</b></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" s="12" md="12" lg="12" style={{ 'padding': '15px' }}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Control onChange={this.handleChangeOption} as="select">
                                    <option hidden>Select User</option>
                                    {userList.map(u => (
                                        <option key={u.value} value={u.value} >{u.name}</option>
                                    ))}
                                </Form.Control>
                                <Button style={{ 'width': '100%', 'marginTop': '10px', 'padding': '2px' }}
                                    type="submit"
                                    variant="info">Sign in</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Card>
        )
    }
}

function mapStateToProps({ users }) {
    return { users }
}


export default connect(mapStateToProps)(LoginForm)