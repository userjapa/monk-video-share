<template lang="html">
  <div class="login">
    <div class="login__box">
      <div class="login__box__header">
        <p class="login__box__header__text">
          Monk Video Share
        </p>
        <p class="login__box__header__subtext">
          login
        </p>
      </div>
      <div class="login__box__form">
        <form v-on:submit.prevent="login(user)">
          <div class="login__box__form__input">
            <label for="email_field">email</label>
            <input id="email_field" class="input" type="email" v-model="user.email" required>
          </div>
          <div class="login__box__form__input">
            <label for="password_field">password</label>
            <input id="password_field" class="input" type="password" v-model="user.password" required>
          </div>
          <div class="login__box__form__checkbox">
            <input id="keep_logged_field" class="input" type="checkbox" v-model="user.keepLogged">
            <label for="keep_logged_field">Keep connected</label>
          </div>
          <div class="login__box__form__button">
            <button class="btn" type="submit" :disabled="!user.email || !user.password">Enter</button>
          </div>
          <div class="login__box__form__message" :style="{ visibility: hasError ? 'visible' : 'hidden' }">
            <span>Failed to login</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      user: {
        email: '',
        password: '',
        keepLogged: false
      }
    }
  },
  computed: {
    ...mapGetters({
      hasError: 'hasError'
    })
  },
  methods: {
    login (user) {
      this.$store.dispatch('auth/login', user)
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/pages/login";
</style>
