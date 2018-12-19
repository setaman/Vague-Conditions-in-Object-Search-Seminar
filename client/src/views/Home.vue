<template>
  <v-container fluid pa-0>
    <popular/>
    <search-input/>
  </v-container>

</template>

<script>
  import SearchInput from "../components/Search/SearchInput";
  import Popular from "../components/Home/Popular";

  export default {
    components: {
      Popular,
      SearchInput,
    },
      data: ()=>({

      }),
      computed: {
        user() {
            return this.$store.state.user;
        }
      }
  }
</script>
