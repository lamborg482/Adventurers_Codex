<template>
  <div class="creature-card" @click="$emit('click')">
    <div class="viwe-display__line-cart">
      <div class="card-header">
        <h3 class="card-header cart-header__title-name">{{ creature.name }}</h3>
      </div>
      <div class="creature-card__cart-item">
        <div class="card-actions">
          <button class="card-actions__button card-actions__button-edit" @click.stop="$emit('edit', creature)">🖋️</button>
          <button class="card-actions__button card-actions__button-duplicat" @click.stop="$emit('duplicate', creature.id)">📜</button>
          <button class="card-actions__button card-actions__button-delete" @click.stop="$emit('delete', creature.id)">🗑️</button>
        </div>
        <div class="text-cart card-type">
          {{ creature.type === 'monster' ? 'Монстр' : 'NPC' }}
          <span class="text-cart" v-if="creature.cr"> | CR {{ creature.cr }} | </span>
        </div>
        <div class="text-cart card-stats">
          <span class="text-cart">AC {{ creature.ac }} |</span>
          <span class="text-cart"> HP {{ creature.hp }}</span>
        </div>
      </div>
    </div>
    <div class="creature-card__line-item">
      <span class="creature-card__line-button"></span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  creature: { type: Object, required: true }
})

defineEmits(['click', 'edit', 'duplicate', 'delete'])
</script>

<style scoped>
/* Стили уже есть в глобальном, но можно добавить если нужно */
</style>