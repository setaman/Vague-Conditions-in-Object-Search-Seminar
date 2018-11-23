import axios from 'axios';

export default function send (){
    return axios('http://localhost:3000/users/1234/email').then(console.log);
}
