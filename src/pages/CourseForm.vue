<template lang="html">
  <div class="course-form">
    <div class="course-form__nav" v-if="!isToUpdate">
      <font-awesome-icon icon="arrow-circle-left" @click="$router.go(-1)"/>
      <span>Back</span>
    </div>
    <div class="course-form__nav" v-else>
      <font-awesome-icon icon="times-circle" @click="cancel()"/>
      <span>Cancel</span>
    </div>
    <div class="course-form__form">
      <form @submit.prevent="isToUpdate ? update(course) : save(course)">
        <div class="course-form__form__input">
          <label for="course_name">Course name</label>
          <input id="course_name"
                 class="input"
                 type="text"
                 v-model="course.name"
                 :class="{ active: !!course.name }"
                 :disabled="isToUpdate"
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
        <div class="course-form__form__submit">
          <button type="submit" class="btn btn-success">Save</button>
          <button class="btn btn-danger" @click.prevent="cancel()">Cancel</button>
        </div>
        <div class="course-form__form__videos">
          <div class="course-form__form__videos__item"
               v-for="(v, index) in course.videos"
               :key="`video-${index}`"
               :data-src="v.thumbnail_src ? v.thumbnail_src : v.thumbnail">
            <input type="text" v-model="v.name" :disabled="!!v.thumbnail_src"/>
            <div class="course-form__form__videos__item__options">
              <font-awesome-icon icon="info-circle" class="info" @click.prevent="showModalInfo(v)"/>
              <font-awesome-icon icon="times-circle" class="close" @click.prevent="course.videos.splice(index, 1)"/>
            </div>
          </div>
        </div>
      </form>
    </div>
    <video id="video" ref="video" muted></video>
    <canvas id="canvas" ref="canvas"></canvas>
    <modal :show="showModal">
      <div class="modal-info">
        <div class="modal-info__name">
          <span>{{ video_temp ? video_temp.name.split('.')[0] : '' }}</span>
        </div>
        <!-- <div class="modal-info__link">
          <form class="modal-info__link__form" @submit.prevent="addLink(link)">
            <label for="link">Link</label>
            <input id="link" class="input" type="text" name="link" v-model="link">
          </form>
          <div class="modal-info__link__list">
            <div class="modal-info__link__list__item"
                 v-for="(item, index) in videoLinks"
                 :key="`link-${index}`">
                 {{ item }}
            </div>
          </div>
        </div> -->
        <div class="modal-info__menu">
          <div class="modal-info__menu__item">
            <label for="menu_fontsize">Font Size</label>
            <input id="menu_fontsize" class="input" type="number" v-model="menu.fontSize" min="12" max="64" step="2"/>
          </div>
          <div class="modal-info__menu__item">
            <button class="btn --small" @click="showDropDown ? closeDropDown($refs['dropdown']) : openDropDown($refs['dropdown'])">Add Link</button>
            <div ref="dropdown" class="modal-info__menu__item__dropdown" v-show="showDropDown">
              <div class="modal-info__menu__item__dropdown__field">
                <label for="link_text">Text</label>
                <input id="link_text" class="input" type="text" v-model="link.text">
              </div>
              <div class="modal-info__menu__item__dropdown__field">
                <label for="link_URL">URL</label>
                <input id="link_word" class="input" type="text" v-model="link.url">
              </div>
              <div class="modal-info__menu__item__dropdown__options">
                <button @click="addLink({ el: $refs['text'], link})">Add</button>
                <button @click="closeDropDown($refs['dropdown'])">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <div id="text"
             class="modal-info__description"
             ref="text"
             :contenteditable="!preview"
             :class="{ editing: !preview }"
             :style="{
               fontSize: `${menu.fontSize}px`
             }">
        </div>
        <div class="modal-info__options">
          <button @click="preview = !preview">{{ preview ? 'Edit' : 'Preview' }}</button>
          <button @click="addDescription({ el: $refs['text'], video: video_temp })">Save</button>
        </div>
        <div class="modal-info__close">
          <font-awesome-icon icon="times-circle" @click.prevent="closeModalInfo()"/>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'
