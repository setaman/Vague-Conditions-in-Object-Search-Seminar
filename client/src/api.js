import axios from 'axios';

function rateItem (user_id, item_id, rating){
    return axios.post('http://localhost:3000/recommendation/rating', {
        rating,
        user_id,
        item_id,
    });
}

function getItems (){
    return axios('http://localhost:3000/recommendation/items');
}

function getRecommendedItems (user_id){
    return axios('http://localhost:3000/recommendation/recommendeditems', {
        params: {
            user_id
        }
    });
}

function login (credentials){
    return axios.post('http://localhost:3001/users/login', {
        name: credentials.name,
        password: credentials.password
    });
}

export {rateItem, getRecommendedItems, getItems, login};
