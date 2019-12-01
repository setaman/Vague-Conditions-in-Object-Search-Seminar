<template>
    <v-container fluid class="pa-0">
        <popular/>
        <search-input/>
        <result-list v-if="movies.length > 0"/>
        <top-picks/>
    </v-container>

</template>
import SearchInput from "../components/Search/SearchInput";
import Popular from "../components/Home/Popular";
import ResultList from "../components/Search/ResultList";
import TopPicks from "../components/Home/TopPicks";

<script>
    import TopPicks from "../components/Home/TopPicks";
    import ResultList from "../components/Search/ResultList";
    import Popular from "../components/Home/Popular";
    import SearchInput from "../components/Search/SearchInput";

    export default {
        name: "Start",
        components: {
            TopPicks,
            ResultList,
            Popular,
            SearchInput,
        },
        data: ()=>({

        }),
        computed: {
            user() {
                return this.$store.state.user;
            },
            movies() {
                return this.$store.getters.movies;
            },
        }
    }
</script>

<style scoped>

</style>