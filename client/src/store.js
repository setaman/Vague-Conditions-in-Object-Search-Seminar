import Vue from 'vue'
import Vuex from 'vuex'
import { login, signup } from '@/api/recommender';
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
        relevance: 'medium',
        diversity: 0.5,
    },
    getters: {
        isLoggedIn: () => !!localStorage.getItem("jwtToken"),
        user: (state) => state.user,
        movies: (state) => state.movies,
        expanded_card: (state) => state.expanded_card,
        relevance: (state) => state.relevance,
        diversity: (state) => state.diversity,
    },

    mutations: {
        login: (state, user) => state.user = user,
        logout: (state) => state.user = {},
        setMovies: (state, movies) => state.movies = movies,
        setExpandedCard: (state, index) => state.expanded_card = index,
        setRelevance: (state, relevance) => state.relevance = relevance,
        setDiversity: (state, diversity) => state.diversity = diversity,
    },
    actions: {
        login({commit}, credentials) {
            return login(credentials)
                .then(response => {
                    commit('login', response.data);
                    console.log(response.data);
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
        logout({commit}) {
            commit('logout');
            localStorage.setItem("jwtToken", '');
            localStorage.setItem("name", '');
            localStorage.setItem("id", '');
        },
        async signup({dispatch, commit}, credentials) {
            try {
                let response = await signup(credentials);
                console.log(response.data);
                return dispatch('login', credentials);
            } catch (error) {
                console.error(error);
                throw error
            }
        },

        setMovies({commit}, movies) {
            commit('setMovies', movies);
        },
        setRelevance({commit}, relevance) {
            commit('setRelevance', relevance);
        },
        setDiversity({commit}, diversity) {
            commit('setDiversity', diversity);
        },
        setExpandedCard({commit}, index) {
            commit('setExpandedCard', index);
        }
    }
})
