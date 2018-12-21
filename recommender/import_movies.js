const fs = require('fs');
const axios = require('axios');
const movies = JSON.parse(fs.readFileSync('./movies/neo4j.json'));
const movies_recombee = JSON.parse(fs.readFileSync('./movies/recombee.json'));
const log = require('./logger');

let promises = movies.map(movie => axios.post('http://localhost:3000/movies', movie));

Promise.all(promises)
    .then(res => console.log('ADDED', res.response.data))
    .catch(error => console.error('IMPORT PROMISES', error.response.data));

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

axios.post('http://localhost:3000/recommendation/items/properties', properties)
    .then(() => {
       log.info('Recommender add properties', 'Properties added!');
       console.log(movies_recombee[128]);
       axios.post('http://localhost:3000/recommendation/items', [movies_recombee[128], movies_recombee[1], movies_recombee[2]])
           .then(() => log.info('Recommender', 'Items added!'))
           .catch((error) => {
               log.error('Recommender add items', 'Some error occurred');
               console.log('Error', error.response.data);
           });
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
        uuid: movie.uuid,
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
