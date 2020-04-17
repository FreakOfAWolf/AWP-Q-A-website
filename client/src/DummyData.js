import React from 'react';

export default function questions() {

// Some data.
    const question1 = {
        id: 1,
        text: "How do I return the response from an Observable in Angular 2?",
        answers: [
            {text: "Observables are lazy so you have to subscribe to get the value.", votes: 5},
            {text: "You can use asyncPipe", votes: -2},
            {text: "The reason that it's undefined is that you are making an asynchronous operation", votes: 3},
        ]
    };
    const question2 = {
        id: 2,
        text: "What can I do to make a difference in the IT community?",
        answers: [
            {text: "Help as best you can the new comers to the community.", votes: 5},
            {text: "Add shit to GitHub.", votes: -2},
            {text: "Develop something ground-breaking.", votes: 3},
        ]
    };

    return {question1, question2}
}