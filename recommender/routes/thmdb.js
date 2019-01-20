var express = require('express');
var router = express.Router();
let neo4j = require('../lib/neo4j');
const axios = require('axios');

const key = require('../creds').tmdb_key;

let count = 40;

router.get('/:id/credits', async (req, res) => {
    //count--;
    let response = null;
    try {
        /*if (count < 1) {
            console.log('TIME OUT');
            await wait10Sec();
        } else {
            response = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${key}`);
            res.status(200).json(response.data);
        }*/
        response = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${key}`);
        res.status(200).json(response.data);

    } catch (e) {
        console.log(`ERROR`, e);
        res.status(500).send(e.data);
    }
});

async function wait10Sec() {
    return new Promise(resolve => setTimeout(() => {
            count = 40;
            resolve(console.log('RESET TIMEOUT'))
        }, 10000)
    );
}

module.exports = router;
