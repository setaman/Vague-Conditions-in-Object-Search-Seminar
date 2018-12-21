import Vue from 'vue'
import Vuex from 'vuex'
import { login, signup } from '@/api';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            name: localStorage.getItem("name"),
            id: localStorage.getItem("id"),
            token: localStorage.getItem("jwtToken"),
        },
        movies: [],
        expanded_card: '',
    },
    getters: {
        isLoggedIn: () => !!localStorage.getItem("jwtToken"),
        movies: (state) => state.movies,
        expanded_card: (state) => state.expanded_card,
    },

    mutations: {
        login: (state, user) => state.user = user,
        setMovies: (state, movies) => state.movies = movies,
        setExpandedCard: (state, index) => state.expanded_card = index,
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
                .catch(error => {
                    console.error(error);
                    throw error;
                });
        },
        async signup({commit}, credentials) {
            try {
                let response = await signup(credentials);
                console.log(response.data);
                return commit('login', credentials)
            } catch (error) {
                console.error(error);
                throw error
            }
        },

        setMovies({commit}, movies) {
            commit('setMovies', movies);
        },
        setExpandedCard({commit}, index) {
            commit('setExpandedCard', index);
        }
    }
})
