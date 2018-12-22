import axios from 'axios';

export function search (title){
    return axios.get('http://localhost:3000/movies/search', {params :{title: title}});
}

/*export function getMovies (title){
    console.log(title);
    return axios.get('http://localhost:3000/movies/search', {params :{title: title}});
}*/

export function getPopular (){
    return axios('http://localhost:3000/movies/',);
}

export function getCredits (movie_id){
    return axios.get(`http://localhost:3000/thmdb/${movie_id}/credits`);
}

export function getMovieById (uuid){
    return axios('http://localhost:3000/movies/id/' + uuid);
}