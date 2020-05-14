import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class PostAnswer extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);

        this.onChangePostAnswer = this.onChangePostAnswer.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            content: '',
            _id: '',
            parentId: ''
        }
    }

    onChangePostAnswer(e) {
        this.setState({content: e.target.value})
    }

    componentDidMount() {
        axios.get(this.API_URL + '/question/' + this.props.match.params.id)

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

    onSubmit(e) {
        e.preventDefault();

        const answerObject = {
            content: this.state.content,
            parentId: this.state.parentId,
            votes: 0
        };
        console.log(answerObject);

        axios.post(this.API_URL + '/postAnswer/', answerObject)
            .then(res => console.log(res.data));

        this.setState({ content: ''});
        window.location.assign(this.API_URL.replace('questions','') + "/question/" + this.state._id + "/answers");
    }

    render() {
        return (<div className="form-wrapper">
            <div className="card-body">
                <h5 className="Title">
                    {this.state.title}
                </h5>
                <p className="Description">
                    {this.state.description}
                </p>
            </div>
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="Content">

                    <Form.Label>Answer the question</Form.Label>
                    <Form.Control type="text" value={this.state.content} onChange={this.onChangePostAnswer} />

                    <Form.Label>Question ID</Form.Label>
                    <p>{this.state.parentId = this.state._id}</p>

                </Form.Group>
                <Button variant="dark" size="lg" block="block" type="submit">
                    Post Answer
                </Button>
            </Form>
        </div>);
    }
}