let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');
const dotenv = require('dotenv');

if(!process.env.RECOMBEE_DB) {
    dotenv.config();
}

let app = express();

let recombee = require('./routes/recombee');


let corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

let indexRouter = require('./routes/index');
let neo4jRouter = require('./routes/neo4j');
let thmdb = require('./routes/thmdb');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/movies', neo4jRouter);
app.use('/recommendation', recombee);
app.use('/thmdb', thmdb);

module.exports = app;
