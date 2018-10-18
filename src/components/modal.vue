<template lang="html">
  <div class="modal" id="modal" v-show="show">
    <div class="modal__content" :style="{ width: thisWidth, height: thisHeight }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '600px'
    },
    height: {
      type: String,
      default: '450px'
    }
  },
  computed: {
    thisWidth () {
      const width = this.width
      return `calc(${width} - 80px)`
    },
    thisHeight () {
      const height = this.height
      return `calc(${height} - 40px)`
    }
  }
}
</script>

<style lang="scss">
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#000, .75);
  display: flex;
  justify-content: center;
  &__content {
    padding: 20px 40px;
    align-self: center;
    background-color: #fff;
    border-radius: 5px;
  }
}
</style>
