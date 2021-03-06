<template>
    <v-layout row wrap>
        <v-flex offset-md1 offset-lg2 offset-xl2 xs12 sm12 md10 lg8 xl8 class="desc-container">

            <v-layout row wrap>
                <v-flex xs12 sm4 md3 mb-5 >

                    <div class="desc-poster elevation-20">
                        <v-img
                                class="movie-details-poster"
                                :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path"
                        >
                        </v-img>

                        <div class="popularity">
                            <vue-ellipse-progress :progress="popularityProgress()" :size="35"
                                                  color="white"
                                                  :thickeness="2"
                                                  empty-color="black"
                                                  empty-color-fill="rgba(0, 0, 0, 0.38)"
                                                  :animation="{
                                        type: 'rs',
                                        duration: 500,
                                        delay: 500
                                      }"
                                                  font-color="white"
                                                  :legend-value="parseFloat(movie.vote_average.toFixed(1))"/>
                        </div>

                        <div class="bookmark">
                            <v-btn icon large flat color="error" @click="bookmark()">
                                <v-icon medium color="error">
                                    {{favorite ? 'favorite' : 'favorite_border'}}
                                </v-icon>
                            </v-btn>
                        </div>
                    </div>

                    <div class="text-xs-center mt-2">
                        <v-rating color="yellow" medium v-model="rating" @input="rate()"></v-rating>
                    </div>

                </v-flex>
                <v-flex xs12 sm8 md8 pt-2 pl-4>

                        <span class="price">
                            {{price}}$
                        </span>
                    <h1 class="movie-title">
                        {{movie.title}}
                    </h1>

                    <p class="movie-overview mb-1">{{movie.tagline}}</p>

                    <genre-tag :tag="movie.release_date.slice(0,4)"/>
                    <genre-tag :tag="movie.original_language.toUpperCase()"/>


                    <v-divider class="mb-4"></v-divider>

                    <p class="movie-overview">{{movie.overview}}</p>

                    <v-progress-linear :indeterminate="true" height="2" v-if="is_loading" class="ma-0"></v-progress-linear>

                    <v-layout row wrap v-else>
                        <v-flex xs2>
                            <h3 class="movie-group-header mb-1">
                                director
                            </h3>
                            <crew-person v-for="(person, i) in directors" :key="i" :person="person"/>
                        </v-flex>
                        <v-flex xs10>
                            <h3 class="movie-group-header mb-1">
                                cast
                            </h3>
                            <crew-person v-for="(person, i) in cast" :key="i" :person="person"/>
                        </v-flex>

                        <v-flex xs10>
                            <h3 class="movie-group-header mb-1">
                                genres
                            </h3>
                            <genre-tag v-for="(genre, i) in movie.genres.slice(0, 100)" :key="i" :tag="genre"/>

                        </v-flex>

                    </v-layout>

                    <v-layout row wrap>
                        <v-flex xs6 mt-3>
                            <v-btn round :disabled="purchased" :color="purchased ? 'success' : 'primary'" block @click="purchase">
                                by for {{price}}$
                            </v-btn>
                        </v-flex>

                    </v-layout>

                </v-flex>
            </v-layout>

        </v-flex>

        <v-dialog
                v-model="purchase_successful"
                width="500"
        >

            <v-card>
                <v-card-title
                        class="headline green accent-2"
                        primary-title
                >
                    Thank you
                </v-card-title>

                <v-card-text>
                    <h2>
                        {{purchase_response}}
                    </h2>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="primary"
                            flat
                            @click="purchase_successful = false"
                    >
                        OK
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-layout>
</template>