import modal from '@/components/modal'

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
      menu: {
        fontSize: 14
      },
      link: {
        text: '',
        url: ''
      },
      isValid: false,
      showModal: false,
      showDropDown: false,
      video_temp: null,
      preview: false
    }
  },
  computed: {
    ...mapGetters({
      isToUpdate: 'course/isToUpdate',
      toUpdate: 'course/getToUpdate'
    }),
    videoLinks () {
      return (!this.video_temp || !this.video_temp.links) ? [] : this.video_temp.links
    }
  },
  methods: {
    fileChanged (file) {
      if (file.name.match(/.avi|.flv|.wmv|.mov|.mp4/g)) {
        this.video.name = file.name.split('.')[0]
        this.video.file = file
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
    showModalInfo (video) {
      this.showModal = true
      this.video_temp = video
      if (!!video.description) {
        this.$refs['text'].innerHTML = video.description.text
        this.menu.fontSize = video.description.fontSize
      }
    },
    closeModalInfo () {
      this.link = ''
      this.menu = {
        fontSize: 12
      }
      this.$refs['text'].innerHTML = ''
      this.showModal = false
      this.video_temp = null
    },
    addLink ({ el, link }) {
      if (link.url.match(/\b(?:www|http|https)\b/gi)) {
        if (!!link.text) {
          const content = el.innerHTML
          el.innerHTML = `${content}<a target="_blank" href="${link.url}">${link.text}</a>`
        } else {
          alert('Text must be informed!')
        }
      } else {
        alert('Invalid URL!')
      }
      this.closeDropDown(this.$refs['dropdown'])
    },
    openDropDown (el) {
      el.classList.remove('down')
      el.classList.add('up')
      this.showDropDown = true
    },
    closeDropDown (el) {
      this.link = {
        text: '',
        url: ''
      }
      el.classList.remove('up')
      el.classList.add('down')
      setTimeout(() => {
        this.showDropDown = false
        this.preview = false
      }, 200)
    },
    addDescription ({ el, video }) {
      if (!video.description) this.$set(video, 'description', {})
      this.$set(video.description, 'text', el.innerHTML)
      this.$set(video, 'description', { ...video.description, ...this.menu })
      this.closeModalInfo()
    },
    async save (course) {
      if (course.videos.length > 0) {
        try {
          await this.$store.dispatch('course/save', cloneDeep(course))
          this.$router.replace({ name: 'Courses' })
        } catch (error) {
          console.log('Failed to save video :(')
        }
      } else {
        alert('Videos must be uploaded!')
      }
    },
    async update (course) {
      if (course.videos.length > 0) {
        try {
          await this.$store.dispatch('course/update', cloneDeep(course))
          this.$router.replace({ name: 'Courses' })
        } catch (error) {
          console.log('Failed to edit video :(')
        }
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
      this.isValid = false
    },
    cancel () {
      this.resetVideo()
      this.course = {
        name: '',
        videos: []
      }
      if (this.isToUpdate) {
        this.$store.commit('course/setToUpdate', null)
      }
      this.$router.go(-1)
    }
  },
  components: {
    modal
  },
  watch: {
    'course.videos': function () {
      // Start lazy load for images after render elements on v-for
      this.$nextTick(async () => {
        const videos = Array.from(document.querySelectorAll('.course-form__form__videos__item'))
        await Promise.all(videos.map(v => {
          if (v.hasAttribute('data-src')) {
            let image = new Image()
            image.onload = () => {
              v.style['background-image'] = `url(${v.getAttribute('data-src')})`
              v.removeAttribute('data-src')
            }
            image.src = v.getAttribute('data-src')
          }
        }))
      })
      // End lazy load
    }
  },
  async mounted () {
    // Getting thumbnail from video
    const video = this.$refs['video']
    const canvas = this.$refs['canvas']
    video.addEventListener('loadedmetadata', () => {
      const vWidth = video.videoWidth
      const vHeight = video.videoHeight
      canvas.width = vWidth
      canvas.height = vHeight
      const canvas_ctx = canvas.getContext('2d')
      video.currentTime = 1
      setTimeout(() => {
        canvas_ctx.drawImage(video, 0, 0, vWidth, vHeight)
        this.video.thumbnail = canvas.toDataURL()
        this.isValid = true
      }, 100)
    })
    // End thumbnail

    // Verify if is to update
    if (this.isToUpdate) {
      const temp = cloneDeep(this.toUpdate)
      await Promise.all(temp.videos.map(async v => {
        const thumbnail = await this.$store.dispatch('file/getThumbnail', {
          course: temp.name,
          thumbnail: v.thumbnail
        })
        this.$set(v, 'thumbnail_src', thumbnail)
      }))
      this.$delete(temp, 'key')
      this.course = temp
    }
    // End to update
  }
}
</script>

<style lang="scss">
@import "../assets/scss/pages/courseForm";
</style>
