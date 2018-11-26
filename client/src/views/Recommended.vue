<template>
    <v-flex sx12>
        <item v-for="(item, i) in items" :key="i" :item="item"></item>
    </v-flex>
</template>

<script>
    import Item from "@/components/Item";
    import {getRecommendedItems} from '@/api';

    export default {
        name: "Recommended",
        components: {Item},
        data: () => ({
            items: [],
        }),
        methods: {
            getRecommended() {
                getRecommendedItems(this.$store.state.user.id)
                    .then((response) => {
                        this.items = [];
                        this.items.push(...response.data);
                        console.warn(this.items);
                    })
                    .catch(console.error);
            },
        },
        mounted() {
            this.getRecommended();
        }
    }
</script>

<style scoped>

</style>