<script>
    import {getCredits} from "@/api/movies";
    import {callInteraction} from "../../api/recommender";
    import GenreTag from "@/components/Movie/GenreTag";
    import CrewPerson from "@/components/Movie/CrewPerson";
    import PopularityCircle from "../Base/PopularityCircle";
    import logger from '@/interactions_logger'

    export default {
        name: "Description",
        components: {PopularityCircle, CrewPerson, GenreTag},
        props: ['movie', 'recomm_id'],
        data:()=>({
            is_loading: true,
            directors: [],
            cast: [],
            price: 0,
            rating: null,
            favorite: false,
            purchase_successful: false,
            purchased: false,
            purchase_response: '',
        }),
        methods: {
            popularityProgress() {
                return parseFloat((this.movie.vote_average * 100 / 10).toFixed(1));
            },
            async getCast() {
                try {
                    let res = await getCredits(this.movie.tmdb_id);
                    if (res.data) {
                        this.directors = res.data.crew.filter(person => person.job === 'Director');
                        this.cast = res.data.cast.slice(0,5);
                    }
                }catch (e) {
                    console.error(e);
                } finally {
                    this.is_loading = false;
                }
            },
            generatePrise() {
                this.price = (Math.random() * (20 - 1) + 1).toFixed(2);
            },
            bookmark() {
                if (this.favorite) {
                    this.removeBookmark();
                } else {
                    callInteraction('bookmark', {
                        user_id: this.$store.getters.user.id,
                        item_id: this.movie.tmdb_id,
                        recomm_id: this.recomm_id
                    })
                        .then(res => logger('bookmark',res.data))
                        .catch(e => console.log(e));
                }
                this.favorite = !this.favorite;
            },
            removeBookmark() {
                callInteraction('removebookmark', {user_id: this.$store.getters.user.id, item_id: this.movie.tmdb_id})
                    .then(res => logger('removed bookmark',res.data))
                    .catch(e => console.log(e));
            },
            rate() {
                callInteraction('rating',{
                    user_id: this.$store.getters.user.id,
                    item_id: this.movie.tmdb_id,
                    rating: this.rating,
                    recomm_id : this.recomm_id,
                })
                    .then(res => logger('rating',res.data))
                    .catch(err => console.error(err.data));
            },
            purchase() {
                callInteraction('purchase', {
                    user_id: this.$store.getters.user.id,
                    item_id: this.movie.tmdb_id,
                    recomm_id: this.recomm_id,
                    price: this.price,
                    profit: this.price,
                })
                    .then(res => {
                        this.purchase_successful = true;
                        this.purchased = true;
                        this.purchase_response = res.data;
                        logger('purchase',res.data)
                    })
                    .catch(e => console.error(e.data));
            }
        },
        mounted() {
            this.generatePrise();
            this.getCast();
        }
    }
</script>

<style scoped lang="scss">
    .desc-container {
        margin-top: 20%;
        position: relative;
    }

    .movie-details-poster {
        //min-width: 300px;
        border-radius: 5px;
        filter: sepia(0.3) grayscale(0.1) brightness(0.7);
    }

    .movie-title{
        font-family: 'Montserrat', sans-serif !important;
        color: white;
        letter-spacing: 0.3rem;
    }

    .movie-tagline {
        font-family: 'Montserrat', sans-serif !important;
        color: #c3c3c3;
        letter-spacing: 0.2rem;
        font-size: 1.2rem;
    }

    .movie-overview{
        color: #c3c3c3;
        letter-spacing: 0.2rem;
    }

    .movie-group-header {
        font-family: 'Montserrat', sans-serif !important;
        font-weight: bold;
        font-size: 0.7rem;
        letter-spacing: 0.1rem;
        text-transform: uppercase;
        color: #9e9e9e;
    }

    .price {
        display: inline-block;
        padding: 0 10px 0 25px;
        background: rgba(188, 121, 45, 0.71);
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
        position: absolute;
        top: 0;
        right: 0;
        clip-path: polygon(19% 0, 100% 0%, 100% 100%, 0% 100%);
    }

    .desc-poster {
        position: relative;
    }

    .bookmark {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2
    }

    .popularity {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 2;
    }

</style>