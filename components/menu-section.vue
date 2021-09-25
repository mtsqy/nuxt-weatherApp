<template>
  <section v-if="menuOpen" @click="closeMenu">
      <div class="block">
        <p>Current Location</p>
        <h4>{{currentData.name}}</h4>
      </div>
      <ul>
          <li class="add">
              <span class="icon">
                  <img src="/assets/icons/pin-plus.svg" alt="">
              </span>
              <p @click="updatedLocation('', 'add')">Add Location</p>
          </li>
          <li v-for="(data,index) in locationData" 
              :key="index">
              <span class="icon">
                  <img src="/assets/icons/pin-bright.svg" alt="">
              </span>
              <p @click="updatedLocation(index, 'update')">{{data.name}}</p>
          </li>
      </ul>
      <div class="block">
          <p>Settings</p>
          <p>Share this app</p>
          <p>Rate this app</p>
      </div>
  </section>
</template>

<script>
import { mapState } from "vuex"
export default {

    data() {
        return {
            currentData: {
                name: 'menu'
            },
            locationData: [
            ]
        }
    },

    computed: {
        ...mapState(["storedLoc", "current", "menuOpen"])
    },

    methods: {
        updatedLocation(i, data) {
            this.$router.push({path: 'location', query: {i, data}})
        },

        closeMenu() {
            this.$store.commit("setState", {
                type: 'menuOpen',
                data: false
            })
        }
    },

    mounted() {
        this.locationData = this.storedLoc
        this.currentData = this.current
    }
}
</script>

<style lang="scss" scoped>
section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
    background: linear-gradient(180deg, #3CD18A 0%, #3C6FD1 0.01%, #7CA9FF 100%);
    color: #fff;
}

li {
    display: flex;
    align-items: center;
    padding: 8px 0;
    font-size: 18px;
}

.add {
    color: #FBF99E;
}

.block {
    padding: 28px 8px;
    p {
        padding: 8px 0;
    }
}

.icon {
    display: flex;
    align-items: center;
    margin-right: 8px;
}
</style>