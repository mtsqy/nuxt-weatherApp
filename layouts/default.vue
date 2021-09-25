<template>
    <main>
        <div id="wrapper" class="wrapper" data-scroll-container>
            <nuxt/>
        </div>
    </main>
</template>

<script>

export default {
    data() {
        return {
            loopChecking: undefined,
        }
    },

    watch: {
        coord(val) {
            console.log(val)
        }
    },

}
</script>

<style lang="scss" scoped>

.preloader {
    
    &.show {

    }
}
    
</style>