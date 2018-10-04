<template lang="html">
  <div class="nav">
    <h1 class="nav__heading">{{ $router.currentRoute.name }}</h1>
    <div class="nav__logout" @click="$store.dispatch('auth/logout')">
      <p><span class="nav__logout__text">logout</span> <font-awesome-icon icon="sign-out-alt" /></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style lang="scss">
.nav {
  display: flex;
  background-color: #dfdfdf;
  height: 100px;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #515151;
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
