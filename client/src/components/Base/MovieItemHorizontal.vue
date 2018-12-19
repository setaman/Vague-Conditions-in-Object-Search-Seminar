<template>
    <div class="movie-h-container">
        <v-img
                class="movie-h-poster"
                height="278"
                :src="'https://image.tmdb.org/t/p/w185' + movie.poster_path"
        >
        </v-img>
    <popularity-circle :popularity="6.1"/>
    </div>
</template>

<script>
    import PopularityCircle from "./PopularityCircle";
    export default {
        name: "MovieItemHorizontal",
        components: {PopularityCircle},
        props: ['movie'],
    }
</script>

<style scoped lang="scss">
    .movie-h-container {
        display: inline-block;
        margin: 16px;
        width: 185px;
        border-radius: 5px;
        overflow: hidden;
        animation: item ease-in-out 10.5s 12;
        cursor: pointer;
        &:hover {
            .movie-h-poster {
                transform: scale(1.1);
            }
        }
    }

    .movie-h-poster {
        transition: 0.3s;
        filter: sepia(0.5) grayscale(0.3) brightness(0.7);
    }

    @keyframes item {
        0% {
            transform: scale(0);
        }
        0% {
            transform: scale(1);
        }
    }

</style>