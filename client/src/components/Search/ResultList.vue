<template>
    <v-layout wrap row>
        <movie-section-header header="Search result"/>
        <v-flex xs12 style="padding: 100px">
            <movie-item-horizontal v-for="(movie, n) in movies" :key="n" :movie="movie"/>
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
                return this.$store.getters.movies.splice(0, 20);
            }
        }
    }
</script>

<style scoped>

</style>