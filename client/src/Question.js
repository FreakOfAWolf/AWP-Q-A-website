import React, {Component} from "react";
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Table from "react-bootstrap/Table";
import AnswerTableRow from "./AnswerTableRow";

export default class Question extends Component {
    API_URL = process.env.REACT_APP_API_URL;

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
            });

        axios.get(this.API_URL + this.props.match.params.id + '/answers')
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