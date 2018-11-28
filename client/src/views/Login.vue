<template>
    <v-container fluid grid-list-xl class="login-container" fill-height>
        <v-layout row wrap justify-center align-center fill-height>
            <v-flex xs12 sm12 md8 lg8 xl6 class="elevation-10 card" pa-0>
                <loading-container :loading="loading">
                    <div class=" text-xs-center switcher-container d-flex column wrap justify-center align-center"
                         :class="switchAnimation">
                        <div class="switcher-content">
                            <fade-transition :value="signup_activated">
                                <h1 class="mb-3">{{!signup_activated ? login_text[0] : signup_text[0]}}</h1>
                                <p>{{!signup_activated ? login_text[1] : signup_text[1]}}</p>
                                <span class="ma-3">or</span>
                                <button class="mt-5" @click="signup_activated = !signup_activated">
                                    {{!signup_activated ? 'sign up' : 'login'}}
                                </button>
                            </fade-transition>
                        </div>
                    </div>
                    <signup-form v-on:signup="signup($event)"
                                 :active="signup_activated"/>

                    <login-form  v-on:login="login($event)"
                            :active="!signup_activated"/>
                </loading-container>
            </v-flex>
        </v-layout>

        <v-snackbar
                v-model="snackbar"
                bottom
                multi-line
        >

            <span v-if="snackbar_error" class="error--text">{{ snackbar_text }}</span>
            <span v-else class="error--text">{{ snackbar_text }}</span>
            <v-btn
                    color="error"
                    flat
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
    import FadeTransition from "../components/Transitions/FadeTransition";
    import LoadingContainer from "../components/Base/LoadingContainer";
    import LoginForm from "../components/Login/LoginForm";
    import SignupForm from "../components/Login/SignupForm";

    export default {
        name: "Login",
        components: {SignupForm, LoginForm, LoadingContainer, FadeTransition},
        data: () => ({
            loading: false,
            snackbar: '',
            snackbar_text: '',
            snackbar_error: false,

            signup_activated: false,

            login_text: ['Hello Again', 'Login with your data, click around and just see what happens'],
            signup_text: ['Add new user', 'Create new user, click around and just see what happens'],
        }),
        methods: {
            login(credentials) {
                this.loading = true;

                this.$store.dispatch('login', {name: credentials.name, password: credentials.password})
                    .then(() => {
                        setTimeout(() => {
                            this.$router.push('/');
                        }, 2000);
                    })
                    .catch((error) => {
                        console.error(error);
                        this.snackbar = true;
                        this.snackbar_error = true;
                        this.snackbar_text = 'Error, please check your password and name';
                    })
                    .finally(() => {
                        setTimeout(() => {
                            this.loading = false;
                        }, 2000);
                    })
            },
            signup(credentials) {
                this.loading = true;

                this.$store.dispatch('signup', {name: credentials.name, password: credentials.password})
                    .then(() => {
                        setTimeout(() => {
                            this.$router.push('/');
                        }, 2000);
                    })
                    .catch((error) => {
                        console.error(error);
                        this.snackbar = true;
                        this.snackbar_error = true;
                        this.snackbar_text = 'Error, please check your password and name';
                    })
                    .finally(() => {
                        setTimeout(() => {
                            this.loading = false;
                        }, 2000);
                    })
            }
        },
        computed: {
            switchAnimation() {
                if (this.signup_activated) {
                    return {
                        'signup-active': true
                    };
                }
                return {
                    'login-active': true
                };

            },
        }
    }
</script>

<style scoped lang="scss">
    .login-container {
        background-color: white;
        //background-image: linear-gradient(to right top, #1f0059, #240056, #290052, #2c004f, #2f004c);
    }

    .card {
        overflow: hidden;
        height: 600px;
        position: relative;
        background-color: white;
        border-radius: 5px;

        button {
            transition: 0.3s;
            background-image: linear-gradient(to right top, #29d389, #00c798, #00baa3, #00ada7, #009fa6);
            width: 100%;
            height: 50px;
            font-size: 1.6rem;
            font-weight: bold;
            border-radius: 25px;
            outline: none;
            color: white;
            position: relative;
            overflow: hidden;
        }
    }

    .switcher-container {
        z-index: 2;
        transition: 0.5s;
        padding: 5%;
        background-image: linear-gradient(to right top, #29d389, #00c798, #00baa3, #00ada7, #009fa6);
        height: 100%;
        width: 40%;
        position: absolute;
        top: 0;
        left: 0;

        &.signup-active {
            animation: activate-signup 1s ease forwards;
        }

        &.login-active {
            animation: activate-login 1s ease forwards;
        }

        h1 {
            font-weight: 700;
            width: 100%;
            color: white;
            font-size: 3rem;
        }

        p {
            width: 100%;
            color: white;
            font-size: 2rem;
        }

        span {
            font-size: 2rem;
            color: white;
            font-weight: bold;
        }

        button {
            background: transparent;
            border: 2px solid white;
            /*&:after {
                //font-size: 5rem;
                width: 20px;
                height: 100%;
                right: 10px;
                bottom: 0;
                content: '\2192';
                position: absolute;
                transition: 0.3s;
            }*/
            &:hover {
                border: 2px solid #87fdff;
                /*&:after {
                    bottom: 0%;
                }*/
            }
        }
    }

    .switcher-content {
        max-width: 400px;
    }

    @keyframes activate-signup {
        0% {
            left: 0;
            width: 40%;
        }
        50% {
            left: 10%;
            width: 90%;
        }
        100% {
            left: 60%;
            width: 40%;
        }
    }

    @keyframes activate-login {
        0% {
            left: 60%;
            width: 40%;
        }
        50% {
            left: 0%;
            width: 90%;
        }
        100% {
            left: 0;
            width: 40%;
        }
    }

    @keyframes hide-login-form {
        0% {
            opacity: 1;
            right: 0;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 0;
            right: 20%;
        }
    }

    @keyframes show-login-form {
        0% {
            opacity: 0;
            right: 10%;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 1;
            right: 0;
        }
    }

</style>