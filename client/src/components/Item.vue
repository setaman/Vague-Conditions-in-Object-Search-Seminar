<template>
    <v-flex elevation-1 pa-0 xs12 class="container">
        <ul class="">
            <li v-for="(value, key) in item" :key="key">
                <span class="key">{{key}}</span>
                <span class="value">: {{value}}</span>
            </li>
        </ul>
        <v-layout row wrap>
            <v-flex xs12>
                <v-btn icon flat color="blue">
                    <v-icon>
                        add
                    </v-icon>
                </v-btn>
                <v-btn icon flat color="blue">
                    <v-icon>
                        bookmark
                    </v-icon>
                </v-btn>
                <v-btn icon flat color="blue">
                    <v-icon>
                        shopping_basket
                    </v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs12>
                <v-rating v-model="rating" @input="rateItem"></v-rating>
            </v-flex>
        </v-layout>
    </v-flex>
</template>

<script>
    import {rateItem} from '@/api';

    export default {
        name: "Item",
        data: () => ({
            rating: 0,
        }),
        props: {
            item: {
                type: Object,
                require: true,
            }
        },
        methods: {
            rateItem() {
                rateItem(this.$store.state.user.id, this.item.id, this.rating)
                    .then(console.log)
                    .catch(console.error)
            },
        },
    }
</script>

<style scoped>
    ul {
        box-shadow: 0 0 5px 2px #dfdfdf;
        padding: 10px;
        background-color: #f0f0f0;
        list-style: none;
    }

    .container {
        overflow: hidden;
        border-radius: 5px;
        background-color: rgba(0, 183, 255, 0.27);
        margin: 10px 0;
    }

    .key {
        font-size: 20px;
        font-weight: bold;
        padding-right: 10px;
    }

    .value {
        color: #00B7FF;
        font-weight: bold;
    }
</style>