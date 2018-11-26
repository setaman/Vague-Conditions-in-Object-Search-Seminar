<template>
    <div>
        <h1>Hello login</h1>
        <v-btn @click="login" :loading="loading">
            login
        </v-btn>
    </div>
</template>

<script>
    import {login} from '@/api';

    export default {
        name: "Login",
        data: () => ({
            loading: false,
        }),
        methods: {
            login() {
                this.loading = true;

                this.$store.dispatch('login', {name: 'admin', password: 'admin'})
                    .then((data) => {
                        setTimeout(()=>{
                            this.$router.push('/');
                        }, 1000);
                    })
                    .catch(console.error)
                    .finally(() => {
                        setTimeout(()=>{
                            this.loading = false;
                        }, 1000);
                    })
            }
        }
    }
</script>

<style scoped>

</style>