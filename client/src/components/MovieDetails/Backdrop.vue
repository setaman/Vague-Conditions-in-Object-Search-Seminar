<template>
    <div class="backdrop-container">
        <v-img
                class="backdrop-poster"
                height="500"
                src="https://image.tmdb.org/t/p/original/aJn9XeesqsrSLKcHfHP4u5985hn.jpg"
        >
        </v-img>
        <!--<div class="xs12 popular-gradient-overlay">
        </div>-->
        <div class="xs12 overlay overlay-left">
        </div>
        <div class="xs12 overlay deck-left">
        </div>
        <div class="xs12 overlay overlay-bottom">
        </div>
        <div class="xs12 overlay deck-bottom">
        </div>
        <div class="xs12 overlay overlay-right">
        </div>
        <div class="xs12 overlay deck-right">
        </div>
    </div>
</template>

<script>
    export default {
        name: "Backdrop",
        props:['movie'],
        data:()=>({
            poster: ':src="\'https://image.tmdb.org/t/p/w185\' + movie.backdrop_path"'
        }),
    }
</script>

<style scoped lang="scss">
    .backdrop-container {
        position: relative;
        width: 100%;
        height: 500px;
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
        position: absolute;
        //background: radial-gradient(ellipse at center, rgba(63,76,107,0) 0%,rgba(62,75,106,0) 1%,rgba(24,34,54,1) 66%,rgba(20,30,48,1) 73%);
        //background: radial-gradient(rgba(229,229,229,0), rgba(20,30,48,1));
        //background-color: #141e30;
    }

    .overlay-left {
        left: 20px;
        height: 100%;
        width: 150px;
        top: 0;
        background-image: linear-gradient(to left, rgba(229,229,229,0) 0%,rgba(24,38,58,0.5) 50%,rgba(24,38,58,0.51) 51%,rgba(20,30,48,1) 100%);
    }

    .overlay-right {
        right: 20px;
        height: 100%;
        width: 150px;
        top: 0;
        background-image: linear-gradient(to right, rgba(229,229,229,0) 0%,rgba(24,38,58,0.5) 50%,rgba(24,38,58,0.51) 51%,rgba(20,30,48,1) 100%);
    }

    .overlay-bottom {
        left: 0;
        height: 150px;
        width: 100%;
        bottom: 20px;
        background-image: linear-gradient(to bottom, rgba(229,229,229,0) 0%,rgba(24,38,58,0.5) 50%,rgba(24,38,58,0.51) 51%,rgba(20,30,48,1) 100%);
    }

    .deck-left {
        left: 0;
        height: 100%;
        width: 20px;
        top: 0;
        background-color: rgba(20,30,48,1);
    }

    .deck-right {
        right: 0;
        height: 100%;
        width: 20px;
        top: 0;
        background-color: rgba(20,30,48,1);
    }

    .deck-bottom {
        left: 0;
        height: 20px;
        width: 100%;
        bottom: 0;
        background-color: rgba(20,30,48,1);
    }

    .backdrop-poster {
        transition: 0.5s;
        filter: sepia(0.5) grayscale(0.3) brightness(0.7);
    }

</style>