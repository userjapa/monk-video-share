<template lang="html">
  <div class="course">
    <div class="course__nav">
      <font-awesome-icon icon="arrow-circle-left" @click="$router.go(-1)"/>
      <span>Back</span>
    </div>
    <div class="course__content">
      <div class="course__content__videos"
           :class="{ playing: !!video }">
        <div class="course__content__videos__name">
          <h3>{{ course.name }}</h3>
        </div>
        <div class="course__content__videos__list">
          <div class="course__content__videos__list__item"
               v-for="(item, index) in course.videos"
               :key="`video-${index}`"
               :ref="`video-${index}`"
               :class="{ selected: index === position }"
               :data-src="item.thumbnail_src ? item.thumbnail_src : ''"
               @click="setVideo({ video: item, position: index })">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="course__content__player" :class="{ playing: !!video }">
        <video ref="player"
               @ended="endedVideo($event.target)"
               controls>
        </video>
        <div class="course__content__player__close">
          <font-awesome-icon icon="times-circle" @click="close()"/>
        </div>
        <div class="course__content__player__description" v-show="(!!video && !!video.description) && showDescription">
          <div class="course__content__player__description__text">
            <div class="course__content__player__description__box" ref="description">

            </div>
            <div class="course__content__player__description__close">
              <font-awesome-icon icon="times-circle" @click="showDescription = false"/>
            </div>
          </div>
        </div>
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
      video: null,
      position: null,
      showDescription: true
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
      this.position = null
      player.pause()
      player.src = ''
    },
    setVideo ({ video, position }) {
      this.video = video
      this.position = position
      this.showDescription = true
    },
    endedVideo (player) {
      if ((this.position + 1) <= this.course.videos.length) {
        const newPosition = this.position + 1
        setTimeout(() => {
          this.video = this.course.videos[newPosition]
          this.position = newPosition
        }, 1000)
      }
    }
  },
  watch: {
    async video (video) {
      if (!!video) {
        if (video.description) {
          console.log(this.$refs['description'])
          this.$refs['description'].innerHTML = video.description.text
          this.$refs['description'].style['font-size'] = `${video.description.fontSize}px`
        }
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
