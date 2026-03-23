<template>
  <div
    class="combatant-card"
    :class="{ 'current-turn': isCurrentTurn, 'defeated': combatant.hp <= 0 }"
    @click="$emit('click')"
  >
    <div class="combatant-card__header">
      <span class="combatant-name">{{ combatant.name }}</span>
      <span class="combatant-initiative">Иниц: {{ combatant.initiative || '—' }}</span>
      <button class="combatant-remove" @click.stop="$emit('remove', combatant.id)" title="Удалить">🗑️</button>
    </div>
    <div class="combatant-card__body">
      <div class="combatant-stats">
        <span>КБ {{ combatant.ac }}</span>
        <span>ХП {{ combatant.hp }} / {{ combatant.maxHp }}</span>
      </div>
      <div class="combatant-actions">
        <button class="hp-btn" @click.stop="$emit('adjust-hp', combatant.id, -1)">-1</button>
        <button class="hp-btn" @click.stop="$emit('adjust-hp', combatant.id, -5)">-5</button>
        <button class="hp-btn" @click.stop="$emit('adjust-hp', combatant.id, 1)">+1</button>
        <button class="hp-btn" @click.stop="$emit('adjust-hp', combatant.id, 5)">+5</button>
      </div>
      <div class="combatant-status">
        <label>
          <input type="checkbox" v-model="combatant.unconscious" @change="$emit('update-status', combatant)">
          Без сознания
        </label>
      </div>
    </div>
    <div class="combatant-card__line"></div>
  </div>
</template>

<script setup>
defineProps({
  combatant: { type: Object, required: true },
  isCurrentTurn: { type: Boolean, default: false }
})

defineEmits(['remove', 'adjust-hp', 'update-status', 'click'])
</script>

<style scoped>
.combatant-card {
  background: transparent;
  padding: 0.5vw;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
}
.combatant-card.current-turn {
  border-bottom: 2px solid #790202;
  color: #790202;
}
.combatant-card.defeated {
  opacity: 0.6;
}
.combatant-card.defeated .combatant-name {
  text-decoration: line-through;
}
.combatant-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4vw;
  margin-bottom: 0.3vw;
}
.combatant-name {
  font-weight: bold;
  color: black;
  transition: color 0.3s ease;
}
.combatant-card:hover .combatant-name {
  color: #790202;
}
.combatant-initiative {
  font-size: 1.2vw;
  color: #333;
}
.combatant-remove {
  background: transparent;
  border: none;
  font-size: 1.2vw;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s ease, transform 0.2s;
}
.combatant-remove:hover {
  opacity: 1;
  transform: scale(1.1);
  color: #790202;
}
.combatant-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.5vw;
  font-size: 1.2vw;
}
.combatant-stats {
  display: flex;
  gap: 1.5vw;
  color: #333;
}
.combatant-actions {
  display: flex;
  gap: 0.5vw;
  flex-wrap: wrap;
}
.hp-btn {
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 0.2vw 0.5vw;
  font-size: 1vw;
  cursor: pointer;
  transition: all 0.2s;
}
.hp-btn:hover {
  background: #790202;
  color: white;
  border-color: #790202;
}
.combatant-status {
  display: flex;
  align-items: center;
  gap: 0.5vw;
  font-size: 1.1vw;
}
.combatant-status input[type="checkbox"] {
  width: 1.2vw;
  height: 1.2vw;
  cursor: pointer;
  accent-color: #790202;
}
.combatant-card__line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.09vw;
  background-color: black;
  transform: scaleX(1);
  transition: transform 0.3s ease;
  transform-origin: left;
  pointer-events: none;
}
.combatant-card:hover .combatant-card__line {
  transform: scaleX(1.1);
  background-color: black;
}
</style>