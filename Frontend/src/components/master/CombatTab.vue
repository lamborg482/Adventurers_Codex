<template>
  <div class="combat-container">
    <!-- Панель управления боем -->
    <div class="combat-toolbar">
      <button class="combat-btn" @click="$emit('open-select')">
        <span class="button-line-top"></span>
        <span class="button-line-bottom"></span>
        + Добавить участника
      </button>
      <button class="combat-btn" @click="rollAllInitiative" :disabled="combatants.length === 0">
        <span class="button-line-top"></span>
        <span class="button-line-bottom"></span>
        🎲 Инициатива (все)
      </button>
      <button class="combat-btn" @click="nextTurn" :disabled="combatants.length === 0">
        <span class="button-line-top"></span>
        <span class="button-line-bottom"></span>
        ⏩ Следующий ход
      </button>
      <button class="combat-btn" @click="prevTurn" :disabled="combatants.length === 0">
        <span class="button-line-top"></span>
        <span class="button-line-bottom"></span>
        ⏪ Предыдущий ход
      </button>
      <label class="combat-btn" style="cursor: pointer;">
        <span class="button-line-top"></span>
        <span class="button-line-bottom"></span>
        📂 Загрузить игроков
        <input type="file" accept=".json,application/json" @change="loadPlayersFromFile" style="display: none;">
      </label>
    </div>

    <!-- Список участников боя -->
    <div class="combat-tracker">
      <CombatantCard
        v-for="(combatant, index) in sortedCombatants"
        :key="combatant.id"
        :combatant="combatant"
        :is-current-turn="index === currentTurnIndex"
        @remove="removeCombatant"
        @adjust-hp="adjustHp"
        @update-status="updateCombatant"
        @click="$emit('open-detail', combatant)"
      />
      <div v-if="combatants.length === 0" class="empty-combat">
        <p>Нет участников. Добавьте первого!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CombatantCard from './CombatantCard.vue'

const props = defineProps({
  combatants: { type: Array, required: true },
  currentTurnIndex: { type: Number, required: true },
  sortedCombatants: { type: Array, required: true },
  rollAllInitiative: { type: Function, required: true },
  nextTurn: { type: Function, required: true },
  prevTurn: { type: Function, required: true },
  removeCombatant: { type: Function, required: true },
  adjustHp: { type: Function, required: true },
  updateCombatant: { type: Function, required: true },
  loadPlayersFromFile: { type: Function, required: true }
})

defineEmits(['open-select', 'open-detail'])
</script>

<style scoped>
/* Стили для боевого окна можно оставить здесь, они специфичны */
.combat-container {
  width: 32vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1vw;
  padding: 0;
}
.combat-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5vw;
  margin-bottom: 1vw;
}
.combat-btn {
  background: transparent;
  border: none;
  font-size: 1.2vw;
  cursor: pointer;
  position: relative;
  padding: 0.3vw 0.8vw;
  color: black;
  transition: transform 0.3s ease;
  overflow: hidden;
}
.combat-btn:hover {
  transform: scale(1.05);
  color: #790202;
}
.combat-btn:disabled {
  opacity: 0.4;
  pointer-events: none;
}
.combat-btn .button-line-top,
.combat-btn .button-line-bottom {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
  transition: transform 0.8s ease, background-color 0.3s ease;
  transform-origin: center;
}
.combat-btn .button-line-top {
  top: 0;
}
.combat-btn .button-line-bottom {
  bottom: 0;
}
.combat-btn:hover .button-line-top,
.combat-btn:hover .button-line-bottom {
  transform: scaleX(0.2);
  background-color: black;
}
.combat-tracker {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.8vw;
  padding-right: 0.5vw;
  overflow-x: hidden;
  scrollbar-color: #790202 #ccc;
}
.empty-combat {
  text-align: center;
  color: #777;
  font-size: 1.4vw;
  margin-top: 2vw;
}
</style>