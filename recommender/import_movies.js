const fs = require('fs');
const axios = require('axios');
const movies = JSON.parse(fs.readFileSync('movies/movies.json'));
const log = require('./logger');

const getGenres = movie => `${movie.genres.map(genre => genre.name).join(', ')}`;

const getCompanies = movie => `${movie.production_companies.map(company => company.name).join(', ')}`;

const getCountries = movie => `${movie.production_countries.map(country => country.name).join(', ')}`;

const getLanguages = movie => `${movie.spoken_languages.map(lang => lang.name).join(', ')}`;

const getCollection = movie => movie.belongs_to_collection ? movie.belongs_to_collection.name : '';

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

let sanitized_movies = movies.map(movie => {
    let m = {
        id: movie.id,
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

axios.post('http://localhost:3000/recommendation/items/properties', properties)
    .then(() => {
       log.info('Recommender add properties', 'Properties added!');
       axios.post('http://localhost:3000/recommendation/items', [sanitized_movies[0], sanitized_movies[1], sanitized_movies[2]])
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