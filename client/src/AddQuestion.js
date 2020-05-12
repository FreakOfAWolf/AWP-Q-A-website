import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class AddQuestion extends Component {

    constructor(props) {
        super(props);

        this.onChangeQuestionTitle = this.onChangeQuestionTitle.bind(this);
        this.onChangeQuestionDescription = this.onChangeQuestionDescription.bind(this);
        this.onChangeQuestionId = this.onChangeQuestionId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            title: '',
            description: '',
            _id: ''
        }
    }

    onChangeQuestionTitle(e) {
        this.setState({title: e.target.value})
    }

    onChangeQuestionDescription(e) {
        this.setState({description: e.target.value})
    }

    onChangeQuestionId(e) {
        this.setState({_id: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        const questionObject = {
            title: this.state.title,
            description: this.state.description,
            _id: this.state._id
        };
        console.log(questionObject);

        axios.post('http://localhost:8080/questions/addQuestion', questionObject)
            .then(res => console.log(res.data));

        this.setState({title: '', description: '', _id: ''});
        window.location.assign("http://localhost:3001/QuestionsList");
    }

    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="Title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={this.state.title} onChange={this.onChangeQuestionTitle}/>
                </Form.Group>

                <Form.Group controlId="Description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={this.state.description} onChange={this.onChangeQuestionDescription}/>
                </Form.Group>

                <Form.Group controlId="Id">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" value={this.state._id} onChange={this.onChangeQuestionId}/>
                </Form.Group>

                <Button variant="danger" size="lg" block="block" type="submit">
                    Add your question
                </Button>
            </Form>
        </div>);
    }
}