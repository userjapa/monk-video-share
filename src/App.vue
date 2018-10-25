<template>
  <div class="app">
    <transition name="app-transition">
      <router-view/>
    </transition>
    <loader :show="loading"/>
  </div>
</template>

<script>
import loader from '@/components/loader'

export default {
  name: 'app',
  computed: {
    loading () {
      return !this.$store.getters['isLoaded']
    }
  },
  components: {
    loader
  }
}
</script>

<style lang="scss">
@import "assets/scss/main";
.app {
  position: relative;
  height: 100vh;
  width: 100vw;
  box-sizing: content-box;
}

.app-transition {
  &-enter-active {
    animation: fadeIn 1s backwards;
    animation-delay: 1s;
  }
  &-leave-active {
    animation: fadeOut 1s backwards;
  }
}
</style>
