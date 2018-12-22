import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import MovieDetails from './views/MovieDetails.vue'

//import store from '@/store';

Vue.use(Router)

/*function requireAuth(to, from ,next) {
    if (store.state.getUser) {
        next();
    } else {
        next('/login');
    }
}*/

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            //beforeEnter: requireAuth,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/movie/:id',
            name: 'movie',
            component: MovieDetails,
            props: { default: true, sidebar: false }
        },
    ]
})
