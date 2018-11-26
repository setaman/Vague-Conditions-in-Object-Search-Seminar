import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '@/api';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            name: localStorage.getItem("name"),
            id: localStorage.getItem("id"),
            token: localStorage.getItem("jwtToken"),
        }
    },
    getters: {
        isLoggedIn: state => !!localStorage.getItem("jwtToken")
    },
    mutations: {
        login: (state, user) => state.user = user
    },
    actions: {
        login({commit}, credentials) {
            return login(credentials)
                .then(response => {
                    commit('login', response.data);
                    console.log(response);
                    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
                    localStorage.setItem("jwtToken", response.data.token);
                    localStorage.setItem("name", response.data.name);
                    localStorage.setItem("id", response.data.id);
                })
                .catch(console.error);
        }
    }
})
