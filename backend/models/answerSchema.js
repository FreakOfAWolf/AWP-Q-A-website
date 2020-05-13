const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let answerSchema = new Schema({
    content: {
        type: String
    },
    votes:{
        type: Number
    },
    parentId:{
        type:Number
    }
}, {
    collection: 'answers'
});

module.exports = mongoose.model('answerSchema', answerSchema);