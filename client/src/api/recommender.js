import axios from 'axios';

export function getItems (){
    return axios('http://localhost:3000/recommendation/items');
}

export function getRecommendedItems (user_id, scenario, relevance, count, diversity){
    return axios('http://localhost:3000/recommendation/', {
        query: {
            user_id,
            scenario,
            count,
            diversity
        }
    });
}

export function login (credentials){
    return axios.post('http://localhost:3001/users/login', {
        name: credentials.name,
        password: credentials.password
    });
}

export function signup (credentials){
    return axios.post('http://localhost:3001/users/signup', {
        name: credentials.name,
        password: credentials.password
    });
}


/**
 * INTERACTION
 * */
export function callInteraction(action, {user_id, item_id, rating}) {
    return axios.post(`http://localhost:3000/recommendation/${action}`, {
        user_id,
        item_id,
        rating,
    });
}