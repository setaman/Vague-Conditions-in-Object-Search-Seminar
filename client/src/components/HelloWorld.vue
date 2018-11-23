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

        <v-btn @click="sendReq">
          send
        </v-btn>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import send from '@/api';

  export default {
    data: () => ({
    }),
      methods: {
        sendReq() {
            send();
        }
      }
  }
</script>

<style>

</style>
