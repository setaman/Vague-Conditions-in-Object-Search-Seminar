<template>
    <v-container fluid pa-0>
        <v-layout row wrap>
            <v-flex xs12>
                movie id: {{id}}

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "MovieDetails",
        props:['id']
    }
</script>

<style scoped>

</style>