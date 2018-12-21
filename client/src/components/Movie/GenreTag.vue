<template>
    <span class="genre-tag elevation-1">
        {{tag}}
    </span>
</template>

<script>
    export default {
        name: "GenreTag",
        props:['tag']
    }
</script>

<style scoped lang="scss">
    .genre-tag {
        font-size: 0.8rem;
        display: inline-block;
        height: auto;
        padding: 0px 5px;
        font-weight: bold;
        border-radius: 5px;
        color: white;
        margin: 2px;
        background: #25527e;
    }

</style>