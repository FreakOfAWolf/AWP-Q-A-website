import React, {Component} from 'react';

export default class addVote extends Component {

    constructor(props) {
        super(props);
        this.onChangeVoteNumber = this.onChangeVoteNumber.bind(this);

        super(props);
        this.state = {
            vote: ''
        };
    }

    onChangeVoteNumber(e) {
        this.setState({
            vote: e.target.value
        });
    }

    handleButtonClick(e) {
        this.props.addVote(this.state.vote);
    }

    render() {
        return (
            <>
                <input type="text" placeholder="Fetch kids from school"
                       onChange={(event) => this.onChangeVoteNumber(e)}/>
                <button onClick={(event) => this.handleButtonClick(event)}>Add Task</button>
            </>
        );
    }
}


