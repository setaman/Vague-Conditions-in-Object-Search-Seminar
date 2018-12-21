<template>
    <v-layout row wrap justify-center class="search-container">
        <v-flex xs12 sm8 md6 class="search-container-flex">
            <v-card
                    color="#122133"
                    dark
                    class="pa-3 elevation-7"
            >
                <v-form>
                    <v-flex xs12>
                        <v-autocomplete
                                v-model="selected_movie"
                                :loading="is_loading"
                                :items="movies"
                                :search-input.sync="title"
                                box
                                chips
                                color="blue"
                                label="Select"
                                item-text="title"
                                item-value="title"
                                clearable
                                :hide-details="true"
                                hide-selected
                                lable="Search movies"
                                multiple
                                dark
                        >
                            <template
                                    slot="selection"
                                    slot-scope="data"
                            >
                                <v-chip
                                        :selected="data.selected"
                                        close
                                        class="chip--select-multi"
                                        @input="remove(data.item)"
                                >
                                    <v-avatar>
                                        <img :src="data.item.poster">
                                    </v-avatar>
                                    {{ data.item.title }}
                                </v-chip>
                            </template>
                            <template
                                    slot="item"
                                    slot-scope="data"
                            >
                                <template>
                                    <v-list-tile-avatar>
                                        <img :src="data.item.poster">
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
                                        <v-list-tile-sub-title v-html="data.item.date"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </template>
                            </template>
                            <template slot="no-data">
                                <v-list-tile>
                                    <v-list-tile-title>
                                        Search for your favorite
                                        <strong>Movie</strong>
                                    </v-list-tile-title>
                                </v-list-tile>
                            </template>
                        </v-autocomplete>
                        <!-- {{selected_movie}}
                         MOVIES: {{movies}}-->
                    </v-flex>
                </v-form>
            </v-card>

            <div>

            </div>
        </v-flex>

    </v-layout>
</template>

<script>
    import {search} from '@/api/movies';

    export default {
        name: "SearchInput",
        data: () => ({
            selected_movie: [],
            is_loading: false,
            title: '',
            movies: [],
        }),

        watch: {
            title(t) {
                if (t && t.length > 2 /*&& t !== this.title*/) {
                    this.is_loading = true;
                    search(t)
                        .then(res => {
                            this.movies = res.data.map(movie => ({
                                title: movie._fields[0].properties.original_title,
                                poster: 'https://image.tmdb.org/t/p/original' + movie._fields[0].properties.poster_path,
                                date: movie._fields[0].properties.release_date,
                            }));
                            this.$store.dispatch('setMovies', res.data.map(movie => movie._fields[0].properties));
                        })
                        .catch(e => console.log(e))
                        .finally(() => this.is_loading = false);
                }
            },
        },
        methods: {
            remove(item) {
                const index = this.selected_movie.indexOf(item.title);
                if (index >= 0) this.selected_movie.splice(index, 1)
            },
        }
    }
</script>

<style scoped>
    .search-container {
        position: relative;
    }
    .search-container-flex{
        position: absolute;
        top: -100px;
        width: 100%;
    }

</style>