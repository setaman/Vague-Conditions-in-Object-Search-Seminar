<template>
    <v-toolbar dark color="#122133" fixed app id="navbar">

        <v-toolbar-title class="white--text">
            <!--<router-link color="primary" class="filmix" to="/">FILMIX</router-link>-->
            <v-btn color="primary" large flat @click="toHome">
                FILMIX
            </v-btn>

        </v-toolbar-title>


        <v-spacer></v-spacer>

        <v-btn to="/login" icon flat color="info" @click="logout">
            <v-icon color="primary">person</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
    export default {
        name: "NavigationBar",
        methods: {
            logout() {
                //this.$router.push({ name: 'login'});
                this.$store.dispatch('logout').then(()=>{});
            },
            toHome() {
                this.$router.push({name: 'home'})
            }
        }
    }
</script>

<style scoped lang="scss">
    #navbar{
        z-index: 100;

        a.filmix {
            text-decoration: none;
            color: white;
            transition: 0.3s;
            &:hover {
                color: #00B7FF;
            }
        }
    }

</style>