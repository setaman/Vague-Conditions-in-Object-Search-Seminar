<template>
    <div class="info-container" :class="{'info-container-expanded': expanded}">
        <transition name="fade">
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
                    <v-progress-linear :indeterminate="true" height="2" v-if="is_loading" class="ma-0"></v-progress-linear>
                    <crew-person v-for="(person, i) in cast" :key="i" :person="person"/>
                </v-flex>
                <v-flex xs12>
                    <h3 class="movie-group-header mb-1">
                        genres
                    </h3>
                    <genre-tag v-for="(genre, i) in movie.genres.slice(0, 5)" :key="i" :tag="genre"/>
                </v-flex>
                <v-flex xs12 class="movie-controls mt-3">
                    <v-layout>
                        <v-flex xs6 pa-1>
                            <v-btn target="_blank" :to="{ name: 'movie', params: { id: this.movie.uuid}}" round outline color="primary" block>
                                more details
                            </v-btn>
                        </v-flex>
                        <v-flex xs6 pa-1>
                            <v-btn round color="primary" block>
                                by for {{price}}$
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </div>
        </transition>
        {{wasExpanded}}
    </div>
</template>

<script>
    import {getCredits} from "@/api/movies";
    import CrewPerson from "./CrewPerson";
    import GenreTag from "./GenreTag";

    export default {
        name: "MovieInfo",
        components: {GenreTag, CrewPerson},
        data: () => ({
            directors: [],
            cast: [],
            is_loading: false,
        }),
        props: ['movie', 'expanded', 'price'],
        methods: {
            async getCast() {
                this.is_loading = true;
                try {
                    let res = await getCredits(this.movie.tmdb_id);
                    if (res.data) {
                        //this.directors = res.data.crew.filter(person => person.job === 'Director');
                        this.cast = res.data.cast.slice(0, 4);
                    }
                }catch (e) {
                    console.log(e);
                } finally {
                    this.is_loading = false;
                }
            }
        },
        mounted() {
        },
        destroyed() {
        },
        computed: {
           wasExpanded(){
               if (this.expanded && this.cast.length < 1) {
                   console.log('LOAD');
                   this.getCast();
               }
               return '';
           }
        }
    }
</script>

<style scoped lang="scss">
    .info-container {
        overflow: hidden;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        //background-color: #d7d7d7;
        display: inline-block;
        position: relative;
        opacity: 0;
        transition: 0.3s;
        &.info-container-expanded{
            transition: 0.7s;
            opacity: 1;
        }
    }

    .movie-title {
        font-family: 'Montserrat', sans-serif !important;
        font-weight: bold;
        font-size: 1.2rem;
        letter-spacing: 0.1rem;
        color: white;
    }

    .movie-year {
        display: inline-block;
        padding: 0 5px;
        border-radius: 3px;
        font-weight: bold;
        color: white;
        background-color: #0b456f;
        font-size: 0.8rem;
    }

    .movie-group-header {
        font-family: 'Montserrat', sans-serif !important;
        font-weight: bold;
        font-size: 0.7rem;
        letter-spacing: 0.1rem;
        text-transform: uppercase;
        color: #9e9e9e;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>