import axios from 'axios';

function send (){
    return axios('http://localhost:3000/users/1234/email').then(console.log);
}

function getTest (){
    return axios('http://localhost:3000/test');
}

export {send, getTest};
