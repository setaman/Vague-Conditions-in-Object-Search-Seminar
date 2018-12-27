import axios from 'axios';

export function getItems (){
    return axios('http://localhost:3000/recommendation/items');
}

export function getRecommendedItems (user_id, count = 10, scenario = 'homepage', relevance = 'low', diversity = 0.0){
    return axios.get('http://localhost:3000/recommendation/', {
        params: {
            user_id,
            scenario,
            count,
            diversity,
            relevance,
        }
    });
}

export function getItemsToItem (item_id, user_id, count = 10, scenario = 'homepage', relevance = 'low', diversity = 0.5){
    return axios.get('http://localhost:3000/recommendation/itemstoitem', {
        params: {
            item_id,
            user_id,
            scenario,
            count,
            diversity,
            relevance,
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
export function callInteraction(action, options) {
    console.log('OPTIONS', options);
    return axios.post(`http://localhost:3000/recommendation/${action}`, {...options});
}