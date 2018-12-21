<template>
  <v-container fluid pa-0>
    <popular/>
    <search-input/>
    <result-list/>
  </v-container>

</template>

<script>
  import SearchInput from "../components/Search/SearchInput";
  import Popular from "../components/Home/Popular";
  import ResultList from "../components/Search/ResultList";

  export default {
    components: {
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
      }
  }
</script>
