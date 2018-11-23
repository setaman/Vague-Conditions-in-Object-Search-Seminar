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
let neo4jRouter = require('./routes/neo4j');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/test', neo4jRouter);

app.use('/recommendation', neo4jRouter);

app.use('/like', neo4jRouter);

app.use('/view', neo4jRouter);

app.use('/purchase', neo4jRouter);



module.exports = app;
