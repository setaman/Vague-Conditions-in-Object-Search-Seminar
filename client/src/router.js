import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Start from './views/Start.vue'
import MovieDetails from './views/MovieDetails.vue'

//import store from '@/store';

Vue.use(Router);

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
            redirect: {
                name: 'start'
            },
            children: [
                {
                    path: '/start',
                    name: 'start',
                    component: Start,
                },
                {
                    path: '/movie/:id',
                    name: 'movie',
                    component: MovieDetails,
                    //props: true,
                    props(route) {
                        return  {...route.query || {}, ...route.params}
                    }
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        }
    ]
})
