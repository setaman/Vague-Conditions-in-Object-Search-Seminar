<template>
    <v-layout wrap row>
        <section-header header="Search result"/>
        <v-flex xs12>
            <div class=" movies-list pa-3">
                <movie-item-horizontal v-for="(movie, n) in movies" :key="n" :movie="movie"/>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import SectionHeader from "@/components/Home/SectionHeader";
    import MovieItemHorizontal from "@/components/Movie/MovieItemHorizontal";

    export default {
        name: "ResultList",
        components: {MovieItemHorizontal, SectionHeader},
        computed: {
            movies() {
                return this.$store.getters.movies.slice(0, 24);
            }
        }
    }
</script>

<style scoped lang="scss">
    .movies-list {
        display: flex;
        justify-content: space-around;
        width: 100%;
        flex-wrap: wrap;
        flex-basis: 185px;
    }
</style>