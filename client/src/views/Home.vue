<template>
  <v-container fluid pa-0>
    <navigation-bar/>
    <v-container fluid>
      <v-flex xs12>
        <h1 class="white--text">
          {{user.name}}
        </h1>
      </v-flex>
      <v-flex>
        <v-btn color="info" to="/login">login</v-btn>
        <v-btn color="error" to="/recomms">recomms</v-btn>
      </v-flex>
      <items-container />
    </v-container>
  </v-container>

</template>

<script>
  import ItemsContainer from '../components/ItemsContainer'
  import NavigationBar from "../components/Base/NavigationBar";

  export default {
    components: {
        NavigationBar,
        ItemsContainer
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
