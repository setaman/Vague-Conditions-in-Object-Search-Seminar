<template>
    <button class="btn-prime elevation-5">
        <slot>

        </slot>
    </button>
</template>

<script>
    export default {
        name: "BtnPrim",
    }
</script>

<style scoped lang="scss">
    button.btn-prime {
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
            box-shadow: 0 5px 15px 1px rgba(54, 192, 125, 0.47) !important;
        }
    }

</style>