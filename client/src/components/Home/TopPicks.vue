<template>
    <v-layout row wrap class="toppicks-container">
        <v-flex xs12>
            <section-header :header="'Top picks for you ' + user"/>
        </v-flex>
        {{recommendedMovies()}}
    </v-layout>

</template>

<script>
    import {getRecommendedItems} from "@/api/recommender";
    import {getMovies} from "@/api/movies";
    import SectionHeader from "./SectionHeader";

    export default {
        name: "TopPicks",
        components: {SectionHeader},
        methods: {
            async recommendedMovies() {
                let recommended = await getRecommendedItems(this.$store.getters.user.id);
                console.log(recommended.recomms);
                return recommended.recomms;
            }
        },
        computed: {
            user() {
                return this.$store.getters.user.name;
            }
        }
    }
</script>

<style scoped>

</style>