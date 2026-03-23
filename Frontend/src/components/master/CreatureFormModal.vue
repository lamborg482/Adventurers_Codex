<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-content">
        <h2>{{ editingCreature ? 'Редактировать' : 'Создать' }} существо</h2>
        <form class="modal-content__all" @submit.prevent="save">
          <!-- Вставьте сюда полную форму из вашего исходного кода -->
          <div class="modal-content__comp-all">
            <div class="modal-content__comp-one">
              <div class="form-group">
                <label>Тип: </label>
                <div class="form-group__al-component">
                  <select class="form-group__component-one" v-model="form.type" required>
                    <option value="monster">Монстр</option>
                    <option value="npc">NPC</option>
                  </select>
                  <span class="form-group__component-two"></span>
                </div>
              </div>
              <div class="form-group">
                <label>Имя: </label>
                <div class="form-group__al-component">
                  <input class="form-group__component-one" v-model="form.name" required />
                  <span class="form-group__component-two"></span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>AC: </label>
                  <div class="form-group__al-component">
                    <input class="form-group__component-one" type="number" v-model.number="form.ac" required min="1" />
                    <span class="form-group__component-two"></span>
                  </div>
                </div>
                <div class="form-group">
                  <label>HP: </label>
                  <div class="form-group__al-component">
                    <input class="form-group__component-one" type="number" v-model.number="form.hp" required min="1" />
                    <span class="form-group__component-two"></span>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Скорость:</label>
                  <div class="form-group__al-component">
                    <input type="number" class="form-group__component-one form-group__component-speed" v-model="form.speed" placeholder="30" />
                    <span class="form-group__component-two"></span>
                  </div>
                </div>
                <div class="form-group" v-if="form.type === 'monster'">
                  <label>CR: </label>
                  <div class="form-group__al-component">
                    <input maxlength="4" class="form-group__component-one form-group__component-CR" v-model="form.cr" placeholder="1/4, 1, 5..." />
                    <span class="form-group__component-two"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group form-group__doing">
              <label class="form-group__doing-title">Действия (через запятую)</label>
              <div class="input-wrapper">
                <div class="input-wrapper__orm-all">
                  <input maxlength="250"class="form-group__doing-input" v-model="form.actions" placeholder="Коготь: +5, 1к6+3 рубящий" />
                </div>
              </div>
            </div>
          </div>

          <div class="model-content__deteil-info">
            <div class="stats-group__conteiner">
              <div class="stats-group">
                <h3 class="stats-group__title">Характеристики</h3>
                <div class="stats-grid">
                  <div v-for="stat in ['str','dex','con','int','wis','cha']" :key="stat" class="stat-item">
                    <div class="stats-grid__all-item">
                      <div class="stats-grid__lable-component">
                        <label class="stats-grid__lable-stat">{{ stat.toUpperCase() }}: </label>
                        <input class="stats-grid__input-stat" type="number" v-model.number="form.stats[stat]" min="1" max="30" />
                      </div>
                      <div class="stats-grid__label-but"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="stats-block__description-all">
                <h3 class="stat-block__description-title">Описание:</h3>
                <div class="stat-block__description-info">
                  <textarea class="description-info__text" v-model="form.description"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-actions">
            <div class="modal-actions__but-lem">
              <button class="modal-actions__but-close" type="button" @click="$emit('close')">
                <span class="button-line-top"></span>
                <span class="button-line-bottom"></span>
                Отмена
              </button>
            </div>
            <div class="modal-actions__but-lem">
              <button class="modal-actions__but-save" type="submit">
                <span class="button-line-top"></span>
                <span class="button-line-bottom"></span>
                Сохранить
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  editingCreature: { type: Object, default: null }
})

const emit = defineEmits(['close', 'save'])

const form = ref({
  id: '',
  name: '',
  type: 'monster',
  ac: 10,
  hp: 10,
  speed: '',
  cr: '',
  stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
  actions: '',
  description: ''
})

// Если редактируем, заполняем форму
watch(() => props.editingCreature, (val) => {
  if (val) {
    form.value = { ...val, stats: { ...val.stats } }
  } else {
    form.value = {
      id: '',
      name: '',
      type: 'monster',
      ac: 10,
      hp: 10,
      speed: '',
      cr: '',
      stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      actions: '',
      description: ''
    }
  }
}, { immediate: true })

const save = () => {
  emit('save', { ...form.value, id: props.editingCreature?.id || Date.now().toString() })
}
</script>

<style scoped>
/* Стили для формы уже есть в глобальном, можно добавить при необходимости */
</style>