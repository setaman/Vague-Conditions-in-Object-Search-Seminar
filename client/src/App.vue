<template>
  <v-app >
    <navigation-bar v-if="user"/>
    <v-content>
      <router-view/>
    </v-content>
    <foot/>
  </v-app>
</template>

<script>

import NavigationBar from "./components/Base/NavigationBar";
import Foot from "./components/Foot";
export default {
  name: 'App',
    components: {Foot, NavigationBar},
    data: ()=>({}),
  computed:{
    user() {
      return this.$store.getters.user.name;
    }
  }
}
</script>
<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Quicksand:400,500,700');
  @import url('https://fonts.googleapis.com/css?family=Montserrat');

  $color: #030227;

  #app {
    font-family: 'Quicksand', sans-serif;
    //background: linear-gradient(to right, #141e30, #18263a);
    background-color: #141e30;
      .v-btn.v-btn--outline {
          border: 2px solid!important;
      }
  }
  .v-select-list .v-list {
    background-color: rgba(255, 255, 255, 0.15) !important;
  }
  .theme--dark.v-text-field--box .v-input__slot {
    background: hsla(0,0%,100%,.12);;
  }
  .v-overlay:before {
    background-color: white !important;
  }
</style>

