<template>
    <v-flex xs12>
        <h1 class="movie-section-header">{{header}} <span class="highlight">{{highlight}}</span></h1>
    </v-flex>
</template>

<script>
    export default {
        name: "SectionHeader",
        data :()=>({

        }),
        props: {
            header: {
                type: String,
                required : true
            },
            highlight: {
                type: String,
                required : true
            }
        }
    }
</script>

<style scoped lang="scss">
    .movie-section-header {
        font-size: 1.3rem;
        font-family: 'Montserrat', sans-serif !important;
        letter-spacing: 0.3rem;
        color: white;
        text-transform: uppercase;
        padding: 16px;
        position: relative;
        z-index: 2;
        .highlight {
            color: #98c8ff;
        }
    }
</style>