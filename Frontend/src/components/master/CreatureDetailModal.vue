<template>
  <transition name="modal-fade">
    <div v-if="creature" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-content modal-lg">
        <h2 class="modal-content__title-cont">{{ creature.name }}</h2>
        <div class="creature-detail">
          <p class="modal-content__type-npc"><strong>Тип:</strong> {{ creature.type === 'monster' ? 'Монстр' : 'NPC' }}</p>
          <div class="creature-detail__component-stat">
            <p class="modal-content__class-armor"><strong>AC:</strong> {{ creature.ac }} || <strong>HP:</strong> {{ creature.hp }} || <strong>Скорость:</strong> {{ creature.speed || '—' }} фт |</p>
            <p class="modal-content__CR" v-if="creature.cr">|<strong> CR:</strong> {{ creature.cr }}</p>
          </div>
        </div>
        <div class="modal-content__all-component">
          <div class="stats-block">
            <strong class="stats-block__title-content">Характеристики:</strong>
            <ul>
              <li v-for="(val, key) in creature.stats" :key="key">{{ key.toUpperCase() }}: {{ val }}</li>
            </ul>
          </div>
          <div class="stats-block__description-all">
            <h3 class="stat-block__description-title">Описание:</h3>
            <div class="stat-block__description-info">
              <p class="description-info__text" v-if="creature.description">{{ creature.description }}</p>
            </div>
          </div>
        </div>
        <div class="modedal-detail__duing" v-if="creature.actions">
          <strong>Действия:</strong> {{ creature.actions }}
        </div>
        <div class="modal-actions">
          <button class="modal-actions__close-but" @click="$emit('close')">
            <span class="button-line-top"></span>
            <span class="button-line-bottom"></span>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  creature: { type: Object, required: true }
})
defineEmits(['close'])
</script>

<style scoped>
/* Стили для детального просмотра уже в глобальном */
</style>