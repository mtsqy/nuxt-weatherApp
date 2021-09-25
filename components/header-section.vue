<template>
  <header>
      <div class="h--left h--icon" @click="iconClicked('left')">
        <img v-if="data.leftIcon" :src="data.leftIcon">
      </div>
      <h5 class="h--title">{{data.title}}</h5>
      <div class="h--right h--icon" @click="iconClicked('right')">
        <img v-if="data.rightIcon" :src="data.rightIcon">
      </div>
  </header>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          title: '',
          leftIcon: '',
          righIcon: ''
        }
      }
    }
  },

  methods: {
    iconClicked(val) {
      this.$emit("iconClicked", val)
    },
  }
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  width: 100%;
  background-color: transparent;
  color: #363B64;
  z-index: 120;
  
  h5 {
    font-weight: 600;
  }
}

.header {
  &--light {
    color: #fff;
  }
}

.h--icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;

  img {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>