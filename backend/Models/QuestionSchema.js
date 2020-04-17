const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let questionSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    _id: {
        type: Number
    }
}, {
    collection: 'questions'
})

module.exports = mongoose.model('QuestionSchema', questionSchema);