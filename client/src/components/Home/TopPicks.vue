<template>
    <v-layout row wrap class="toppicks-container">
        <v-flex xs12>
            <section-header :header="'Top picks for you ' + user"/>
        </v-flex>
        <h3 v-for="movie in recommended">{{movie.title}}</h3>
    </v-layout>

</template>

<script>
    import {getRecommendedItems} from "@/api/recommender";
    import {getMovies} from "@/api/movies";
    import SectionHeader from "./SectionHeader";

    export default {
        name: "TopPicks",
        components: {SectionHeader},
        data:()=>({
           recommended_movies: [],
        }),
        methods: {
            async recommendedMovies() {
                let recommended = await getRecommendedItems(this.$store.getters.user.id);
                this.recommended_movies.push(...recommended.data);
                console.log(recommended.data);
                return 'hui';
            }
        },
        mounted() {
          this.recommendedMovies();
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