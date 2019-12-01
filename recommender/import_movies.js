const fs = require('fs');
const axios = require('axios');
const movies = JSON.parse(fs.readFileSync('./movies/neo4j.json'));
const movies_recombee = JSON.parse(fs.readFileSync('./movies/recombee_100_chunks_v2.json'));
const log = require('./logger');

/*let promises = movies.map(movie => axios.post('http://localhost:3000/movies', movie));

Promise.all(promises)
    .then(res => console.log('ADDED', res.data))
    .catch(error => console.error('IMPORT PROMISES', error.response.data));*/

/*let count = 0;
let m_100s = [];
let temp = [];

for (let i = 0; i < movies_recombee.length; i++) {
    if (++count === 100) {
        m_100s.push(temp);
        count = 0;
        temp = [];
    }
    temp.push(movies_recombee[i]);
}

m_100s.push(movies_recombee.slice(3700, 3720));*/



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

let recombee_promises = movies_recombee.map(movie_100s => axios.post('http://localhost:3000/recommendation/items', movie_100s));

axios.post('http://localhost:3000/recommendation/items/properties', properties)
    .then(() => {
       log.info('Recommender add properties', 'Properties added!');
        Promise.all(recombee_promises)
            .then(res => console.log('ADDED ITEMS', res.response.data))
            .catch(error => console.error('FAILED', error.response.data));
    })
    .catch((error) => {
        log.error('Recommender', 'Some error occurred');
        console.log('Error', error.response.data);
    });


/*
const getGenres = movie => `${movie.genres.map(genre => genre.name).join(', ')}`;

const getCompanies = movie => `${movie.production_companies.map(company => company.name).join(', ')}`;

const getCountries = movie => `${movie.production_countries.map(country => country.name).join(', ')}`;

const getLanguages = movie => `${movie.spoken_languages.map(lang => lang.name).join(', ')}`;

const getCollection = movie => movie.belongs_to_collection ? movie.belongs_to_collection.name : '';

let sanitized_movies = movies_recombee.map(movie => {
    let m = {
        tmdb_id: movie.tmdb_id,
        adult: movie.adult,
        budget: movie.budget,
        revenue: movie.revenue,
        runtime: movie.runtime,
        vote_count: movie.vote_count,
        original_language: movie.original_language,
        original_title: movie.original_title,
        overview: movie.overview,
        popularity: movie.popularity,
        vote_average: movie.vote_average,
        status: movie.status,
        tagline: movie.tagline,
        title: movie.title,
        release_date: movie.release_date,

        genres: getGenres(movie),
        production_companies: getCompanies(movie),
        production_countries: getCountries(movie),
        spoken_languages : getLanguages(movie),
        belongs_to_collection: getCollection(movie),
    };

    //console.log(m);

    return m;
});
*/

/*fs.writeFile(`./movies/recombee_100_chunks_v2.json`, JSON.stringify(m_100s), 'utf8', (err, data) => {
    if (err) console.log('ERROR while writing', err);
    else console.log('WRITE successful');
});*/

