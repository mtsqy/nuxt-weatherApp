<template>
  <article>
    <header-section :key="current" :data="headerData" @iconClicked="iconClicked($event)" />
    <slider-section :key="storedLoc[0]" :data="storedLoc" />
    <cardlist-section />
  </article>
</template>

<script>
import geoMixin from "@/mixins/geo"
import { mapState } from "vuex"
export default {
  mixins: [geoMixin],
  data() {
    return {
      current: null,
      lastCoord: {
        lat: 0,
        lon: 0
      },
    }
  },

  computed: {
    ...mapState(["coord", "storedLoc"]),
    headerData() {
      if(this.current) {
        return {
          title: this.current.name,
          leftIcon: '/assets/icons/double-strip.svg',
          rightIcon: '/assets/icons/cogwheel.svg'
        }
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
    }
  },

  methods: {
    iconClicked(val) {
      console.log(val)
      if(val == 'left') {
        this.$router.push('/')
      }
    }
  },

  async mounted() {
    console.log(this.storedLoc)
  }
}
</script>
