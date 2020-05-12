import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import AnswerTableRow from './AnswerTableRow';

//Inside here I am making a HTTP GET request using axious nad Node/Express.js
//Also I am using bootstrap table to show the question data on the frontend
export default class Answers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answers: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/questions/answers/')
            .then(res => {
                this.setState({
                    answers: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    DataTable() {
        return this.state.answers.map((res, i) => {
            return <AnswerTableRow obj={res} key={i} />;
        });
    }


    render() {
        return (<div className="table-wrapper">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Answers</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {this.DataTable()}
                </tbody>
            </Table>
        </div>);
    }
}