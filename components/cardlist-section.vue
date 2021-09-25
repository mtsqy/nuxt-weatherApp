<template>
  <section>
      <div class="box__title">
        <h5>News</h5>
      </div>
      <div class="box__wrapper">
        <div class="card" v-for="(c,index) in dataList" :key="index">
          <div class="card--img">
              <img :src="c.img" alt="">
          </div>
          <div class="card--desc">
            <p class="card--title">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            <span class="card--txt">
              <h6>24 September 2021</h6>
              <h6>Author</h6>
            </span>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            dataList: [
                {
                    img: 'https://images.unsplash.com/photo-1632381118348-523c12f1f531?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80'
                },
                {
                    img: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80'
                },
                {
                    img: 'https://images.unsplash.com/photo-1461880234904-751a2f54f1c7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80'
                },
                {
                    img: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80'
                },
            ]
        }
    }

}
</script>

<style lang="scss" scoped>
section {
    position: relative;
    height: 100%;
}
.box {
    &__wrapper {
        position: relative;
        height: 100%;
        // overflow: scroll;
    }
}
.card {
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 20px;
    margin-bottom: 16px;
    overflow: hidden;
    box-shadow: 0 15px 30px -8px rgb(0 0 0 / 8%);

  &--img {
    height: 60%;
    width: 100%;
    overflow: hidden;
    filter: brightness(.45);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &:hover {
        filter: brightness(1);
    }
  }

  &--desc {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px 24px;
    height: 40%;
    p {
        padding-bottom: 8px;
    }
  }

  &--txt {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>