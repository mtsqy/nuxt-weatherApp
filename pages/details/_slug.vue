<template>
  <article>
    <header-section class="header--light" :data="headerData" @iconClicked="iconClicked($event)" />
    <section v-if="current" class="weather">
        <div class="toggle">
            <span @click="_toggleTemp($event, 'f')" class="toggle__child selected"><p>Fahrenheit</p></span>
            <span @click="_toggleTemp($event, 'c')" class="toggle__child"><p>Celsius</p></span>
        </div>
        <div class="weather__icon">
             <img id="wicon" :src="`http://openweathermap.org/img/w/${current.weather[0].icon}.png`" alt="Weather icon">
        </div>
        <div class="weather__temp">
            <h1 class="h-light">{{currentTemp}}</h1>
        </div>
        <span class="weather__coord">
            <p>{{current.coord.lat}}° S, {{current.coord.lon}}° E</p>
        </span>
        <div class="weather__date">
            <h4>{{current.weather[0].description}}</h4>
            <p>Tuesday, 24 August 2021</p>
        </div>
    </section>
    <section class="weather__details">
        <h5 class="box__title txt-dark">Details</h5>
        <div class="box__wrapper">
            <div class="box box--item">
                <span class="box--icon">
                    <img src="/assets/icons/termometers.svg" alt="">
                </span>
                <span class="box--txt">
                    <p class="txt-dark">{{toFahrenheit(current.main.temp)}}</p>
                    <h6>Fahrenheit</h6>
                </span>
            </div>
            <div class="box box--item">
                <span class="box--icon">
                    <img src="/assets/icons/wind-dark.svg" alt="">
                </span>
                <span class="box--txt">
                    <p class="txt-dark">{{toMph(current.wind.speed)}} mp/h</p>
                    <h6>Wind Speed</h6>
                </span>
            </div>
            <div class="box box--item">
                <span class="box--icon">
                    <img src="/assets/icons/sun-dark.svg" alt="">
                </span>
                <span class="box--txt">
                    <p class="txt-dark">{{current.clouds.all/100}}</p>
                    <h6>UV Index</h6>
                </span>
            </div>
            <div class="box box--item">
                <span class="box--icon">
                    <img src="/assets/icons/humidity-dark.svg" alt="">
                </span>
                <span class="box--txt">
                    <p class="txt-dark">{{current.main.humidity}}%</p>
                    <h6>Humidity</h6>
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
import { kelvinToFahrenheit, mpsToMph } from '@/plugins/utils'

export default {
    data() {
        return {
            current: null,
            currentTemp: 0,
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
    },

    methods: {
        iconClicked(val) {
            if(val == 'left') {
                this.$router.push('/')
            }
        },

        _toggleTemp(e, val) {
            let classTarget = e.target.closest('.toggle__child').classList
            e.target.closest('.toggle').querySelectorAll('.toggle__child').forEach(element => {
                element.classList.remove('selected')
            })
            switch (val) {
                case 'c':
                    if(!classTarget.contains('selected')) classTarget.add('selected')
                    return this.currentTemp = `${(this.current.main.temp - 273.15).toFixed(2)}°`

                case 'f':
                    if(!classTarget.contains('selected')) classTarget.add('selected')
                    return this.currentTemp = `${this.toFahrenheit(this.current.main.temp)}°`
            }
            
        },

        toFahrenheit(val) {
            return kelvinToFahrenheit(val).toFixed(2)
        },

        toMph(val) {
            return mpsToMph(val).toFixed(2)
        }
    },

    mounted() {
        this.currentTemp = `${this.toFahrenheit(this.current.main.temp)}°`
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
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 14px;
        width: 102px;
        height: 102px;
        img {
            width: 80%;
        }
    }

    &__date {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 18px;

        h4 {
            text-transform: capitalize;
        }
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

    &--icon {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 16px;
        width: 20px;
        height: 100%;

        img {
            position: relative;
            width: 100%;
        }
    }
}
</style>