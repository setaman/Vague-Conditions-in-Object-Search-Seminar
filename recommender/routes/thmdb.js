var express = require('express');
var router = express.Router();
const axios = require('axios');

const key = require('../creds').tmdb_key;

router.get('/:id/credits', async (req, res) => {
    let response = null;
    try {
        response = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${key}`);
        res.status(200).json(response.data);
    } catch (e) {
        console.log(`ERROR`, e);
        res.status(500).send(e.data);
    }
});

module.exports = router;
