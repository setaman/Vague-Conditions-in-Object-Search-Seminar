let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');
let dbConnector = require('./user/user');
const MongoClient = require('mongodb').MongoClient;

var jwt = require('jsonwebtoken');
let passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecret = 'secret';

let db;

// Connection URL
const url = 'mongodb://localhost:27017/user';

// Database Name
const dbName = 'usersDb';

// Create a new MongoClient

const client = new MongoClient('mongodb://mongo:27017', { useNewUrlParser: true });

client.connect(function (err) {

    if (err) {
        console.error('Can not connect to db:', err);
    } else {
        console.log("Connected successfully to server");
        db = client.db(dbName);
        client.close();
    }
});


passport.use(new LocalStrategy(
    (username, password, done) => {

        /*db.findOne({username}, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user.password !== passport) {
                return done(null, false, {message: 'Incorrect password.'});
            }

            return done(null, user);
        })*/
    }
));

let app = express();

app.use(cors());

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
