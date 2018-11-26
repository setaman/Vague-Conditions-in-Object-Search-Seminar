<template>
  <v-container fluid>
    <v-flex xs12>
      {{user.name}}
    </v-flex>
    <HelloWorld />
  </v-container>
</template>

<script>
  import HelloWorld from '../components/ItemsContainer'

  export default {
    components: {
      HelloWorld
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
