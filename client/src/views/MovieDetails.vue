<template>
    <v-container fluid pa-0 class="movie-details-container">

        <v-progress-linear :indeterminate="true" height="2" v-if="is_loading" class="ma-0"></v-progress-linear>


        <v-layout row wrap v-if="!is_loading" >
            <v-flex class="backdrop" offset-lg1 offset-xl2 xs12 sm12 md12 lg10 xl8>
                <backdrop :movie="movie"/>
            </v-flex>
        </v-layout>
        <description v-if="!is_loading" :movie="movie" :recomm_id="recomm_id"/>
        <similar v-if="!is_loading" :id="id"/>
    </v-container>
</template>

<script>
    import {getMovieById} from "@/api/movies";
    import Backdrop from "../components/MovieDetails/Backdrop";
    import Description from "../components/MovieDetails/Description";
    import Similar from "../components/MovieDetails/Similar";
    import TopPicks from "../components/Home/TopPicks";
    import BtnPrim from "../components/Base/BtnPrim";
    import logger from '@/interactions_logger'

    import {callInteraction} from "../api/recommender";

    const Stopwatch = require('timer-stopwatch');

    const timer = new Stopwatch({refreshRateMS:1000});

    timer.start();

    export default {
        name: "MovieDetails",
        components: {BtnPrim, TopPicks, Similar, Description, Backdrop},
        props: ['id', 'recomm_id'],
        data: () => ({
            movie: null,
            is_loading: true,
            is_loading_credits: true,
            directors: [],
            cast: [],
            price: 0,
        }),
        methods: {
            async requestMovie() {
                try {
                    let response = await getMovieById(this.id);
                    this.movie = response.data[0]._fields[0].properties;
                } catch (e) {
                    console.error(e);
                } finally {
                    this.is_loading = false;
                }
            },
            getDuration(){
                //console.log(((timer.ms / 1000).toFixed(0)));
                return (timer.ms / 1000).toFixed(0);
            },
            detailView() {
                callInteraction('detailview' ,{
                    user_id : this.$store.getters.user.id,
                    item_id : this.id,
                    recomm_id : this.recomm_id,
                    duration : this.getDuration(),
                })
                    .then(res => logger('detail view', res.data))
                    .catch(err => console.log(err.data));
            }
        },
        mounted() {
            this.requestMovie();
        },
        beforeDestroy() {
            this.detailView()
        },
        computed: {}
    }
</script>

<style scoped lang="scss">
    .movie-details-container {
        position: relative;
        .backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
        }
    }
    .movie-details-poster {
        //min-width: 300px;
        border-radius: 5px;
        filter: sepia(0.3) grayscale(0.1) brightness(0.7);
    }
    .backdrop {
        position: absolute;
        top: 0;
        left: 0;
        height: 100px;
    }

</style>