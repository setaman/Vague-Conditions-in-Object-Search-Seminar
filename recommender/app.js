let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');
let app = express();


let corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
};
app.use(cors());

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/fill', usersRouter);

app.use('/recommendation', usersRouter);

app.use('/like', usersRouter);

app.use('/view', usersRouter);

app.use('/purchase', usersRouter);



module.exports = app;
