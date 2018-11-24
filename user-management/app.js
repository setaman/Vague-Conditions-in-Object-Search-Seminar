let express = require('express');
let path = require('path');
const bodyParser = require('body-parser');
let logger = require('morgan');
let cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

let passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

let db;

// Database Name
const dbName = 'usersDb';

// Create a new MongoClient

const client = new MongoClient('mongodb://localhost:27017/users', {useNewUrlParser: true});

client.connect(function (err) {

    if (err) {
        console.error('Can not connect to db:', err);
    } else {
        console.log("Connected successful to server");
        db = client.db(dbName);
        client.close();
    }
});

passport.use('signup', new LocalStrategy(
    async (username, password, done) => {
        console.log(username);
        let user;
        try {
            user = await db.collection('users').findOne({username});
            console.log({user});
            if (user) {
                console.log(user);
                return done(null, false, {message: 'User already exist'});
            }
        } catch (e) {
            return done(null, false, {message: e});
        }

        try {
            user = await db.collection('users').insertOne({username, password});
            if (!user) {
                return done(null, false, {message: 'Some Error occurred while inserting new user.'});
            }
            return done(null, {message: 'User' + user.name + ' successfully added'});
        } catch (e) {
            return done(null, false, {message: e});
        }
    }
));

passport.use(new JwtStrategy({
        secretOrKey: 'secret',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    (jwt_payload, done) => {

        db.findOne({name: jwt_payload.name}, (err, user) => {
            if (err) {
                return done(null, false, {message: 'Incorrect username.'});
            }

            if (!user.password !== passport) {
                return done(null, false, {message: 'Incorrect password.'});
            }

            return done(null, user);
        })
    }
));

let app = express();

app.use(cors());

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/verify', passport.authenticate('jwt', {session: false}, (req, res) => {
        res.send('User with name ' + req.user.name + ' is verified!');
    })
);


//Handle errors
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({error: err});
});

module.exports = app;
