var express = require('express');
var router = express.Router();
let neo4j = require('../lib/neo4j');

router.get('/', (req, res) => {
  neo4j.getTest(req, res);
});

router.get('/search', (req, res) => {
  neo4j.searchMovies(req, res);
});

router.post('/', (req, res) =>{
  neo4j.addMovie(req, res);
});

module.exports = router;
