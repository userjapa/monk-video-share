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
           :style="{ animationDelay: `${ .15 * index}s` }">
        <div class="courses__list__item__title">
          <h5>{{ item.name }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Courses',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      courses: 'course/getCourses'
    })
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import "../assets/scss/pages/courses";
</style>
