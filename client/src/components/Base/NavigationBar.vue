<template>
    <v-toolbar dark color="#122133" fixed app id="navbar">

        <v-toolbar-title class="white--text">
            <!--<router-link color="primary" class="filmix" to="/">FILMIX</router-link>-->
            <v-btn color="primary" large flat @click="toHome">
                FILMIX
            </v-btn>

        </v-toolbar-title>


        <v-spacer></v-spacer>

        <span class="mr-3">Relevance:</span>

        <v-btn-toggle color="info" v-model="relevance">
            <v-btn flat color="primary" value="high">
                high
            </v-btn>
            <v-btn color="primary" flat value="medium">
                medium
            </v-btn>
            <v-btn color="primary" flat value="low">
                low
            </v-btn>
        </v-btn-toggle>

        <v-spacer></v-spacer>

        <v-spacer></v-spacer>

        <span class="mr-2">Diversity:</span>
            <v-slider
                    ml-2
                    v-model="diversity"
                    thumb-label="always"
                    :thumb-size="24"
                    hide-details
                    :min="0.0"
                    :max="1.0"
                    :step="0.1"
            ></v-slider>

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
            },
            setRelevance(relevance = 'medium') {
                this.$store.dispatch('setRelevance', relevance);
            }
        },
        computed: {
            diversity: {
                get () {
                    return this.$store.getters.diversity;
                },
                set (val) {
                    this.$store.dispatch('setDiversity', val)
                }
            },
            relevance: {
                get () {
                    return this.$store.getters.relevance;
                },
                set (val) {
                    this.$store.dispatch('setRelevance', val)
                }
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

    /deep/ .v-slider__thumb-label {
        transform: translateY(100%) translateY(20px) translateX(-50%) rotate(225deg) !important;

        span {
            transform: rotate(135deg) !important;
        }
    }

    .theme--dark.v-btn-toggle {
        background-color: transparent;
    }

</style>