import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Redirect } from 'react-router-dom'

class NewQuestionForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            optionOneText : '',
            optionTwoText : '',
            toHome :false,
        }
    }
    handleChangeOne = (e) =>{
        const textOne = e.target.value
        this.setState(() => ({
            optionOneText : textOne
        }))
        //console.log(this.state.optionOneText)
    }
    handleChangeTwo = (e) =>{
        const textTwo = e.target.value
        this.setState(() => ({
            optionTwoText: textTwo
        }))
        //console.log(this.state.optionTwoText)
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        const optionOne = this.state.optionOneText
        const optionTwo = this.state.optionTwoText
        //console.log('new questions',this.state)
        //console.log({optionOne,optionTwo})
        const { dispatch } = this.props
        dispatch(handleAddQuestion(optionOne,optionTwo))
        this.setState(() => ({
            text: '',
            toHome: true,
        }))
    }

    render() {
        const { toHome } = this.state
        if (toHome === true) {
            return <Redirect to='/' />
        }
        return (
            <Card className='new-question-card'>
                <Card.Header as="h5" style={{ 'textAlign': 'center' }}>Create New Question</Card.Header>
                <Container>
                    <Row>
                        <Col md="12" lg="12">
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <div style={{ 'marginTop': '10px', 'padding': '2px' }}>Complete the questions</div>
                                    <Form.Label style={{ 'marginTop': '10px', 'padding': '2px' }}>
                                        <b>Would you rather ...</b></Form.Label>
                                    <Form.Control   type="text" placeholder="Enter Option One Text Here" 
                                                    value={this.state.optionOneText}
                                                    onChange={this.handleChangeOne}/>
                                    <h6 style={{ 'margin': '7px', 'textAlign': 'center' }}><b>OR</b></h6>
                                    <Form.Control   type="text" placeholder="Enter Option Two Text Here"
                                                    value={this.state.optionTwoText}
                                                    onChange={this.handleChangeTwo}/>
                                </Form.Group>
                                <Button variant="info"
                                    type="sumit"
                                    style={{ 'width': '100%', 'marginTop': '10px', 'padding': '2px' }}
                                    disabled = {this.state.optionOneText==='' || this.state.optionTwoText ===''}>
                                    Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Card>
        )
    }
}


export default connect()(NewQuestionForm)