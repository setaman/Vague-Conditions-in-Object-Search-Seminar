<template>
    <v-container fluid pa-0 class="movie-details-container">

        <v-progress-linear :indeterminate="true" height="2" v-if="is_loading" class="ma-0"></v-progress-linear>

        <v-layout row wrap v-else>
            <v-flex offset-lg1 offset-xl2 xs12 sm12 md12 lg10 xl8>
                <backdrop :movie="movie"/>

            </v-flex>
            <v-flex xs12>
                movie id: {{movie ? movie.uuid : 'LOADING'}}

                <h1 class="info">IDDDD: {{id}}</h1>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {getMovieById} from "@/api/movies";
    import Backdrop from "../components/MovieDetails/Backdrop";

    export default {
        name: "MovieDetails",
        components: {Backdrop},
        props: ['id'],
        data: () => ({
            movie: null,
            is_loading: true
        }),
        methods: {
            async requestMovie() {
                console.log('1');
                try {
                    console.log('2');

                    let response = await getMovieById(this.id);
                    console.log('3');

                    this.movie = response.data[0]._fields[0].properties;
                    console.log(response.data[0]._fields[0].properties);
                } catch (e) {
                    console.log(e);
                } finally {
                    this.is_loading = false;
                }
            }
        },
        mounted() {
            console.log('MOUNTED');
            //setTimeout(this.requestMovie, 1000);
            this.requestMovie();
        },
        beforeDestroy() {
            console.log('DESTORY');
        },
        computed: {
            /*movie() {
                return this.movie
            }*/
        }
    }
</script>

<style scoped lang="scss">
    .movie-details-container {
        position: relative;
    }
    .backdrop {
        position: absolute;
        top: 0;
        left: 0;
        height: 100px;
    }

</style>