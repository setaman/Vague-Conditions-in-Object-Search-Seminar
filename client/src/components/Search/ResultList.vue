<template>
    <v-layout wrap row>
        <movie-section-header header="Search result"/>
        <v-flex xs12 >
            <div class="horizontal-sroll">
                <movie-item-horizontal v-for="(movie, n) in movies" :key="n" :movie="movie"/>
            </div>
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

<style scoped lang="scss">
    .horizontal-sroll {
        width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        &::-webkit-scrollbar {
            display: none;
        }
    }

</style>