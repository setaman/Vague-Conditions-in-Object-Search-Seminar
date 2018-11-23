<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-icon>
          edit
        </v-icon>

        <v-btn block @click="getTest">
          Get neo4j data
        </v-btn>
      </v-flex>

      <v-flex sx12>
        <ul>
          <li v-for="(item, i) in neo" :key="i">
              {{item._fields[0].properties.name || 'name'}}
          </li>
        </ul>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import {send, getTest} from '@/api';

  export default {
    data: () => ({
        neo: [],
    }),
      methods: {
          getTest() {
              getTest()
                  .then((response) => {
                      this.neo = [];
                      this.neo.push(...response.data);
                      console.log('NEO: ', this.neo);
                  })
                  .catch(console.error);
          },
      }
  }
</script>

<style>

</style>
