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
            box-shadow: 0 0 10px 2px rgba(54, 192, 125, 0.47) !important;
            /*&:after {
                top: -100%;
            }*/
            &:active {
                box-shadow: 0 0 0 0 rgba(54, 192, 125, 0.47) !important;
            }
        }

        /*&:after {
            background-image: linear-gradient(to right top, #29d389, #00c798, #00baa3, #00ada7, #009fa6);
            opacity: 0.5;
            transition: 0.2s;
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            right: 0;
            top: 100%;
            margin: auto;
            background-color: rgba(0, 183, 255, 0.51);
            transform: skewX(20deg);
        }*/
    }

</style>