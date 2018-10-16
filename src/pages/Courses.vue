<template lang="html">
  <div class="courses">
    <div class="courses__add"
         ref="plusIcon">
      <font-awesome-icon icon="plus-circle" @click="$router.push({ name: 'Course Form' })"/>
      <span>Add new course</span>
      <button class="courses__add__edit" @click="editing = true" v-if="!editing">Edit</button>
      <button class="courses__add__edit" @click="editing = false" v-else>Cancel</button>
    </div>
    <div class="courses__list">
      <div class="courses__list__item"
           v-for="(item, index) in courses">
        <div class="courses__list__item__content"
             :style="{
               animationDelay: `${ .15 * index}s`,
               cursor: editing ? 'default' : 'pointer'
             }"
             @click="viewCourse(item)">
          <div class="courses__list__item__content__title">
            <h5>{{ item.name }}</h5>
          </div>
          <div class="courses__list__item__content__options" :style="{ opacity: editing ? 1 : 0 }">
            <font-awesome-icon icon="edit" @click="edit(item)"/>
            <font-awesome-icon icon="times" @click="$store.dispatch('course/remove', item)"/>
          </div>
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
      editing: false
    }
  },
  computed: {
    ...mapGetters({
      courses: 'course/getCourses'
    })
  },
  methods: {
    edit (course) {
      this.$store.commit('course/setToUpdate', course)
      this.$router.push('form')
    },
    viewCourse (course) {
      if (!this.editing) {
        this.$store.commit('course/setCourse', course)
        this.$router.push(`course/${course.name}`)
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/pages/courses";
</style>
