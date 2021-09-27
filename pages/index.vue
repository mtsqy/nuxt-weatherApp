<template>
  <article>
    <header-section :key="headerData.name" :data="headerData" @iconClicked="iconClicked($event)" />
    <slider-section v-if="sliderData" :key="sliderData.length" :data="sliderData" />
    <cardlist-section />
  </article>
</template>

<script>

import { mapState } from "vuex"
export default {
  data() {
    return {
      loaded: false,
      currentLoc: null,
      lastCoord: {
        lat: 0,
        lon: 0
      },
      sliderData: [],
    }
  },

  computed: {
    ...mapState(["coord", "storedLoc", "current"]),
    headerData() {
      return {
        title: this.current?.name || 'Home',
        leftIcon: '/assets/icons/double-strip.svg',
        rightIcon: '/assets/icons/cogwheel.svg'
      }
    }
  },
  
  watch: {
    lastCoord(val) {
      this.$openWeather(val).then(res => {
        this.$store.commit("setState", {
          type: 'current',
          data: res
        })
        if(this.storedLoc.length < 1) this.$store.commit("add", res)
        else {
          this.$store.commit("add", {
            index: 0,
            item: res
          })
        }
      })
    },
    
    storedLoc(val) {
      this.sliderData = val
    },

    current(val) {
      this.currentLoc = val
    }
  },

  methods: {
    getSliderData() {
      return this.storedLoc
    },

    iconClicked(val) {
  
      if(val == 'left') {
        this.$store.commit("setState", {
          type: 'menuOpen',
          data: true
        })
      }
    },

    getLocation() {
      if(!this.loaded && process.client && window) {

      navigator.geolocation.watchPosition((pos) => {
        if(this.lastCoord.lon !== pos.coords.longitude
        && this.lastCoord.lat !== pos.coords.latitude) {
          this.lastCoord = {
              lon: pos.coords.longitude,
              lat: pos.coords.latitude
          }
        }
          this.loaded = true
        })
      }
    },
  },

  created() {
    this.sliderData = this.storedLoc
  },

  beforeMount() {
    this.getLocation()
  },
}
</script>
