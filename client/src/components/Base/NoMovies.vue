<template>
    <div class="no-movies elevation-5">
        <h1>
            {{text}}
        </h1>
    </div>
</template>

<script>
    export default {
        name: "NoMovies",
        props: ['text']
    }
</script>

<style scoped>
    .no-movies {
        margin: 50px 0;
        font-size: 1.5rem;
        height: auto;
        padding: 50px 50px;
        text-align: center;
        font-weight: bold;
        border-radius: 5px;
        color: gray;
        background-color: #141e30;
    }

</style>