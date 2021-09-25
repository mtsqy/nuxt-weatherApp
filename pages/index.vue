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
      current: null,
      lastCoord: {
        lat: 0,
        lon: 0
      },
      sliderData: [],
    }
  },

  computed: {
    ...mapState(["coord", "storedLoc"]),
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
    storedLoc(val) {
      this.sliderData = val
    }
  },

  methods: {
    iconClicked(val) {
  
      if(val == 'left') {
        this.$router.push('/')
      }
    },

  getSliderData() {
      return this.storedLoc
    }
  },

  beforeMount() {
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

  mounted() {
    this.sliderData = this.storedLoc
    console.log(this.storedLoc)
  }
}
</script>
