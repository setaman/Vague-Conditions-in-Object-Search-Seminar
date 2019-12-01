<template>
  <v-container fluid pa-0>
    <navigation-bar></navigation-bar>
    <router-view/>
    <foot></foot>
  </v-container>

</template>

<script>
  import NavigationBar from "../components/Base/NavigationBar";
  import Foot from "../components/Foot";

  export default {
    components: {
      Foot,
      NavigationBar
    }
  }
</script>
