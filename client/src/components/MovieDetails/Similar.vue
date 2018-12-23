<template>
    <v-layout row wrap class="similar-movies">
        <v-flex xs12 mt-4>
            <section-header header="Maybe also interesting for you"/>
            <v-progress-linear
                    v-if="is_loading"
                    height="2"
                    :indeterminate="true"
            ></v-progress-linear>
        </v-flex>
        <v-flex xs12>
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

    export default {
        name: "Similar",
        components: {SectionHeader, MovieItemHorizontal, MoviesListContainer},
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
                    let recommended = await getItemsToItem(this.id, this.$store.getters.user.id, 48, 'homepage', 'medium', 0.3);

                    let promises = recommended.data.map(movie => getMovieById(movie.id));
                    let result = await Promise.all(promises);

                    this.recomm_id = recommended.data[0].recomm_id;

                    this.recommended_movies.push(...result.map(res => {
                        if(res.data.length>0) return {...res.data[0]._fields[0].properties, recomm_id: recommended.data[0].recomm_id};
                    }));

                } catch (e) {
                    console.log(e);
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
            }
        }
    }
</script>

<style scoped>

</style>