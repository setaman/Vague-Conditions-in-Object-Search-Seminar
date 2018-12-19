<template>
  <v-app>
    <navigation-bar/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

import NavigationBar from "./components/Base/NavigationBar";
export default {
  name: 'App',
    components: {NavigationBar},
    data () {
    return {
      //
    }
  }
}
</script>
<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Quicksand:400,500,700');
  @import url('https://fonts.googleapis.com/css?family=Montserrat');

  #app {
    font-family: 'Quicksand', sans-serif;
    //background: linear-gradient(to right, #141e30, #18263a);
    background-color: #141e30;
      .v-btn.v-btn--outline {
          border: 2px solid!important;
      }
  }
</style>

