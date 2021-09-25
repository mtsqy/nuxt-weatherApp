<template>
  <section class="container">
      <div class="input__box">
        <span class="input__container">
            <span class="input__icon">
                <img src="/assets/icons/magnifier.svg" alt="">
            </span>
            <input
            v-model="searchText"
            class="change"
            type="text"
            id="input-1"
            placeholder="Enter cities"
            @keydown.esc="clearInput"
            />
        </span>
      </div>
      <div :key="lastCoord.lat" class="container__maps">
        <div id="g-maps" />
        <ul class="list__city" v-if="searchText">
            <li 
                v-for="(city, index) in filteredList" 
                :key="index"
                @click="switchData(city)">
                {{city.name}}
            </li>
        </ul>
      </div>
      <div class="container__info box" :key="current.name" v-if="current && !searchText">
          <div class="box__inner">
              <div class="inner">
                <span class="inner--icon"></span>
                <span class="inner--txt">
                    <h5>{{current.name}}</h5>
                    <h6>{{current.sys.country}}</h6>
                </span>
              </div>
              <div class="inner">
                <span class="inner--icon">
                    <img id="wicon" :src="`http://openweathermap.org/img/w/${current.weather[0].icon}.png`" alt="Weather icon">
                </span>
                <h4 class="h-light">{{_toCelsius(current.main.temp)}}</h4>
              </div>
          </div>
          <div class="box__inner">
            <span class="inner--txt">
                <h6>Longitude and latitude</h6>
                <p>{{current.coord.lat}}, {{current.coord.lon}}</p>
            </span>
            <span class="inner--txt">
                <h6>Wind</h6>
                <p>{{_toMph(current.wind.speed)}} mp/h</p>
            </span>
          </div>
          <div class="box__inner">
              <button class="cta" @click="updateCurrent(current)">Change Location</button>
          </div>
      </div>
  </section>
</template>

<script>
import { mapState } from "vuex"
import { kelvinToCelsius, mpsToMph } from '@/plugins/utils'
import cityList from "@/static/assets/json/city.list.json"
export default {

    props: {
        lastCoord: {
            type: Object,
            default: function() {
                return {
                    // lat: 0,
                    // lon: 0
                }
            }
        }
    },

    data() {
        // limit request time in millisecond
        let limitTime = 5000
        let firstCache = limitTime + 500
        return {
            currentCoord: {
                lat: 0,
                lon: 0
            },

            map: null,
            marker: null,
            limitTime,
            cacheTime: Date.now()+firstCache,
            disabled: false,
            searchText: '',
            filteredList: [],
            current: null,
            weatherData: null,
            icons: {
                beachMarker: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                circlePin: '/assets/icons/circle-pin.svg'
            },
        }
    },

    methods: {
        initMaps(coord) {
            if(process.client && window) {
                this.map = new google.maps.Map(document.getElementById("g-maps"), {
                    zoom: 12,
                    center: { lat: coord.lat, lng: coord.lon },
                })
                this.placeMarker(coord)
            }
        },

        placeMarker(coord) {
            this.marker = new google.maps.Marker({
                position: { 
                    lat: coord.lat, 
                    lng: coord.lon 
                },
                map : this.map,
                // icon: this.icons.beachMarker,
            })
        },

        wordSuggestion(searchText) {
            let result = null
            searchText = searchText.toLowerCase()
            if(searchText.length > 0) {
                result = cityList.filter(city => {
                    return JSON.stringify(city.name)
                    .toLowerCase()
                    .includes(searchText)
                })
                .slice(0,25)
                .sort((a,b) => {
                    if(a.name < b.name) return -1 
                    if(a.name > b.name) return 1
                    return 0
                })
            }
            this.filteredList = result
        },

        switchData(current) {
            this.changeLocation(current.coord)
        },

        changeLocation(loc) {
            if((!this.disabled && (this.cacheTime + this.limitTime) > Date.now())) {
                this.disabled = true
                this.$store.commit("setState", {
                    type: 'coord',
                    data: loc
                })
                console.log("%cRequest sent!", "color: #00ff00; font-style: italic; padding: 12px 0;");
                this.disabled = false
                this.clearInput()
            } else {
                console.error(`%cPlease wait ${Math.floor(this.limitTime / 1000)}s before next request.`, "font-style: italic; padding: 12px 0;")
            }
            this.cacheTime = Date.now()
        },

        clearInput() {
            this.filteredList = []
            this.searchText = ''
        },

        updateCurrent(val) {
            this.$store.commit("add", val)
            this.$router.push('/')
            console.log('update storedLoc')
        },

        _toCelsius(val) {
            return `${kelvinToCelsius(val).toFixed(2)}°`
        },

        _toMph(val) {
            return `${mpsToMph(val).toFixed(2)}`
        }
    },

    computed: {
        ...mapState(["coord", "storedLoc"])
    },

    watch: {

        coord(coord) {
            this.$openWeather(coord).then(res => {
                this.initMaps(coord)
                this.current = res
            })
        },
        
        lastCoord(val) {
            this.currentCoord = val
            this.$openWeather(val).then(res => {
                this.current = res
                if(this.storedLoc.length < 1) this.$store.commit("add", res)
                else {
                    this.$store.commit("add", {
                        index: 0,
                        item: res
                    })
                }
            })
        },

        currentCoord(val) {
            this.changeLocation(val)
        },

        searchText(val) {
            if(typeof val !== 'string') return
            this.wordSuggestion(val)
        }
    },

    mounted() {
        if(this.lastCoord) this.currentCoord = this.lastCoord
    }

}
</script>

<style lang="scss" scoped>

section {
    padding: 0;
}

li {
    position: relative;
    width: 100%;
    padding: 12px 0;
    border-bottom: 1px solid rgba(160, 152, 174, .5);
    &:nth-last-child(1) {
        border: none;
    }
}

input {
    width: 100%;
}

.list__city {
    position: absolute;
    top: 0;
    left: 0;
    padding: 18px 22px;
    width: 100%;
    background-color: #fff;
    border-radius: 0 0 20px 20px;
    z-index: 30;
    box-shadow: 0 15px 30px -8px rgb(0 0 0 / 8%);
}

.input {
    
    &__box {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 75px 16px 16px 16px;
        background: linear-gradient(256.84deg, rgba(255, 255, 255, 0.2) 8.69%, rgba(255, 255, 255, 0) 171.75%);
        background-color: #e5e5e5;
        h2 {
            text-align: center;
            padding: 4vw;
        }
    }

    &__container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        background-color: white;
        padding: 1.4vw 3.2vw;
        border-radius: 8vw;
    }

    &__icon {
        display: flex;
        align-items: center;
        width: 20px;
        height: 20px;
    }
}

.container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    &__maps {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: scroll;
    }

    &__info {
        position: fixed;
        bottom: 0;
        width: 100%;
        box-shadow: 0 -15px 30px -8px rgb(0 0 0 / 8%);
    }
}

.box {
    background-color: #fff;
    
    &__inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        border-bottom: .5px solid #A098AE;

        &:nth-child(1) {
            padding-top: 0;
        }

        &:nth-last-child(1) {
            padding-bottom: 0;
            border: none;

        }
    }
}

.inner {
    display: flex;
    align-items: center;

    &--txt {
        h6 {
            padding-bottom: 4px;
        }
    }

    &--icon {
        margin-right: 8px;
        width: auto;
        height: auto;
    }
}

#g-maps {
    position: relative;
    width: 100%;
    height: 100%;
}

</style>