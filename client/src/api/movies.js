import axios from 'axios';

export function search (title){
    console.log(title);
    return axios.get('http://localhost:3000/movies/search', {params :{title: title}});
}

export function getPopular (){
    return axios('http://localhost:3000/movies/', {query: title});
}

export function getMovieById (id){
    return axios('http://localhost:3000/movies/:id', {query: title});
}