<template>
    <v-layout row wrap class="popular-container">
        <movie-section-header header="Popular"/>

        <v-flex xs12 sm6>
            <v-img
                    class="movie-poster"
                    height="400"
                    src="https://image.tmdb.org/t/p/original/aJn9XeesqsrSLKcHfHP4u5985hn.jpg"
            >
            </v-img>
        </v-flex>

        <v-flex xs12 sm6>
            <v-layout row wrap>
                <v-flex xs12 sm6>
                    <v-img
                            class="movie-poster"
                            height="200"
                            src="https://image.tmdb.org/t/p/original/6iUNJZymJBMXXriQyFZfLAKnjO6.jpg"
                    >
                    </v-img>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-img
                            class="movie-poster"
                            height="200"
                            src="https://image.tmdb.org/t/p/original/tZjVVIYXACV4IIIhXeIM59ytqwS.jpg"
                    >
                    </v-img>
                </v-flex>

                <v-flex xs12 sm6>
                    <v-img
                            class="movie-poster"
                            height="200"
                            src="https://image.tmdb.org/t/p/original/rFtsE7Lhlc2jRWF7SRAU0fvrveQ.jpg"
                    >
                    </v-img>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-img
                            class="movie-poster"
                            height="200"
                            src="https://image.tmdb.org/t/p/original/3QtzZ7FHHxWNeUZvXZfk3e3oxDm.jpg"
                    >
                    </v-img>
                </v-flex>

                <div class="xs12 popular-gradient-overlay">
                </div>
                <div class="xs12 overlay">
                </div>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    import MovieSectionHeader from "./MovieSectionHeader";
    export default {
        name: "Popular",
        components: {MovieSectionHeader}
    }
</script>

<style scoped lang="scss">
    .popular-container {
        position: relative;
    }

    .popular-gradient-overlay {
        width: 100%;
        position: absolute;
        bottom: 20px;
        left: 0;
        height: 150px;
        background-image: linear-gradient(to bottom, rgba(229,229,229,0) 0%,rgba(24,38,58,0.5) 50%,rgba(24,38,58,0.51) 51%,rgba(20,30,48,1) 100%);
    }

    .overlay {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 20px;
        background-color: #141e30;

    }

    .movie-poster {
        transition: 0.5s;
        filter: sepia(0.2) grayscale(0.1) brightness(0.7);
    }

</style>