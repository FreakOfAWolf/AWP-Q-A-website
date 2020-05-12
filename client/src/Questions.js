import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import QuestionTableRow from './QuestionTableRow';

//Inside here I am making a HTTP GET request using axious nad Node/Express.js
//Also I am using bootstrap table to show the question data on the frontend
export default class QuestionsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/questions/')
            .then(res => {
                this.setState({
                    questions: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    DataTable() {
        return this.state.questions.map((res, i) => {
            return <QuestionTableRow obj={res} key={i} />;
        });
    }


    render() {
        return (<div className="table-wrapper">
            <h1></h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Question Title</th>
                    <th>Description</th>
                    <th>ID</th>
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