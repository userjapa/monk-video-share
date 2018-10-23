<template lang="html">
  <div id="home">
    <router-view name="header" class="home__header"/>
    <router-view name="content" class="home__content"/>
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
