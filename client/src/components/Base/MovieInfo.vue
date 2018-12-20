<template>
    <div class="info-container elevation-5 pa-3">
        <div v-if="expanded" class="info-content">
            <v-flex xs12>
                <h1 class="movie-title">
                    {{movie.title}}
                </h1>
                <span class="movie-year">{{movie.release_date.slice(0,4)}}</span>
            </v-flex>
            <v-divider></v-divider>
            <v-flex xs12>
                <!--<h3 class="movie-group-header mt-2 mb-2">
                    Director
                </h3>
                <crew-person v-for="(person, i) in directors" :key="i" :person="person"/>-->
                <h3 class="movie-group-header mt-2 mb-2">
                    cast
                </h3>
                <crew-person v-for="(person, i) in cast" :key="i" :person="person"/>
                <h3 class="movie-group-header mt-2 mb-2">
                    genres
                </h3>

                {{movie.genres}}
            </v-flex>
        </div>
    </div>
</template>

<script>
    import {getCredits} from "@/api/movies";
    import CrewPerson from "../Movie/CrewPerson";
    import BtnPrim from "./BtnPrim";

    export default {
        name: "MovieInfo",
        components: {BtnPrim, CrewPerson},
        data: () => ({
            directors: [],
            cast: [],
        }),
        props: ['movie', 'expanded'],
        methods: {
            async director() {
                let res = await getCredits(this.movie.tmdb_id);
                this.directors = res.data.crew.filter(person => person.job === 'Director')
                this.cast = res.data.cast.slice(0, 3);
            }
        },
        mounted() {
            this.director();
        },
        computed: {}
    }
</script>

<style scoped lang="scss">
    .info-container {
        overflow: hidden;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        background-color: #d7d7d7;
        display: inline-block;
        position: relative;
    }

    .movie-title {
        font-family: 'Montserrat', sans-serif !important;
        font-weight: bold;
        font-size: 1.2rem;
        letter-spacing: 0.1rem;
    }

    .movie-year {
        font-weight: bold;
        font-size: 1rem;
    }

    .movie-group-header {
        font-family: 'Montserrat', sans-serif !important;
        font-weight: bold;
        font-size: 0.7rem;
        letter-spacing: 0.1rem;
        text-transform: uppercase;
        color: #343434;
    }

</style>