import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Question from "./Question";
import QuestionsList from "./Questions";
import AddQuestion from "./AddQuestion";
import PostAnswer from "./PostAnswer";
import Answers from "./Answers";

function App() {
    return (<Router>
        <div className="App">
            <header className="App-header">
                <Navbar bg="#282c34" variant="dark" >
                    <Container>

                        <Navbar.Brand>
                               <h3>Mandatory Assignment: </h3>
                        </Navbar.Brand>

                        <Nav className="justify-content-end">
                            <Nav>
                                <Link to={"/QuestionsList"} className="nav-link">
                                    Question List
                                </Link>
                            </Nav>
                            <Nav>
                                <Link to={"/addQuestion"} className="nav-link">
                                    Add a new question
                                </Link>
                            </Nav>
                        </Nav>

                    </Container>
                </Navbar>
            </header>

            <Container>
                <Row>
                    <Col md={12}>
                        <div className="wrapper">
                            <Switch>
                                <Route exact path='/' component={QuestionsList}/>
                                <Route path="/Question/:id" component={Question} />
                                <Route path="/Answers" component={Answers} />
                                <Route path="/PostAnswer/:id" component={PostAnswer} />
                                <Route path="/AddQuestion" component={AddQuestion} />
                                <Route path="/QuestionsList" component={QuestionsList} />
                            </Switch>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </Router>);
}
export default App;