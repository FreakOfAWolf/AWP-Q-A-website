import React, {Component} from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Table from "react-bootstrap/Table";
import AnswerTableRow from "./AnswerTableRow";
import {Link} from "react-router-dom";

export default class Question extends Component {

    constructor(props) {
        super(props);
        // State
        this.state = {
            title: '',
            description: '',
            _id: '',
            answers: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/questions/question/' + this.props.match.params.id)

            .then(res => {
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    _id: res.data._id
                });
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get('http://localhost:8080/questions/' + this.props.match.params.id + '/answers')
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
            return <AnswerTableRow obj={res} key={i}/>;
        });
    }

    render() {
        return (
            <Card className="card">
                <div className="card-body">
                    <h5 className="Title">
                        {this.state.title}
                    </h5>
                    <p className="Description">
                        {this.state.description}
                    </p>
                </div>
                <div className="table-wrapper">
                    <Table>
                        <thead>
                        <tr>
                            <th>Answers</th>
                            <th>Votes and actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.DataTable()}
                        </tbody>
                    </Table>
                </div>
            </Card>

        );
    }
}