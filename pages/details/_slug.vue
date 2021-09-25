<template>
  <article>
    <header-section class="header--light" :data="headerData" @iconClicked="iconClicked($event)" />
    <section v-if="current" class="weather">
        <div class="toggle">
            <span class="toggle__child selected"><p>Fahrenheit</p></span>
            <span class="toggle__child"><p>Celsius</p></span>
        </div>
        <div class="weather__icon">
            
        </div>
        <div class="weather__temp">
            <h1 class="h-light">72°</h1>
        </div>
        <span class="weather__coord">
            <p>{{current.coord.lat}}° S, {{current.coord.lon}}° E</p>
        </span>
        <div class="weather__date">
            <h4>Partly Cloudy</h4>
            <p>Tuesday, 24 August 2021</p>
        </div>
    </section>
    <section class="weather__details">
        <h5 class="box__title txt-dark">Details</h5>
        <div class="box__wrapper">
            <div class="box box--item">
                <span class="box--icon">

                </span>
                <span class="box--txt">
                    <p class="txt-dark">10</p>
                    <h6>text</h6>
                </span>
            </div>
            <div class="box box--item">
                <span class="box--icon">

                </span>
                <span class="box--txt">
                    <p class="txt-dark">10</p>
                    <h6>text</h6>
                </span>
            </div>
            <div class="box box--item">
                <span class="box--icon">

                </span>
                <span class="box--txt">
                    <p class="txt-dark">10</p>
                    <h6>text</h6>
                </span>
            </div>
            <div class="box box--item">
                <span class="box--icon">

                </span>
                <span class="box--txt">
                    <p class="txt-dark">10</p>
                    <h6>text</h6>
                </span>
            </div>
        </div>
    </section>
    <section class="weather__tips">
        <h5 class="box__title txt-dark">Tips</h5>
        <div class="box">
            <p class="txt-dark">Lorem Ipsum</p>
        </div>
    </section>
  </article>
</template>

<script>
import { mapState } from "vuex"
export default {
    data() {
        return {
            current: null,
            headerData: {
                title:'Current',
                leftIcon: '/assets/icons/left-arrow-bright.svg',
                rightIcon: '/assets/icons/three-dots.svg'
            }
        }
    },

    computed: {
        ...mapState([''])
    },

    created() {
        this.current = this.$route.query.data[0]
        console.log(this.$route.query.data[0])
    },

    methods: {
        iconClicked(val) {
            console.log(val)
            if(val == 'left') {
                this.$router.push('/')
            }
        },

        _toggleTemp(val) {
            switch (val) {
                case 'c':
                    return `${(val - 273.15).toFixed(2)}°`

                case 'f':
                    return `${((val-273.15) * 9/5 + 32).toFixed(2)}°`
            
                default:
                    break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
article {
    position: relative;
    width: 100%;
    height: 100vh;
}

.weather {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 75px 75px 38px 75px;
    background: linear-gradient(180deg, #3CD18A 0%, #3C6FD1 0.01%, #7CA9FF 100%);
    background-color: #7CA9FF;
    color: #FFFFFF;
    border-radius: 0 0 20px 20px;

    &__icon {
        width: 102px;
        height: 102px;
    }

    &__date {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 18px;
    }

    &__tips {
        &--bar {
            padding: 20px 16px;
        }
    }
}

.toggle {
    display: flex;
    background: #FFFFFF;
    background-color: rgba(255, 255, 255, .3);
    border-radius: 24px;
    &__child {
        display: block;
        padding: 10px 24px;
        &.selected {
            background-color: rgba(255, 255, 255, .5);
            border-radius: 24px;
            z-index: 2;
            p {
                background: -webkit-linear-gradient(180deg, #3CD18A 0%, #3C6FD1 0.01%, #7CA9FF 100%);
                background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
    }
}

.box {

    &__wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
    }

    &--item {
        display: flex;
    }
}
</style>