let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// Question Model
let questionSchema = require('../models/QuestionSchema');
let answerSchema = require('../models/answerSchema');

// CREATE a question
router.route('/addQuestion').post((req, res, next) => {
    questionSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data);
            res.json(data)
        }
    })
});

// CREATE an answer
router.route('/postAnswer').post((req, res, next) => {
    answerSchema.create(req.body, (error, data) => {
        if (error) {
            console.log(error)
            return next(error)
        } else {
            console.log(data);
            res.json(data)
        }
    })
});

// READ the questions
router.route('/').get((req, res) => {
    questionSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

router.route('/answers').get((req, res) => {
    answerSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


// READ the answers
router.route('/:id/answers/').get((req, res) => {
    answerSchema.find({parentId: { $eq: req.params.id }},(error, data) => {
        if (error) {
            return next(error)
        } else {

            res.json(data)
        }
    })
});

// Get Single Question
router.route('/question/:id').get((req, res) => {
    questionSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


// Update Question
router.route('/update-question/:id').put((req, res, next) => {
    questionSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error);
        } else {
            res.json(data);
            console.log('Question updated successfully !')
        }
    })
});

router.route('/voteAnswer/:id').put((req, res, next) => {
    answerSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error);
        } else {
            res.json(data)
            console.log('Answer voted for successfully !')
        }
    })
});

// Delete Question
router.route('/delete-question/:id').delete((req, res, next) => {
    questionSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});
router.route('/delete-answer/:id').delete((req, res, next) => {
    answerSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});
module.exports = router;