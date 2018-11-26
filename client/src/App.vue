<template>
  <v-app>
    <v-content>
      <router-link to="/login">login</router-link>
      <router-link to="/recomms">recomms</router-link>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
