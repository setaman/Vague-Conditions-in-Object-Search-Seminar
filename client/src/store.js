import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '@/api';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {}
    },
    getters: {
        isLoggedIn: state => !!localStorage.getItem("jwt")
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
                })
                .catch(console.error);
        }
    }
})
