<template>
    <transition appear name="slide-in">
        <slot></slot>
    </transition>

</template>

<script>
    export default {
        name: "SlideIn"
    }
</script>

<style scoped>
    .slide-in-enter-active, .slide-in-leave-active {
        transition: opacity .5s;
        animation: list-slide-in 1s;
    }

    .slide-in-enter, .slide-in-leave-to {
        opacity: 0;
    }
    @keyframes list-slide-in {
        0% {transform: translate(50px)}
        100% {transform: translate(0px)}
    }

</style>