const credentials = require('../creds');
const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(credentials.neo4j_user, credentials.neo4j_pass));
const session = driver.session();

module.exports.addMovie = (req, res) => {
    const movie = req.body;
    session
        .run(`CREATE (m:Movie $props) RETURN m.title LIMIT 1`, {props: movie})
        .then(result => {
            res.status(200).type('application/json').send({movie_added: result.records[0]._fields[0]});
        })
        .catch((err) => {
            console.error(err);
            res.status(500).type('application/json').send({err, movie});
        })
        .finally(() => session.close())
};

module.exports.searchMovies = (req, res) => {
    session
        .run('MATCH (movie:Movie) \
                WHERE movie.title =~ {title} OR movie.original_title =~ {title}  \
                RETURN movie',
            {title: '(?i).*' + req.query.title + '.*'})
        .then(result => {
            res.status(200).type('application/json').send(result.records);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).type('application/json').send({err});
        })
        .finally(() => session.close())
};

module.exports.getMovieById = (req, res) => {
    session
        .run('MATCH (movie:Movie) \
                WHERE movie.uuid = {id} RETURN movie',
            {id: req.params.uuid})
        .then(result => {
            res.status(200).type('application/json').send(result.records);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).type('application/json').send({err});
        })
        .finally(() => session.close())
};