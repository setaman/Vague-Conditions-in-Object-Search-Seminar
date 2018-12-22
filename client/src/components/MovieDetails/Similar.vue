<template>
    <v-layout row wrap class="similar-movies">
        <v-flex xs12 mt-4>
            <section-header header="Explore similar movies"/>
            <v-progress-linear
                    v-if="is_loading"
                    height="2"
                    :indeterminate="true"
            ></v-progress-linear>
        </v-flex>
        <v-flex xs12>
            <movies-list-container>
               <!-- <movie-item-horizontal v-for="(movie, i) in recommended" :key="i" :movie="movie"/>-->
            </movies-list-container>
        </v-flex>
    </v-layout>
</template>

<script>
    import MoviesListContainer from "../Movie/MoviesListContainer";
    import MovieItemHorizontal from "../Movie/MovieItemHorizontal";
    import SectionHeader from "../Home/SectionHeader";
    export default {
        name: "Similar",
        components: {SectionHeader, MovieItemHorizontal, MoviesListContainer},
        data:()=>({
            recommended_movies: [],
            is_loading: false,
        }),
        methods: {
            /*async similarMovies() {
                this.is_loading = true;
                try {
                    let recommended = await getRecommendedItems(this.$store.getters.user.id, 50);

                    let promises = recommended.data.map(movie => search(movie.title));
                    let result = await Promise.all(promises);

                    console.log(result[0].data[0]._fields[0].properties);
                    this.recommended_movies.push(...result.map(res => {
                        if(res.data.length>0) return res.data[0]._fields[0].properties;
                    }));
                } catch (e) {
                    console.log(e);
                } finally {
                    this.is_loading = false;
                }

            }*/
        },
        mounted() {
            //this.similarMovies();
        },
        computed: {
            user() {
                return this.$store.getters.user.name;
            },
            recommended() {
                return this.recommended_movies;
            }
        }
    }
</script>

<style scoped>

</style>