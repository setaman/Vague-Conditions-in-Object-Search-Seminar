<template>
  <v-container fluid pa-0>
    <popular/>
    <search-input/>
    <result-list v-if="movies.length > 0"/>
    <top-picks/>
  </v-container>

</template>

<script>
  import SearchInput from "../components/Search/SearchInput";
  import Popular from "../components/Home/Popular";
  import ResultList from "../components/Search/ResultList";
  import TopPicks from "../components/Home/TopPicks";
  import Foot from "../components/Foot";

  export default {
    components: {
      Foot,
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
