var express = require('express');
var router = express.Router();
let neo4j = require('../lib/neo4j');

router.get('/', (req, res, next) => {
  neo4j.getTest(req, res);
});

router.get('/search', (req, res, next) => {
  neo4j.searchMovies(req, res);
});

router.post('/', (req, res, next) =>{
  neo4j.addMovies(req, res);
});

module.exports = router;
