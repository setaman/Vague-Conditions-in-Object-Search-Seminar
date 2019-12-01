const fs = require('fs');
const axios = require('axios');
const movies = JSON.parse(fs.readFileSync('./movies/neo4j.json'));
const movies_recombee_chunks = JSON.parse(fs.readFileSync('./movies/recombee_100_chunks_v2.json'));
const log = require('./logger');

let addedToNeo4jCount = 0;
let addedToRecommbeCount = 0;

const initNeo4j = async () => {
    const { data } = await axios.get('http://localhost:3000/movies/count');
    const moviesInNeo4jCount = (data && data[0] && data[0]._fields[0].low) || 0;

    if (moviesInNeo4jCount > 0) {
        log.info('import', `${moviesInNeo4jCount} Movies already in neo4j`);
        return;
    }

    let promises = movies.map(movie => axios.post('http://localhost:3000/movies', movie)
        .then(res =>  {
            log.info('neo4j import', `Added ${res.data}`);
            addedToNeo4jCount += 1;
        })
        .catch(error => log.error('neo4j import', `Failed to add`))
    );

    await Promise.all(promises);
    log.info('neo4j import', `Added ${addedToNeo4jCount} From ${movies.length}`)
};

const initRecombee = async () => {
    let properties = [
        {adult: 'boolean'},
        {belongs_to_collection: 'string'},
        {budget: 'int'},
        {revenue: 'int'},
        {runtime: 'int'},
        {vote_count: 'int'},
        {genres: 'string'},
        {production_companies: 'string'},
        {production_countries: 'string'},
        {spoken_languages: 'string'},
        {original_language: 'string'},
        {original_title: 'string'},
        {overview: 'string'},
        {popularity: 'double'},
        {vote_average: 'double'},
        {status: 'string'},
        {tagline: 'string'},
        {title: 'string'},
        {release_date: 'string'},
    ];

    try {
        await axios.post('http://localhost:3000/recommendation/items/properties', properties);

        let promises = movies_recombee_chunks.map(moviesChunk => axios.post('http://localhost:3000/recommendation/items', moviesChunk)
            .then(() => {
                log.info('recombee import', `Movies chunk added`);
                addedToRecommbeCount += moviesChunk.length;
            })
            .catch((error) => {
                log.error('recombee import', `failed ad chunk`);
                console.log('Error', error);
            }));
        await Promise.all(promises);
        log.info('recombee import', `Added ${addedToNeo4jCount} From ${movies_recombee_chunks.length}`)
    } catch (e) {
        log.error('recombee import', e.toString());
    }
};

initNeo4j();
// initRecombee();
