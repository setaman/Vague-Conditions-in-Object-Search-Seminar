<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-btn color="#0062ff" large outline light block @click="getTest">
          Get Items
        </v-btn>
      </v-flex>

      <v-flex sx12>
        <item v-for="(item, i) in items" :key="i" :item="item"></item>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import {getItems} from '@/api';
  import Item from "./Item";

  export default {
      components: {Item},
      data: () => ({
        items: [],
          c: '#2d3490',
    }),
      methods: {
          getTest() {
              getItems()
                  .then((response) => {
                      this.items = [];
                      this.items.push(...response.data);
                      console.warn(this.items);
                  })
                  .catch(console.error);
          },
      }
  }
</script>

<style>

</style>
