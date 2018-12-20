<template>
    <div class="crew-person">
        <v-avatar size="35px">
            <img
                    :src="'https://image.tmdb.org/t/p/original' + person.profile_path || '/pG5LiannuUgZQLAd47iOnRkMIEC.jpg'"
                    :alt="person.name"
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
            p(){
                console.log('PERSON', this.person);
                return this.person;
            }
        }
    }
</script>

<style scoped lang="scss">
    .crew-person {
        margin-right: 3px;
        max-width: 100px;
        height: 70px;
        text-align: center;
        display: inline-block;
    }
    .crew-person-name {
        font-size: 0.9rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

</style>