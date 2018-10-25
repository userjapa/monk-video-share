<template lang="html">
  <div id="home">
    <router-view name="header" class="home__header"/>
    <transition name="home-transition">
      <router-view name="content" class="home__content"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'home',
  async beforeCreate () {
    await this.$store.dispatch('course/reset')
    this.$store.commit('course/addListener')
  },
  beforeDestroy () {
    this.$store.commit('course/removeListener')
  }
}
</script>

<style lang="scss">
@import "../assets/scss/pages/home";
</style>
