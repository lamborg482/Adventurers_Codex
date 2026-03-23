<template>
  <div class="about">
    <div class="author-cart">
      <h1 class="whod_label">Авторизация</h1>
      <div class="log-in">
        <form class="log-form__all-form" @submit.prevent="login">
          <div class="log-form__component-one">
            <div class="form-auth">
              <div class="form-auth__input-line">
                <input class="form-log__all-input form-auth__log-input" placeholder="Имя пользователя или Email" type="text" v-model="credentials.identifier">
              </div>
              <div class="form-auth__line-botom"></div>
            </div>
            <div class="form-auth">
              <div class="form-auth__input-line">
                <input class="all-input" type="password" v-model="credentials.password" placeholder="Пароль">
              </div>
              <div class="form-auth__line-botom"></div>
            </div>
          </div>
          <button class="auth_butt__all-item log-form__component-two" type="submit" :disabled="isLoading">
            {{ isLoading ? 'Вход...' : 'Войти' }}
            <span class="button-line-top"></span>
            <span class="button-line-bottom"></span>
          </button>
          <div v-if="error" class="error-message">{{ error }}</div>
          <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AuthorView',
  data() {
    return {
      credentials: {
        identifier: '',
        password: ''
      },
      isLoading: false,
      error: null,
      successMessage: null
    }
  },
  methods: {
    async login() {
      if (!this.credentials.identifier || !this.credentials.password) {
        this.error = 'Заполните все поля'
        return
      }

      this.isLoading = true
      this.error = null
      this.successMessage = null

      // Определяем, что ввели: username или email
      const isEmail = this.credentials.identifier.includes('@')
      const payload = isEmail
        ? { email: this.credentials.identifier, password: this.credentials.password }
        : { username: this.credentials.identifier, password: this.credentials.password }

      try {
        const response = await axios.post('http://localhost:8000/auth/login', payload)
        const { access_token } = response.data

        // Сохраняем токен
        localStorage.setItem('token', access_token)

        window.dispatchEvent(new Event('storage'))

        // Устанавливаем токен в заголовки для будущих запросов (можно через axios.defaults)
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

        this.successMessage = 'Вход выполнен успешно! Перенаправление...'
        setTimeout(() => {
          this.$router.push('/')
        })
      } catch (error) {
        if (error.response) {
          const detail = error.response.data?.detail || ''
          if (error.response.status === 401) {
            this.error = 'Неверное имя пользователя/email или пароль'
          } else {
            this.error = `Ошибка: ${detail}`
          }
        } else if (error.code === 'ERR_NETWORK') {
          this.error = 'Ошибка соединения с сервером. Проверьте, запущен ли сервер.'
        } else {
          this.error = 'Неизвестная ошибка: ' + error.message
        }
        console.error('Ошибка входа:', error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style>
@import "@/views/style/global_style";
</style>