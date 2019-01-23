let express = require('express');
let path = require('path');
const bodyParser = require('body-parser');
let logger = require('morgan');
const axios = require('axios');
let cors = require('cors');
let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
const MongoClient = require('mongodb').MongoClient;
const log = require('./logger');

let passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

let db;

const dbName = 'usersDb';

const client = new MongoClient('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    reconnectTries: 10,
    reconnectInterval: 2000,
});

client.connect(function (err) {
    if (err) {
        log.error('mongo', 'Can not connect to db');
        throw err;
    } else {
        log.info('mongo', 'Connected successful to mongo!');
        db = client.db(dbName);
        //client.close();
    }
});

passport.use('signup', new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password',
    },
    (name, password, done) => {

        db.collection('users').findOne({name}, (err, user) => {
            if (err) {
                return done(null, false, {message: 'Error occurred'});
            }
            if (user) {
                log.warn('login strategy', 'user already exist');
                return done(null, false, {message: 'user already exist'});
            }

            db.collection('users').insertOne({name, password}, (err, result) => {
                if (err) {
                    log.error('login strategy insert', 'some error while inserting user');
                    return done(null, false, {message: 'some error while inserting user'});
                }
                console.log(result.ops);
                axios.post('http://localhost:3000/recommendation/users', result.ops)
                    .then(res => console.log(res.data))
                    .catch(err => console.error(err.data));
                return done(null, result, {message: 'Created in Successfully'});
            });
        })
    }
));


passport.use('login', new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password',
    },
    (name, password, done) => {

        db.collection('users').findOne({name}, (err, user) => {
            log.info('login strategy db', {user});
            if (err) {
                return done(null, false, {message: 'Error occurred'});
            }
            if (!user) {
                log.warn('login strategy', 'user not found');
                return done(null, false, {message: 'User not found'});
            }
            if (user.password !== password) {
                log.warn('login strategy', 'Incorrect password');
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, user, {message: 'Logged in Successfully'});
        })
    }
));


passport.use(new JwtStrategy({
        secretOrKey: 'secret',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (jwt_payload, done) => {
        try {
            log.info('JWT strategy', jwt_payload);
            return done(null, jwt_payload);
        } catch (e) {
            log.error('JWT strategy', e);
            return done(null, false, {message: e});
        }
    }
));

let app = express();

app.use(cors(corsOptions));

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/verify', passport.authenticate('jwt', {session: false}), (req, res) => {
        res.send('User with name ' + req.headers + ' is verified!');
    }
);

//test routes
app.post('/add', async (req, res) => {
    try {
        let user = await db.collection('users').insertOne(req.body.user);
        res.send({
            massage: 'DONE',
            user
        })
    } catch (e) {
        log.error('add route', e);
        res.status(500).send(e);
    }
});

app.get('/getall', async (req, res) => {
    try {
        let users = await db.collection('users').find().toArray();
        res.send({
            massage: 'DONE',
            users
        })
    } catch (e) {
        log.error('get all', e);
        res.status(500).send(e);
    }
});


//Handle errors
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({error: err});
});

module.exports = app;
