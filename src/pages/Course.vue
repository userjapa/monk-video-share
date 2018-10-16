<template lang="html">
  <div class="course">
    <div class="course__videos"
         :class="{ playing: !!video }">
      <div class="course__videos__name">
        <h3>{{ course.name }}</h3>
      </div>
      <div class="course__videos__list">
        <div class="course__videos__list__item"
             v-for="(item, index) in course.videos"
             :key="`video-${index}`"
             :ref="`video-${index}`"
             :data-src="item.thumbnail_src ? item.thumbnail_src : ''"
             @click="video = item">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="course__player" :class="{ playing: !!video }">
      <video ref="player" controls>
      </video>
      <div class="course__player__close">
        <font-awesome-icon icon="times-circle" @click="close()"/>
      </div>
    </div>
  </div>
</template>

<script>
import bus from './../globalBus'
import { mapGetters } from 'vuex'

export default {
  name: 'Course',
  data () {
    return {
      video: null
    }
  },
  computed: {
    ...mapGetters({
      course: 'course/getCourse'
    })
  },
  methods: {
    close () {
      const player = this.$refs['player']
      this.video = null
      player.pause()
      player.src = ''
    }
  },
  watch: {
    async video (video) {
      if (!!video) {
        let url = video.name_src ? video.name_src : ''
        if (!url) {
          console.log('Getting video');
          url = await this.$store.dispatch('file/getVideo', {
            course: this.course.name,
            video: video.name
          })
          this.$set(video, 'name_src', url)
        }
        this.$refs['player'].src = url
      }
    }
  },
  async mounted () {
    bus.$emit('set_title', this.$router.currentRoute.params.name)
    // Start lazy load
    await Promise.all(this.course.videos.map(async (v, index) => {
      const thumbnail = await this.$store.dispatch('file/getThumbnail', {
        course: this.course.name,
        thumbnail: v.thumbnail
      })
      let videoEl = this.$refs[`video-${index}`][0]
      let image = new Image()
      image.onload = () => {
        videoEl.style['background-image'] = `url(${thumbnail})`
        videoEl.removeAttribute('data-src')
      }
      image.src = thumbnail
    }))
    // End lazy load
  }
}
</script>

<style lang="scss">
@import '../assets/scss/pages/course';
</style>
