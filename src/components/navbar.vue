<template lang="html">
  <div class="nav">
    <h1 class="nav__heading">{{ route }}</h1>
    <div class="nav__logout" @click="$store.dispatch('auth/logout')">
      <p><span class="nav__logout__text">logout</span> <font-awesome-icon icon="sign-out-alt" /></p>
    </div>
  </div>
</template>

<script>
import bus from './../globalBus'

export default {
  name: 'navbar',
  data () {
    return {
      route: this.$router.currentRoute.name
    }
  },
  methods: {
    routeChanged (routeName) {
      this.route = routeName
    }
  },
  mounted () {
    bus.$on('route_changed', this.routeChanged)
  },
  beforeDestroy () {
    bus.$off('route_changed', this.routeChanged)
  }
}
</script>

<style lang="scss">
.nav {
  display: flex;
  background-color: #dfdfdf;
  width: 100%;
  height: 100px;
  min-height: 87px;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #515151;
  z-index: 999;
  cursor: pointer;
  &__logout {
    position: absolute;
    right: 5%;
    font-size: 2rem;
    transition: .2s;
    &__text {
      font-size: 1.6rem;
    }
    &:hover {
      color: #919191
    }
    &:active {
      color: #bbb;
    }
  }
}
</style>
