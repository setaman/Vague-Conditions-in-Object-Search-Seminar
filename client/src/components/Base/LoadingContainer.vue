<template>
    <div class="loading-container">
        <div class="loading-blur"
             :style="isLoading">
            <slot></slot>
        </div>

        <div class="loading-overlay d-flex justify-center align-center"
             :style="overlayBackground">
            <v-progress-circular
                    v-if="loading"
                    :size="100"
                    :width="7"
                    color="info"
                    indeterminate
            ></v-progress-circular>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoadingContainer",
        props: ['loading'],
        computed: {
            isLoading() {
                return {
                    filter: `${this.loading ? 'blur(3px)' : 'blur(0px)'}`,
                }
            },
            overlayBackground() {
                return {
                    backgroundColor: `${this.loading ? 'rgba(0, 0, 0, 0.38)' : 'transparent'}`,
                    zIndex: `${this.loading ? '5' : '-1'}`
                }
            }
        }
    }
</script>

<style scoped>
    .loading-container, .loading-blur, .loading-overlay {
        position: relative;
        transition: 0.5s;
        width: 100%;
        height: 100%;
    }

    .loading-overlay {
        background-color: transparent;
        position: absolute;
        top: 0;
        left: 0;
    }

</style>