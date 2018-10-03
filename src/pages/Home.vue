<template lang="html">
  <div id="home">
    <router-view name="header"/>
    <router-view name="content"/>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style lang="scss">
@import "../assets/scss/pages/home";
</style>
