import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class QuestionTableRow extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.deleteQuestion = this.deleteQuestion.bind(this);
    }

    deleteQuestion() {
        axios.delete(this.API_URL + '/delete-question/' + this.props.obj._id)
            .then((res) => {
                console.log('Question successfully deleted!');
                window.location.assign(this.API_URL.replace('questions',''));
            }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.title}</td>
                <td>{this.props.obj.description}</td>
                <td>{this.props.obj._id}</td>
                <td>
                    <Button size="sm" variant={"outline-success"}>
                    <Link className="answer-question" to={"/PostAnswer/" + this.props.obj._id}>
                        Post answer
                    </Link>
                    </Button>
                    <p></p>
                    <Button size="sm" variant={"outline-success"}>
                    <Link className="question" to={"/question/" + this.props.obj._id + "/answers"}>
                        Check answers
                    </Link>
                    </Button>
                    <p></p>
                    <Button onClick={this.deleteQuestion} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}