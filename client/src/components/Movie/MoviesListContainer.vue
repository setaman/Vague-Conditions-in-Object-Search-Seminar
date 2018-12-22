<template>
    <div class=" movies-list-container pa-3">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "MoviesListContainer"
    }
</script>

<style scoped>
    .movies-list-container {
        display: flex;
        justify-content: space-around;
        width: 100%;
        flex-wrap: wrap;
        flex-basis: 185px;
    }
</style>