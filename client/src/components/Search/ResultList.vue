<template>
    <v-layout wrap row>
        <section-header header="Search result"/>
        <v-flex xs12>
            <movies-list-container>
                <movie-item-horizontal v-for="(movie, n) in movies" :key="n" :movie="movie"/>
            </movies-list-container>
        </v-flex>
    </v-layout>
</template>

<script>
    import SectionHeader from "@/components/Home/SectionHeader";
    import MovieItemHorizontal from "@/components/Movie/MovieItemHorizontal";
    import MoviesListContainer from "../Movie/MoviesListContainer";

    export default {
        name: "ResultList",
        components: {MoviesListContainer, MovieItemHorizontal, SectionHeader},
        computed: {
            movies() {
                return this.$store.getters.movies.slice(0, 24);
            }
        }
    }
</script>

<style scoped lang="scss">
</style>