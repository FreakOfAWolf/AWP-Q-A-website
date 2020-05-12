import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditQuestion extends Component {

    constructor(props) {
        super(props);

        this.onChangeQuestionTitle = this.onChangeQuestionTitle.bind(this);
        this.onChangeQuestionDescription = this.onChangeQuestionDescription.bind(this);
        this.onChangeQuestionId = this.onChangeQuestionId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // State
        this.state = {
            title: '',
            description: '',
            _id: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/questions/edit-question/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    _id: res.data._id
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeQuestionTitle(e) {
        this.setState({ title: e.target.value })
    }

    onChangeQuestionDescription(e) {
        this.setState({ description: e.target.value })
    }

    onChangeQuestionId(e) {
        this.setState({ _id: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();

        const questionObject = {
            title: this.state.title,
            description: this.state.description,
            _id: this.state._id
        };

        axios.put('http://localhost:8080/questions/update-question/' + this.props.match.params.id, questionObject)
            .then((res) => {
                console.log(res.data);
                console.log('Question successfully updated')
            }).catch((error) => {
            console.log(error)
        });

        // Redirecting to the question list
        this.props.history.push('/questions')
    }


    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="Title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={this.state.title} onChange={this.onChangeQuestionTitle} />
                </Form.Group>

                <Form.Group controlId="Description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={this.state.description} onChange={this.onChangeQuestionDescription} />
                </Form.Group>

                <Form.Group controlId="Id">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" value={this.state._id} onChange={this.onChangeQuestionId} />
                </Form.Group>

                <Button variant="danger" size="lg" block="block" type="submit">
                    Update Question
                </Button>
            </Form>
        </div>);
    }
}