let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');
const path = require('path');

// Express Route
const questionRoute = require('../backend/routes/question.route');

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://Vito:0000@cluster0-tlvjz.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
        console.log('Database successfully connected!')
    },
    error => {
        console.log('Could not connect to database : ' + error)
    }
);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/questions', questionRoute);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html') );
    })
}

// PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
});

// 404 Error
app.use((req, res, next) => {
    // eslint-disable-next-line no-undef
    next(createError(404));
});


app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
