import axios from 'axios';

function rateItem (user_id, stars){
    return axios('http://localhost:3000/recommendation/rating', {
        rating: stars,
        user_id: user_id,
    });
}

function getTest (){
    return axios('http://localhost:3000/test');
}

function getItems (){
    return axios('http://localhost:3000/recommendation/items');
}

function login (credentials){
    return axios.post('http://localhost:3001/users/login', {
        name: credentials.name,
        password: credentials.password
    });
}

export {rateItem, getTest, getItems, login};
