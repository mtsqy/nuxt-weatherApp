<template>
  <article>
    <header-section :data="headerData" @iconClicked="iconClicked($event)" />
    <maps-section />
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
        },
    },

}
</script>

<style lang="scss" scoped>
article {
    height: 100vh;
    max-height: 100vh;
}
</style>
