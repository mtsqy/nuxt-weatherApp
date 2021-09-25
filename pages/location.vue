<template>
  <article>
    <header-section :data="headerData" @iconClicked="iconClicked($event)" />
    <maps-section :key="lastCoord.lat" :lastCoord="lastCoord" />
  </article>
</template>

<script>
export default {
    data() {
        return {
            lastCoord: {
                lat: 0,
                lon: 0
            },

            headerData: {
                title:'Change Location',
                leftIcon: '/assets/icons/left-arrow-dark.svg'
            }
        }
    },

    methods: {
        iconClicked(val) {
            if(val == 'left') {
                this.$router.push('/')
            }
        }
    },

    beforeMount() {
        if(process.client && window) {
            
            navigator.geolocation.watchPosition((pos) => {
                if(this.lastCoord.lon !== pos.coords.longitude
                 && this.lastCoord.lat !== pos.coords.latitude) {
                     this.lastCoord = {
                         lon: pos.coords.longitude,
                         lat: pos.coords.latitude
                     }
                 }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
article {
    height: 100vh;
    max-height: 100vh;
}
</style>
