<template>
    <v-layout wrap row>
        <movie-section-header header="Search result"/>
        <v-flex xs12>
            <movie-item-horizontal v-for="(movie, i) in movies" :key="i" :movie="movie"/>
        </v-flex>
    </v-layout>

</template>

<script>
    import MovieSectionHeader from "../Home/MovieSectionHeader";
    import MovieItemHorizontal from "../Base/MovieItemHorizontal";
    export default {
        name: "ResultList",
        components: {MovieItemHorizontal, MovieSectionHeader},
        computed: {
            movies(){
                return this.$store.getters.movies.slice(0, 20);
            }
        }
    }
</script>

<style scoped>

</style>