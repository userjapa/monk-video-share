<template lang="html">
  <div class="course-form">
    <div class="course-form__nav" v-if="!isToUpdate">
      <font-awesome-icon icon="arrow-circle-left" @click="$router.go(-1)"/>
      <span>Back</span>
    </div>
    <div class="course-form__nav" v-else>
      <font-awesome-icon icon="times-circle"/>
      <span>Cancel</span>
    </div>
    <div class="course-form__form">
      <form @submit.prevent="save(course)">
        <div class="course-form__form__input">
          <label for="course_name">Course name</label>
          <input id="course_name"
                 class="input"
                 type="text"
                 v-model="course.name"
                 :class="{ active: !!course.name }"
                 required>
        </div>
        <div class="course-form__form__video">
          <h4>Videos</h4>
        </div>
        <div class="course-form__form__input">
          <label for="course_name">
            <button type="button"
                    class="btn"
                    :disabled="!isValid"
                    @click.prevent="addVideo(video)">Add</button>
          </label>
          <!-- <input type="text" class="input" v-model="video.name" @click.prevent="$refs['file'].click()" readonly> -->
          <input id="course_name"
                 ref="file"
                 type="file"
                 class="input"
                 @change="fileChanged($event.target.files[0])">
                 <!-- style="display: none;" -->
        </div>
        <div class="course-form__form__videos">
          <div class="course-form__form__videos__item"
               v-for="(v, index) in course.videos"
               :key="`video-${index}`"
               :style="{ backgroundImage: `url(${v.thumbnail})` }">
            <!-- <span>{{ v.name }}</span> -->
            <input type="text" v-model="v.name" @input="changedName(v)"/>
          </div>
        </div>
        <div class="course-form__form__submit">
          <button type="submit" class="btn btn-success">Save</button>
          <button class="btn btn-danger">Cancel</button>
        </div>
      </form>
    </div>
    <video id="video" ref="video" muted></video>
    <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CourseForm',
  data () {
    return {
      course: {
        name: '',
        videos: []
      },
      video: {
        name: '',
        file: null,
        thumbnail: null
      },
      isValid: false
    }
  },
  computed: {
    ...mapGetters({
      isToUpdate: 'course/isToUpdate',
      toUpdate: 'course/getCourse'
    })
  },
  methods: {
    fileChanged (file) {
      console.log(file);
      if (file.name.match(/.avi|.flv|.wmv|.mov|.mp4/g)) {
        this.video.name = file.name.split('.')[0]
        this.video.file = file
        this.isValid = true
        let reader = new FileReader
        reader.onload = () => {
          this.$refs['video'].src = reader.result
        }
        reader.readAsDataURL(file)
      } else {
        alert('File must be a video!')
        this.resetVideo()
      }
    },
    addVideo (video) {
      this.course.videos.push(video)
      this.isValid = false
      this.resetVideo()
    },
    save (course) {
      if (course.videos.length > 0) {
        console.log(course)
      } else {
        alert('Videos must be uploaded!')
      }
    },
    resetVideo () {
      this.$refs['file'].value = ''
      this.video = {
        name: '',
        file: null,
        thumbnail: null
      }
    },
    changedName (video) {
      let fileName = video.file.name
      let splitted = fileName.split('.')
      splitted[0] = video.name
      video.file.renameFilename = `${splitted[0]}.${splitted[1]}`
      console.log(video)
    }
  },
  mounted () {
    const video = this.$refs['video']
    const canvas = this.$refs['canvas']
    video.addEventListener('loadedmetadata', () => {
      const vWidth = video.videoWidth
      const vHeight = video.videoHeight
      canvas.width = vWidth
      canvas.height = vHeight
      const canvas_ctx = canvas.getContext('2d')
      console.log(canvas_ctx)
      setTimeout(() => {
        canvas_ctx.drawImage(video, 0, 0, vWidth, vHeight)
        this.video.thumbnail = canvas.toDataURL()
      }, 50)
    })
  }
}
</script>

<style lang="scss">
@import "../assets/scss/pages/courseForm";
</style>
