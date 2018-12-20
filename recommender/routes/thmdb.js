var express = require('express');
var router = express.Router();
let neo4j = require('../lib/neo4j');
const axios  = require('axios');

const key = require('../creds').tmdb_key;

router.get('/:id/directors', async (req, res) => {
  console.log(req.params.id);
  try {
    let credits = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${key}`);
    res.status(200).json(credits.data);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/search', (req, res) => {
  neo4j.searchMovies(req, res);
});

router.post('/', (req, res) =>{
  neo4j.addMovie(req, res);
});

module.exports = router;
