import axios from 'axios';

function send (){
    return axios('http://localhost:3000/users/1234/email').then(console.log);
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

export {send, getTest, getItems, login};
