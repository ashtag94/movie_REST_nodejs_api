const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs')
const path = require('path')

const movieRoutes = require('./api/routes/movies');

// mongoose.Promise = global.Promise;

//connecting to database
mongoose.connect(
    'mongodb+srv://test:'+ 
    process.env.MONGO_ATLAS_PW +
    '@cluster0-puu21.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("MongoDb connected");
}).catch(err => console.log(err));

//logging the incoming requests
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined',{ stream: accessLogStream }));

//using body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Routes
app.use('/movies',movieRoutes);

//Error handeling 
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;