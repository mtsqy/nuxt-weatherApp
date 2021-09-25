<template>
  <section v-if="data">
      <div class="slides hidden" ref="slider">
        <div class="slide" 
        v-for="(s, index) in data" 
        @click="directTo('details', data)"
        :key="index">
          <div class="slide__weather">
            <div class="slide__txt">
              <p>Chance of rain {{s.main.humidity}}%</p>
              <h3>{{s.weather[0].description}}</h3>
            </div>
            <div class="slide__icon">
                <img id="wicon" :src="`http://openweathermap.org/img/w/${s.weather[0].icon}.png`" alt="Weather icon">
            </div>
          </div>
          <div class="slide__location">
              <span class="icon">
                  <img src="/assets/icons/pin-bright.svg" alt="">
              </span>
            <p>{{s.name}}</p>
          </div>
          <div class="slide__items">
            <span class="slide--item">
              <h3>{{toFahrenheit(s.main.temp)}}<span>°F</span></h3>
            </span>
            <span v-if="s.main.humidity" class="slide--item">
                <span class="icon">
                  <img src="/assets/icons/humidity.svg" alt="">
              </span>
              <h6>{{s.main.humidity}}%</h6>
            </span>
            <span class="slide--item">
                <span class="icon">
                  <img src="/assets/icons/sun.svg" alt="">
              </span>
              <h6>{{s.clouds.all/100}}</h6>
            </span>
            <span class="slide--item">
                 <span class="icon">
                  <img src="/assets/icons/wind.svg" alt="">
              </span>
              <h6>{{toMph(s.wind.speed)}} mp/h</h6>
            </span>
          </div>
        </div>
        <div class="slide" v-if="data.length > 0" @click="directTo('location')">
            <div class="circle">
                <h6>+</h6>
                <p>Add new card</p>
            </div>
        </div>
      </div>
    </section>
</template>

<script>
import { kelvinToFahrenheit, mpsToMph } from '@/plugins/utils'
export default {
    data() {
        return {
            flkty: null,
        }
    },
    props: {
        data: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    
    methods: {
        _initSlider(el) {
            this.flkty = new Flickity(el, {
                imagesLoaded: true,
                freeScroll: true,
                pageDots: false,
                prevNextButtons: false,
                cellAlign: "left",
                draggable: true,
                selectedAttraction: 0.01,
                friction: 0.08,
                wrapAround: false
            })
            if(el.classList.contains('hidden')) el.classList.remove('hidden')
        },

        directTo(val, data) {
            this.$router.push({path: val, query: {data}});

        },

        toFahrenheit(val) {
            return kelvinToFahrenheit(val).toFixed(2)
        },

        toMph(val) {
            return mpsToMph(val).toFixed(2)
        }
    },

    mounted() {
        console.log('slider mounted')
        if(this.$el) this._initSlider(this.$refs?.slider)
    }
}
</script>

<style lang="scss" scoped>
section {
    padding-top: 75px;
    opacity: 1;
}

.slide {
    position: relative;
    padding: 22px;
    background: linear-gradient(180deg, #3CD18A 0%, #3C6FD1 0.01%, #7CA9FF 100%);
    border-radius: 20px;
    color: #fff;
    height: 205px;
    width: 324px;
    margin-right: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3{
        display: flex;
        align-items: flex-start;
        position: relative;
        span {
            font-weight: 300;
            align-self: flex-start;
            display: block;
            transform: translateY(-5px);
        }
    }

    h6 {
        color: #fff;
    }

    p {
        font-weight: 500;
    }

    &__items {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 8px;
        align-items: center;
    }

    &__txt {
        h3 {
            text-transform: capitalize;
        }
    }

    &__weather {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__location {
        display: flex;
        align-items: center;
        p {
            padding: 0;
        }
    }

    &--item {
        display: flex;
        align-items: center;
    }
}

.icon {
    padding-right: 6px;
}

.single {
    display: flex;
    justify-content: center;

    .slide {
        margin-right: 0;
    }
}

.circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    border: 1px #fff;
    border-style: dashed;
    border-radius: 50%;
    
    h1 {
        font-weight: 500;
        // font-size: 8rem;
    }

    p {
        padding: 0;
    }
}

.hidden {
    opacity: 0;
}
</style>