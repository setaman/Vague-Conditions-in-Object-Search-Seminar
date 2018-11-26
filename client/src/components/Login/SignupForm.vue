<template>
    <div class=" text-xs-center signup-form-container d-flex column wrap justify-center align-center"
         :class="toggleLogin">
        <div>
            <h1>Add New User</h1>
            <p class="mb-5 mt-3">Enter your name and password</p>
            <label class="mt-5" for="name">
                Name
                <input type="text" id="name" v-model="name">
            </label>
            <label for="pass">
                Password
                <input type="text" id="pass" v-model="password">
            </label>
            <button class="elevation-5 mt-5" @click="$emit('signup', {name, password})">sign up</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SignupForm",
        props: ['active'],
        data: () => ({
            name: 'admin',
            password: 'admin',
        }),
        computed: {
            toggleLogin() {
                if (!this.active) {
                    return {
                        'hidden': true
                    };
                }
                return {
                    'active': true
                };

            }
        }
    }
</script>

<style scoped lang="scss">
    .signup-form-container {
        padding: 10%;
        height: 100%;
        width: 60%;
        position: absolute;
        top: 0;
        left: 0;

        &.active {
            animation: show-form 0.5s ease forwards;
        }

        &.hidden {
            animation: hide-form 0.5s ease forwards;
        }

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
            &:hover {
                box-shadow: 0 5px 15px 1px #c0c0c0 !important;
            }
        }
    }
    @keyframes hide-form {
        0% {
            opacity: 1;
            left: 0;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 0;
            left: 20%;
        }
    }
    @keyframes show-form {
        0% {
            opacity: 0;
            left: 10%;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 1;
            left: 0;
        }
    }
</style>