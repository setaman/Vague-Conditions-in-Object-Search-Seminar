<template>
    <div class="popularity-circle-container d-flex justify-center align-center">
        <svg
                :height="c_height"
                :width="c_width"
        >
            <circle
                    class="inner-circle"
                    stroke="black"
                    :stroke-width="c_stroke"
                    fill="transparent"
                    :r="(c_height/2)-(c_stroke*2)"
                    :cx="c_width/2"
                    :cy="c_height/2"
            />
            <circle
                    stroke="white"
                    :stroke-width="c_stroke"
                    :stroke-dasharray="circumference + ' ' + circumference"
                    :style="{strokeDashoffset:progress}"
                    fill="transparent"
                    :r="(c_height/2)-(c_stroke*2)"
                    :cx="c_width/2"
                    :cy="c_height/2"
            />
        </svg>
        <span>{{popularity }}</span>

    </div>
</template>

<script>
    export default {
        name: "PopularityCircle",
        data: () => ({
            c_height: 40,
            c_width: 40,
            c_stroke: 2,
        }),
        props: ['popularity'],
        computed: {
            progress() {
                const normalizedRadius = (this.c_height/2)-(this.c_stroke*2);
                const circumference = normalizedRadius * 2 * Math.PI;
                return circumference - this.percent() / 100 * circumference;
            },
            circumference() {
                const normalizedRadius = (this.c_height/2)-(this.c_stroke*2);
                return normalizedRadius * 2 * Math.PI;
            }
        },
        methods: {
            percent() {
                return parseInt(this.popularity)/10*100;
            }
        }
    }
</script>

<style scoped lang="scss">
    .popularity-circle-container {
        width: 40px;
        height: 40px;
        position: relative;
        svg {
            transition: stroke-dashoffset 0.35s;
            transform: rotate(-90deg);
            transform-origin: 50% 50%;
            .inner-circle {
                stroke: rgba(0, 0, 0, 0.56);
                fill: rgba(0, 0, 0, 0.38);
            }
        }

        span {
            font-weight: bold;
            color: white;
            position: absolute;
            display: inline-block;
        }
    }
</style>