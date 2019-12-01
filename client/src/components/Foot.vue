<template>
    <footer id="footer" class="elevation-0">
        <v-layout row wrap>
            <v-flex xs12 class="text-xs-center">
                <section-header header="Powered by"/>
            </v-flex>

            <v-flex xs12 sm6 class="pa-3 text-xs-center d-flex align-center">
                <a class="logo" target="_blank" href="https://www.recombee.com/">
                    <img src="@/assets/recombee.svg">
                </a>
            </v-flex>
            <v-flex xs12 sm6 class="pa-3 text-xs-center">
                <a class="logo" target="_blank" href="https://www.themoviedb.org/">
                    <img src="@/assets/tmdb_powered.svg">
                </a>
            </v-flex>
        </v-layout>
    </footer>
</template>

<script>
    import SectionHeader from "./Home/SectionHeader";
    export default {
        name: "Foot",
        components: {SectionHeader}
    }
</script>

<style scoped lang="scss">
    #footer {
        padding: 150px 0;
        position: relative;
        z-index: 5;
        background: #18263a;
        margin-top: 100px;
    }
    .logo {
        text-align: center;
        img {
            width: 100%;
            max-width: 200px;
            max-height: 80px;
        }
    }
</style>