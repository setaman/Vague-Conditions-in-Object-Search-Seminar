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
  import {send, getTest, getItems} from '@/api';
  import Item from "./Item";

  export default {
      components: {Item},
      data: () => ({
        items: [],
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
