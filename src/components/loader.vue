<template lang="html">
  <div class="loader" ref="loader" v-show="showing">
    <div class="loader__content">
      <div class="loader__content__dots">
        <div class="loader__content__dots__box">
          <div class="loader__content__dots__box__item"
               v-for="dot in 5"
               :style="{
                 padding: `${(dot - 1) * 4}px`,
                 top: `calc(-${dot * 4}px + 20px)`,
                 left: `calc(-${dot * 4}px + 20px)`,
                 animationDelay: `${dot * .1}s`
               }">
          </div>
        </div>
      </div>

      <div class="loader__content__text"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loader',
  data () {
    return {
      showing: this.show
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show (val) {
      if (!val) {
        this.$refs['loader'].classList.add('hide')
        this.$refs['loader'].classList.remove('show')
        setTimeout(() => {
          this.showing = false
        }, 500)
      } else {
        this.$refs['loader'].classList.remove('hide')
        this.$refs['loader'].classList.add('show')
        this.showing = true
      }
    }
  }
}
</script>

<style lang="scss">
.loader {
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: white;
  &__content {
    display: flex;
    flex-direction: column;
    height: 200px;
    width: 600px;
    margin: auto;
    &__dots {
      display: flex;
      flex-basis: 70%;
      &__box {
        position: relative;
        margin: auto 25px;
        width: 550px;
        height: 40px;
        &__item {
          animation: loadDots 3s infinite;
          margin: 0;
          padding: 0;
          position: absolute;
          border: 5px solid #dfdfdf;
          border-radius: 25px;
        }
      }
    }
    &__text {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-basis: 30%;
      font-size: 2.6rem;
      &:after {
        content: 'Loading';
        width: 125px;
        animation: loadText 2s infinite;
      }
    }
  }
  &.show {
    animation: showLoader .5s ease-out backwards;
  }
  &.hide {
    animation: hideLoader .5s ease-out backwards;
  }
}

@keyframes loadDots {
  15% { transform: translateX(0); }
  45% { transform: translateX(550px - 42px); }
  65% { transform: translateX(550px - 42px); }
  95% { transform: translateX(0); }
}

@keyframes loadDotsSmall {
  15% { transform: translateX(0); }
  45% { transform: translateX(250px - 42px); }
  65% { transform: translateX(250px - 42px); }
  95% { transform: translateX(0); }
}

@keyframes loadText {
  0% { content: 'Loading'; }
  25% { content: 'Loading.'; }
  50% { content: 'Loading..'; }
  75% { content: 'Loading...'; }
}

@keyframes showLoader {
  0% { opacity: 0;}
  100% { opacity: 1; }
}

@keyframes hideLoader {
  0% { opacity: 1;}
  100% { opacity: 0; }
}

@media only screen and (max-width: 600px) {
  .loader {
    &__content {
      height: 100px;
      width: 300px;
      &__dots {
        &__box {
          &__item {
            animation: loadDotsSmall 3s infinite;
          }
        }
      }
      &__text {
        font-size: 1.6rem;
        &:after {
          width: 77.5px;
        }
      }
    }
  }
}
</style>
