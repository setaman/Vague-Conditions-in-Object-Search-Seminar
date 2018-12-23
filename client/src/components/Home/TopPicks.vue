<template>
    <v-layout row wrap class="toppicks-container">
        <v-flex xs12 mt-4>
            <section-header :header="'Top picks for you ' + user"/>
            <v-progress-linear
                    v-if="is_loading"
                    height="2"
                    :indeterminate="true"
            ></v-progress-linear>
        </v-flex>
        <v-flex xs12>
            <movies-list-container>
                <movie-item-horizontal v-for="(movie, i) in recommended" :key="i" :movie="movie" :recomm_id="recomm_id"/>
            </movies-list-container>
        </v-flex>
    </v-layout>

</template>

<script>
    import {getRecommendedItems} from "@/api/recommender";
    import {search, getMovieById} from "@/api/movies";
    import SectionHeader from "@/components/Home/SectionHeader";
    import MovieItemHorizontal from "@/components/Movie/MovieItemHorizontal";
    import MoviesListContainer from "../Movie/MoviesListContainer";

    export default {
        name: "TopPicks",
        components: {MoviesListContainer, MovieItemHorizontal, SectionHeader},
        data:()=>({
           recommended_movies: [],
            is_loading: false,
            recomm_id: false,
        }),
        methods: {
            async recommendItemsToUser() {
                this.is_loading = true;
                try {
                    let recommended = await getRecommendedItems(this.$store.getters.user.id, 50);

                    let promises = recommended.data.map(movie => getMovieById(movie.id));
                    let result = await Promise.all(promises);

                    this.recomm_id = recommended.data[0].recomm_id;

                    this.recommended_movies.push(...result.map(res => {
                        if(res.data.length>0) return {...res.data[0]._fields[0].properties, recomm_id: recommended.data[0].recomm_id};
                    }));

                } catch (e) {
                    console.log(e);
                } finally {
                    this.is_loading = false;
                }

            }
        },
        mounted() {
          this.recommendItemsToUser();
        },
        computed: {
            user() {
                return this.$store.getters.user.name;
            },
            recommended() {
                return this.recommended_movies;
            }
        }
    }
</script>

<style scoped>

</style>