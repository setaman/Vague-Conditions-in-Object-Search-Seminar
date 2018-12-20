<template>
    <div class="info-container elevation-5 pl-3 pb-3 pr-3 pt-2">
        <div v-if="expanded" class="info-content">
            <v-flex xs12>
                <h1 class="movie-title">
                    {{movie.title}}
                </h1>
                <span class="movie-year elevation-1 mb-1 mr-1">{{movie.release_date.slice(0,4)}}</span>
                <span class="movie-year elevation-1">{{movie.original_language.toUpperCase()}}</span>
            </v-flex>
            <v-divider></v-divider>
            <v-flex xs12>
                <h3 class="movie-group-header mt-2 mb-2">
                    cast
                </h3>
                <crew-person v-for="(person, i) in cast" :key="i" :person="person"/>
            </v-flex>
            <v-flex xs12>
                <h3 class="movie-group-header mb-1">
                    genres
                </h3>
                <genre-tag v-for="(genre, i) in movie.genres.slice(0, 5)" :key="i" :tag="genre"/>
            </v-flex>
            <v-flex xs12 class="movie-controls">
                <v-layout>
                    <v-flex xs6>
                        <button class="control-details">more details
                            <i class="material-icons">
                                arrow_forward_ios
                            </i>
                        </button>
                    </v-flex>
                    <v-flex xs6>
                        <button class="control-by">By for 12,50$
                            <i class="material-icons">
                                shopping_cart
                            </i>
                        </button>
                    </v-flex>
                </v-layout>
            </v-flex>
        </div>
    </div>
</template>

<script>
    import {getCredits} from "@/api/movies";
    import CrewPerson from "../Movie/CrewPerson";
    import BtnPrim from "./BtnPrim";
    import GenreTag from "../Movie/GenreTag";

    export default {
        name: "MovieInfo",
        components: {GenreTag, BtnPrim, CrewPerson},
        data: () => ({
            directors: [],
            cast: [],
        }),
        props: ['movie', 'expanded'],
        methods: {
            async director() {
                let res = await getCredits(this.movie.tmdb_id);
                this.directors = res.data.crew.filter(person => person.job === 'Director')
                this.cast = res.data.cast.slice(0, 4);
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
        display: inline-block;
        padding: 0 5px;
        border-radius: 3px;
        font-weight: bold;
        color: white;
        background-color: #68c1ff;
        font-size: 0.8rem;
    }

    .movie-group-header {
        font-family: 'Montserrat', sans-serif !important;
        font-weight: bold;
        font-size: 0.7rem;
        letter-spacing: 0.1rem;
        text-transform: uppercase;
        color: #343434;
    }

    .movie-controls {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        .control-by, .control-details {
            display: block;
            width: 100%;
            height: 40px;
            text-transform: uppercase;
            font-size: 1.1rem;
            font-weight: bold;
            border-top: 1px solid #c1c1c1;
        }

        .control-details{
            background: transparent;
            color: #3471ff;
            .material-icons {
                color: #3471ff;
            }
            &:hover {
                .material-icons {
                    top: 2px;
                }
            }
        }

        .control-by{
            border-left: 1px solid #c1c1c1;
            background-image: linear-gradient(to right top, #29d389, #00c798, #00baa3, #00ada7, #009fa6);
            color: white;
            &:hover {
                .material-icons {
                    top: 2px;
                }
            }
        }

        .material-icons{
            transition: 0.3s;
            position: relative;
            top: 40px;
            margin:auto;
            bottom: 0;
            right: -10px;
            font-size: 1.1rem;
            color: white;
        }

    }

</style>