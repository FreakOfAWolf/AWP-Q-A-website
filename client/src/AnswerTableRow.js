import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class AnswerTableRow extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.deleteAnswer = this.deleteAnswer.bind(this);
        this.voteAnswer = this.voteAnswer.bind(this);
    }

    // Deleting an answer, testing out things.
    deleteAnswer() {
        axios.delete(this.API_URL + '/delete-answer/' + this.props.obj._id)
            .then((res) => {
                console.log('Answer successfully deleted!');
                window.location.assign(this.API_URL.replace('questions','') + 'question/' + this.props.obj._id + '/answers');
            }).catch((error) => {
            console.log(error)
        })
    }

    voteAnswer() {
        let temp = this.props.obj;
        let v = temp.votes +=1;
        console.log(v);
        axios.put(this.API_URL + '/voteAnswer/' + this.props.obj._id,temp)
            .then((res) => {
                console.log('Answer successfully up-voted!');
                window.location.assign(this.API_URL.replace('questions','') + 'question/' + this.props.obj._id + '/answers');
            }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.content}</td>
                <td >
                    <Button onClick={this.voteAnswer} size="sm" variant="dark">+</Button>
                    <label>{this.props.obj.votes}</label>
                    <Button onClick={this.deleteAnswer} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}