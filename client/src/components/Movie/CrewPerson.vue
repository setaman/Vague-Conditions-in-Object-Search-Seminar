<template>
    <div class="crew-person">
        <v-avatar size="35px">
            <img
                    v-if="img"
                    :src="'https://image.tmdb.org/t/p/original' + person.profile_path"
            >
            <img
                    v-else
                    src="@/assets/logo.svg"
            >
        </v-avatar>
        <h4 class="crew-person-name">{{person.name}}</h4>
    </div>
</template>

<script>
    export default {
        name: "CrewPerson",
        props: ['person'],
        computed: {
            img() {
                return this.person.profile_path;
            }
        }
    }
</script>

<style scoped lang="scss">
    .crew-person {
        margin-right: 3px;
        max-width: 99px;
        height: 70px;
        text-align: center;
        display: inline-block;
    }
    .crew-person-name {
        font-size: 0.9rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: white;
    }

</style>