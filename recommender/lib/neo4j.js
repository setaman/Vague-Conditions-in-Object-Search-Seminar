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

module.exports.countMovies = (req, res) => {
    session
        .run('MATCH (n:Movie) RETURN count(n) as count')
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
    console.log(req.params.tmdb);
    session
        .run('MATCH (movie:Movie) \
                WHERE movie.tmdb_id = {id} RETURN movie',
            {id: parseInt(req.params.tmdb)})
        .then(result => {
            res.status(200).type('application/json').send(result.records);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).type('application/json').send({err});
        })
        .finally(() => session.close())
};

module.exports.addBookmarkRelation = (req, res) => {
    console.log(req.query.user_id);
    console.log(req.query.movie_id);
    session
        .run('MATCH (m:Movie {tmdb_id: {movie_id}}), (u:User {id : {user_id}}) MERGE (u)-[:BOOKMARK]->(m);',
            {movie_id: parseInt(req.query.movie_id), user_id: req.query.user_id})
        .then(result => {
            res.status(200).type('application/json').send(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).type('application/json').send({err});
        })
        .finally(() => session.close())
};

module.exports.getBookmarkRelation = (req, res) => {
    console.log(req.query.user_id);
    session
        .run('MATCH (u:User {id: {user_id}})-[:BOOKMARK]->(m:Movie) RETURN m;',
            {user_id: req.query.user_id})
        .then(result => {
            res.status(200).type('application/json').send(result.records);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).type('application/json').send({err});
        })
        .finally(() => session.close())
};

module.exports.deleteBookmarkRelation = (req, res) => {
    console.log(req.query.user_id);
    session
        .run('MATCH (u:User {id: {user_id}})-[r:BOOKMARK]->(m:Movie {tmdb_id: {movie_id}}) DELETE r;',
            {movie_id: parseInt(req.query.movie_id), user_id: req.query.user_id})
        .then(result => {
            res.status(200).type('application/json').send(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).type('application/json').send({err});
        })
        .finally(() => session.close())
};