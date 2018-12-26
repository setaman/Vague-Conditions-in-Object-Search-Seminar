var express = require('express');
var router = express.Router();
let neo4j = require('../lib/neo4j');

router.get('/id/:tmdb', (req, res) => {
  neo4j.getMovieById(req, res);
});

router.get('/search/', (req, res) => {
  neo4j.searchMovies(req, res);
});

router.post('/', (req, res) =>{
  neo4j.addMovie(req, res);
});

router.post('/bookmark', (req, res) =>{
  neo4j.addBookmarkRelation(req, res);
});

router.get('/bookmark', (req, res) =>{
  neo4j.getBookmarkRelation(req, res);
});

router.delete('/bookmark', (req, res) =>{
  neo4j.addMovie(req, res);
});

module.exports = router;
