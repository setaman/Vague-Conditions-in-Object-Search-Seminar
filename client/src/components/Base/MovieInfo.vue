<template>
    <div class="info-container elevation-5 pa-3">
        <v-flex xs12>
            <h1 class="movie-title">
                {{movie.title}}
            </h1>
            <span class="movie-year">{{movie.release_date.slice(0,4)}}</span>
        </v-flex>
        <v-divider></v-divider>
        <v-flex xs12>
            <h3 class="movie-group-header mt-2">
                Director
            </h3>
            <h3 class="movie-group-header mt-2">
                cast
            </h3>
        </v-flex>
    </div>
</template>

<script>
    import {getCredits} from "../../api/movies";

    export default {
        name: "MovieInfo",
        props: ['movie'],
        credits: [],
        methods: {
            credits () {
                getCredits(this.movie.tmdb_id)
                    .then(res => {
                        console.log(res.data);
                        this.credits = res.data;
                    })
                    .catch(e=>console.log(e));
            }
        },
        mounted() {
            this.credits();
        }
    }
</script>

<style scoped lang="scss">
    .info-container {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        background-color: #d7d7d7;
        display: inline-block;
        position: relative;
    }
    .movie-title{
        font-family: 'Montserrat', sans-serif !important;
        font-weight: bold;
        font-size: 1.2rem;
        letter-spacing: 0.1rem ;
    }
    .movie-year {
        font-weight: bold;
        font-size: 1rem;
    }
    .movie-group-header {
        font-family: 'Montserrat', sans-serif !important;
        font-weight: bold;
        font-size: 0.7rem;
        letter-spacing: 0.1rem ;
        text-transform: uppercase;
        color: #343434;
    }

</style>