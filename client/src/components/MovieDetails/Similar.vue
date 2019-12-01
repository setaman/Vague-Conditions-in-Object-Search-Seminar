<template>
    <v-layout row wrap class="similar-movies">
        <v-flex xs12 mt-4>
            <section-header header="Maybe also interesting for you"/>
            {{recommendationProperties}}
            <v-progress-linear
                    v-if="is_loading"
                    height="2"
                    :indeterminate="true"
            ></v-progress-linear>
        </v-flex>
        <v-flex xs12 sm12 md6 offset-xs0 offset-sm0 offset-md3
                v-if="recommended.length === 0 && !is_loading">
            <no-movies text="Sorry, no movies to recommend"/>
        </v-flex>
        <v-flex xs12 v-else>
            <movies-list-container>
               <movie-item-horizontal v-for="(movie, i) in recommended" :key="i" :movie="movie" :recomm_id="recomm_id"/>
            </movies-list-container>
        </v-flex>
    </v-layout>
</template>

<script>
    import MoviesListContainer from "../Movie/MoviesListContainer";
    import MovieItemHorizontal from "../Movie/MovieItemHorizontal";
    import SectionHeader from "../Home/SectionHeader";
    import {getItemsToItem} from "@/api/recommender";
    import {getMovieById} from "../../api/movies";
    import NoMovies from "../Base/NoMovies";

    export default {
        name: "Similar",
        components: {NoMovies, SectionHeader, MovieItemHorizontal, MoviesListContainer},
        props:['id'],
        data:()=>({
            recommended_movies: [],
            is_loading: false,
            recomm_id: null,
        }),
        methods: {
            async similarMovies() {
                this.is_loading = true;
                try {
                    let recommended = await getItemsToItem(this.id, this.$store.getters.user.id, 48, 'homepage', this.relevance, this.diversity);

                    if (!recommended.data.length > 0) {
                        this.recommended_movies = [];
                        return;
                    }

                    let promises = recommended.data.map(movie => getMovieById(movie.id));
                    let moviesFromNeo4j = await Promise.all(promises);

                    this.recomm_id = recommended.data[0].recomm_id;

                    this.recommended_movies = [];

                    this.recommended_movies.push(...moviesFromNeo4j.map(res => {
                        if(res.data.length > 0) {
                            return {
                                ...res.data[0]._fields[0].properties,
                                recomm_id: recommended.data[0].recomm_id
                            };
                        }
                    }));

                } catch (e) {
                    console.error(e);
                } finally {
                    this.is_loading = false;
                }

            }
        },
        mounted() {
            this.similarMovies();
        },
        computed: {
            recommended() {
                return this.recommended_movies;
            },
            recommendationProperties() {
                this.similarMovies();
                return '';
            },
            diversity() {
                return this.$store.getters.diversity;
            },
            relevance() {
                return this.$store.getters.relevance;
            }
        }
    }
</script>

<style scoped>

</style>