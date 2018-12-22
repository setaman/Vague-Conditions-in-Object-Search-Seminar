var express = require('express');
var router = express.Router();
let neo4j = require('../lib/neo4j');
const axios  = require('axios');

const key = require('../creds').tmdb_key;

router.get('/:id/credits', async (req, res) => {
  console.log('CREDITS PARAMS',req.params.id);
  console.log('THMDB KEY', key);
  try {
    let credits = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${key}`);
    //console.log('CREDITS RES', credits.data.crew);
    res.status(200).send(credits.data);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
