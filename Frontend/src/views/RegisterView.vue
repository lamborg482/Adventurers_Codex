<template>
  <div class="all-reg_template">
    <div class="title-reg">
      <h2>Зарегистрироваться</h2>
    </div>
    <div class="reg-form__all-item">
      <form class="reg-form__all-form" @submit.prevent="submitForm">
        <div class="reg-form__all-group__all-all">
          <div class="reg-form__one-group reg-form__all-group">
            <div class="form-reg">
              <div class="form-reg__input-line">
                <input class="all-input" type="text" id="username" v-model="formData.username" required placeholder="Ваше Имя">
                <span v-if="errors.username" class="error-text">{{ errors.username }}</span>
              </div>
              <div class="form-reg__line-botom"></div>
            </div>

            <div class="form-reg">
              <div class="form-reg__input-line">
                <input class="all-input" type="email" id="email" v-model="formData.email" required placeholder="Ваш Email">
                <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
              </div>
              <div class="form-reg__line-botom"></div>
            </div>
          </div>

          <div class="reg-form__two-group reg-form__all-group">
            <div class="form-reg">
              <div class="form-reg__input-line">
                <input class="all-input" type="password" id="password" v-model="formData.password" required placeholder="Ваш Пароль">
                <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
              </div>
              <div class="form-reg__line-botom"></div>
            </div>

            <div class="form-reg">
              <div class="form-reg__input-line">
                <input class="all-input" type="tel" id="phone" v-model="formData.phone" placeholder="Ваш Телефон">
                <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
              </div>
              <div class="form-reg__line-botom"></div>
            </div>
          </div>
        </div>

        <button class="register_butt__all-item register_butt" type="submit" :disabled="isLoading">
          {{ isLoading ? 'Отправка...' : 'Зарегистрироваться' }}
          <span class="button-line-top"></span>
          <span class="button-line-bottom"></span>
        </button>

        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegisterView',
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
        phone: ''
      },
      errors: {
        username: '',
        email: '',
        password: '',
        phone: ''
      },
      isLoading: false,
      error: null,
      successMessage: null
    }
  },
  methods: {
    validateForm() {
      let isValid = true
      this.errors = { username: '', email: '', password: '', phone: '' }

      if (!this.formData.username.trim()) {
        this.errors.username = 'Имя пользователя обязательно'
        isValid = false
      } else if (this.formData.username.length < 3) {
        this.errors.username = 'Имя пользователя должно быть не менее 3 символов'
        isValid = false
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!this.formData.email.trim()) {
        this.errors.email = 'Email обязателен'
        isValid = false
      } else if (!emailRegex.test(this.formData.email)) {
        this.errors.email = 'Введите корректный email'
        isValid = false
      }

      if (!this.formData.password) {
        this.errors.password = 'Пароль обязателен'
        isValid = false
      } else if (this.formData.password.length < 6) {
        this.errors.password = 'Пароль должен быть не менее 6 символов'
        isValid = false
      }

      return isValid
    },

    async submitForm() {
      if (!this.validateForm()) return

      this.isLoading = true
      this.error = null
      this.successMessage = null

      // Убираем поле phone, так как в модели бэкенда его нет (или добавляем позже)
      const payload = {
        username: this.formData.username,
        email: this.formData.email,
        password: this.formData.password
      }

      try {
        const response = await axios.post('http://localhost:8000/auth/register', payload)

        this.successMessage = 'Регистрация успешна! Теперь вы можете войти.'
        console.log('Успешная регистрация:', response.data)

        // Очищаем форму
        this.formData = { username: '', email: '', password: '', phone: '' }

        // Можно перенаправить на страницу входа через пару секунд
        setTimeout(() => {
          this.$router.push('/auth')
        })
      } catch (error) {
        if (error.response) {
          const detail = error.response.data?.detail || ''

          if (error.response.status === 400) {
            if (detail.includes('Email already registered') || detail.includes('already registered')) {
              this.error = 'Пользователь с таким email уже существует'
              this.errors.email = 'Email уже занят'
            } else if (detail.includes('Username already') || detail.includes('username already')) {
              this.error = 'Имя пользователя уже занято'
              this.errors.username = 'Имя пользователя уже занято'
            } else {
              this.error = 'Ошибка валидации данных: ' + detail
            }
          } else if (error.response.status === 500) {
            this.error = 'Ошибка сервера. Попробуйте позже.'
          } else {
            this.error = `Ошибка: ${error.response.status} - ${detail}`
          }
        } else if (error.code === 'ERR_NETWORK') {
          this.error = 'Ошибка соединения с сервером. Проверьте, запущен ли сервер.'
        } else {
          this.error = 'Неизвестная ошибка: ' + error.message
        }
        console.error('Ошибка регистрации:', error)
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