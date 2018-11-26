<template>
    <v-container fluid grid-list-xl class="login-container" fill-height>
        <v-layout row wrap justify-center align-center fill-height>
            <v-flex xs12 sm12 md8 lg8 xl6 class="elevation-10 card" pa-0>
                    <div class=" text-xs-center switcher-container d-flex column wrap justify-center align-center"
                        :class="switchAnimation">
                        <div>
                            <h1>Hello Again</h1>
                            <p>Bllasl lsf lsldl sfld lsdf </p>
                            <button class="mt-5" @click="signup_activated = !signup_activated">
                                Signup
                            </button>
                        </div>
                    </div>
                <div class=" text-xs-center login-form-container d-flex column wrap justify-center align-center">
                    <div>
                        <h1>Login</h1>
                        <p>Enter your name and password</p>
                        <label class="mt-5" for="name">
                            Name
                            <input type="text" id="name" v-model="name">
                        </label>
                        <label for="pass">
                            Password
                            <input type="text" id="pass" v-model="password">
                        </label>
                        <button class="elevation-5 mt-5" @click="login">login</button>
                    </div>
                </div>
                    <!--<v-layout row wrap fill-height mt-0>
                        <v-flex xs12 sm4 class="switcher-container">
                            <h1>Login with your Data</h1>
                            <p>Bllasl lsf lsldl sfld lsdf </p>
                            <v-btn @click="login" :loading="loading">
                                login
                            </v-btn>
                        </v-flex>
                        <v-flex xs12 sm4>
                            <h1>Login with your Data</h1>
                            <p>Bllasl lsf lsldl sfld lsdf </p>
                            <v-btn @click="login" :loading="loading">
                                login
                            </v-btn>
                        </v-flex>
                    </v-layout>-->
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
    import {login} from '@/api';

    export default {
        name: "Login",
        data: () => ({
            loading: false,
            name: 'admin',
            password: 'admin',
            snackbar: '',
            snackbar_text: '',
            snackbar_error: false,

            signup_activated: false,
        }),
        methods: {
            login() {
                this.loading = true;

                this.$store.dispatch('login', {name: this.name, password: this.password})
                    .then((data) => {
                        setTimeout(()=>{
                            this.$router.push('/');
                        }, 1000);
                    })
                    .catch((error) => {
                        console.error(error);
                        this.snackbar = true;
                        this.snackbar_error = true;
                        this.snackbar_text = 'Error, please check your password and name';
                    })
                    .finally(() => {
                        setTimeout(()=>{
                            this.loading = false;
                        }, 1000);
                    })
            }
        },
        computed: {
            switchAnimation() {
                console.warn(this.signup_activated);
                if (this.signup_activated) {
                    return {
                        'signup-active': true
                    };
                }
                return {
                    'login-active': true
                };

            }
        }
    }
</script>

<style scoped lang="scss">
    .login-container {
        background-color: white;
        //background-image: linear-gradient(to right top, #1f0059, #240056, #290052, #2c004f, #2f004c);
    }

    .card{
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
        background-color: green;
        position: absolute;
        top: 0;
        left: 0;
        &.signup-active {
            animation: activate-signup 0.5s ease forwards;
        }
        &.login-active {
            animation: activate-login 0.5s ease forwards;
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

    .login-form-container {
        padding: 10%;
        height: 100%;
        width: 60%;
        position: absolute;
        top: 0;
        right: 0;

        h1 {
            font-weight: bold;
            font-size: 2.3rem;
            letter-spacing: 0.3rem;
        }

        p {
            font-weight: lighter;
            font-size: 1.5rem;
            letter-spacing: 0.1rem;
        }

        button:hover {
            box-shadow: 0 5px 15px 1px #c0c0c0 !important;
        }

        label {
            text-align: left !important;
            text-transform: uppercase;
            letter-spacing: 0.2rem;
            display: block;
            width: 100%;
            color: black;
            input {
                transition: all 0.3s;
                font-weight: bold;
                font-size: 1.2rem;
                padding-left: 10px;
                outline: none;
                color: black;
                margin: 10px 0;
                background-color: #f4f8f7;
                height: 50px;
                border-radius: 3px;
                width: 100%;
                &:focus {
                    border-bottom: 3px solid deepskyblue;
                }
            }
        }
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
            left: 10%;
            width: 90%;
        }
        100% {
            left: 0;
            width: 40%;
        }
    }
</style>