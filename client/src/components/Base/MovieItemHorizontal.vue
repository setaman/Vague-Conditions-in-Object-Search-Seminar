<template>
    <div class="movie">
        <div class="movie-info" :class="{'info-expanded': expand}">
            <movie-info :expanded="expand" :movie="movie"/>
        </div>
        <div class="movie-h-container elevation-5" :class="{expand: expand}">
            <v-img
                    class="movie-h-poster"
                    height="278"
                    :src="'https://image.tmdb.org/t/p/w185' + movie.poster_path"
            >
            </v-img>
            <span class="prise">
                12,05$
            </span>
            <div class="popularity">
                <popularity-circle :popularity="movie.vote_average.toFixed(1)"/>
            </div>
            <div class="bookmark">
                <v-btn icon flat color="error" @click="favorite = !favorite">
                    <v-icon color="error">
                        {{favorite ? 'favorite' : 'favorite_border'}}
                    </v-icon>
                </v-btn>
            </div>
            <div class="details">
                <v-btn icon color="white" @click="expand = !expand">
                    <v-icon color="blue">
                        {{expand ? 'chevron_left' : 'chevron_right'}}
                    </v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import PopularityCircle from "./PopularityCircle";
    import MovieInfo from "./MovieInfo";

    export default {
        name: "MovieItemHorizontal",
        components: {MovieInfo, PopularityCircle},
        props: ['movie'],
        data: ()=>({
            expand: false,
            favorite: false
        }),
        computed: {}
    }
</script>

<style scoped lang="scss">
    .movie {
        transition: 0.3s;
        display: inline-block;
        margin: 8px;
        width: 185px;
        position: relative;
        perspective: 1000px;
        &:hover {
            z-index: 5;
        }
    }
    .movie-h-container {
        transition: 0.3s;
        display: inline-block;
        width: 185px;
        border-radius: 5px;
        overflow: hidden;
        animation: movie 1s ease-in-out;
        cursor: pointer;
        position: relative;
        &:hover {
            .movie-h-poster {
                transform: scale(1.1);
            }
        }
        &.expand {
            z-index: 5;
            transform: scale(1.1) rotateY(30deg) translateX(-10px);
            perspective: 1000px;

            .movie-h-poster {
                filter: sepia(0.3) grayscale(0.2) brightness(0.9);
            }
        }

        .prise {
            display: inline-block;
            padding: 0 4px 0 15px;
            background: rgba(188, 121, 45, 0.71);
            color: white;
            font-weight: bold;
            position: absolute;
            top: 0;
            right: 0;
            clip-path: polygon(19% 0, 100% 0%, 100% 100%, 0% 100%);
        }

        .popularity {
            position: absolute;
            top: 10px;
            left: 10px;
        }
        .bookmark {
            position: absolute;
            bottom: 0px;
            left: 0px;
        }
        .details {
            opacity: 0.5;
            position: absolute;
            top: 42%;
            right: 2px;
        }
    }

    .movie-h-poster {
        transition: 0.5s;
        filter: sepia(0.5) grayscale(0.3) brightness(0.7);
    }

    .movie-info {
        transition: 0.5s;
        position: absolute;
        top: 0;
        left: 0;
        width: 185px;
        height: 278px;
        padding: 4px 0;
        &.info-expanded{
            width: 400px;
            z-index: 5;
            top: 0;
            left: 165px;
        }
    }

    @keyframes movie {
        0% {
            height: 0;
            opacity: 0;
            transform: scale(0);
        }
        0% {
            transform: scale(1);
            opacity: 1;
            height: 278px;
        }
    }

</style>