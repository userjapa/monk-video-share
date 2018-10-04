<template lang="html">
  <div class="courses">
    <div class="courses__add"
         ref="plusIcon">
      <font-awesome-icon icon="plus-circle" @click="$router.push({ name: 'Course Form' })"/>
      <span>Add new course</span>
    </div>
    <div class="courses__list">
      <div class="courses__list__item"
           v-for="(item, index) in courses"
           :style="{ animationDelay: `${ .25 * index}s` }">
        <div class="courses__list__item__title">
          <h5>{{ item.name }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Courses',
  data () {
    return {
      courses: [
        {
          name: 'JavaScript',
          videos: [1, 2, 3, 4, 5]
        },
        {
          name: 'HTML',
          videos: [6, 7, 8, 9, 10]
        },
        {
          name: 'CSS',
          videos: [11, 12, 13, 14, 15]
        },
        {
          name: 'Vue',
          videos: [16, 17, 18, 19, 20]
        },
        {
          name: 'NodeJS',
          videos: [21, 22, 23, 24, 25]
        },
        {
          name: 'NodeJS',
          videos: [21, 22, 23, 24, 25]
        },
        {
          name: 'NodeJS',
          videos: [21, 22, 23, 24, 25]
        },
        {
          name: 'NodeJS',
          videos: [21, 22, 23, 24, 25]
        },
        {
          name: 'NodeJS',
          videos: [21, 22, 23, 24, 25]
        },
        {
          name: 'NodeJS',
          videos: [21, 22, 23, 24, 25]
        },
        {
          name: 'NodeJS',
          videos: [21, 22, 23, 24, 25]
        },
        {
          name: 'NodeJS',
          videos: [21, 22, 23, 24, 25]
        },
        {
          name: 'NodeJS',
          videos: [21, 22, 23, 24, 25]
        },
        {
          name: 'NodeJS',
          videos: [21, 22, 23, 24, 25]
        },
        {
          name: 'NodeJS',
          videos: [21, 22, 23, 24, 25]
        }
      ]
    }
  },
  methods: {
    scrolling (ev) {
      console.log('scroll')
      console.log(ev)
    }
  },
  created () {
    window.addEventListener('scroll', this.scrolling)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrolling)
  }
}
</script>

<style lang="scss">
@import "../assets/scss/pages/courses";
</style>
