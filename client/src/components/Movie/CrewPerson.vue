<template>
    <div class="crew-person">
        <v-avatar>
            <img
                    :src="'https://image.tmdb.org/t/p/original' + movie.profile_path"
                    alt="person.name"
            >
        </v-avatar>
        <span>{{person.name}}</span>
    </div>
</template>

<script>
    export default {
        name: "CrewPerson",
        props: ['person']
    }
</script>

<style scoped>

</style>